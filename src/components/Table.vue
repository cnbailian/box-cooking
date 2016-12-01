<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item>
					<el-input v-model="formInline.content" placeholder="内容"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="getList(formInline.content)">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button @click="setForm(false)">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="tableData" highlight-current-row v-loading="listLoading" style="width: 100%;">
				<el-table-column type="index" width="50">
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="100" sortable>
				</el-table-column>
				<el-table-column prop="type" label="类型" width="100" sortable>
				</el-table-column>
				<el-table-column prop="content" label="内容" sortable>
				</el-table-column>
				<el-table-column inline-template :context="_self" label="操作" width="100">
					<span>
					<el-button type="text" size="small" @click="setForm(row)">编辑</el-button>
					<el-button type="text" size="small" @click="handleDel(row)">删除</el-button>
				</span>
				</el-table-column>
			</el-table>
		</template>

		<!--分页-->
		<el-col :span="24" class="toolbar" style="padding-bottom:10px;">
			<el-pagination @size-change="sizeChange" @current-change="current" :page-sizes="[10, 15, 20]" :page-size="10" layout="total, sizes, prev, pager, next, jumper"
				:total="count" style="float:right">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog :title="editFormTtile" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="类型">
					<el-input v-model="editForm.type"></el-input>
				</el-form-item>
				<el-form-item label="内容">
					<el-input type="textarea" v-model="editForm.content"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取 消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../common/util'
	import NProgress from 'nprogress'

  export default {
    data() {
      return {
				formInline: {
					content: ''
				},
				count:0,
				editFormVisible:false,//编辑界面显是否显示
				editFormTtile:'编辑',//编辑界面标题
				//默认界面数据
				editForm: {
					id:0,
					name: '',
					type: '',
					content: '',
				},
				editLoading:false,
				btnEditText:'提 交',
				tableData: [],
				listLoading:false
     	}
    },
		created(){
			this.tableSize = 10
			this.tablePage = 1
			this.getList()
		},
    methods: {
			// 设置size
			sizeChange:function(size){
				this.tableSize = size
				this.getList()
			},
			// current
			current:function(page){
				this.tablePage = page
				this.getList()
			},
			// 列表获取
			getList:function(content = false){
				var self = this
				var query = self.query()
				query.count().then(function (count) {
					self.count = count
			  });
				query.limit(this.tableSize);
			  query.skip((this.tablePage - 1) * this.tableSize);
				if (content) {
					query.contains('content', content);
				}
			  query.find().then(function (result) {
					var array = []
					result.forEach(function(val){
						let value = val.attributes
						value['id'] = val.id
						array.push(value)
					})
					self.tableData = array
			  })
			},
			// 表单赋值
			setForm:function(row){
				this.editFormVisible=true
				if (row) {
					this.editFormTtile='编辑'
					this.editForm.id=row.id
					this.editForm.name=row.name
					this.editForm.type=row.type
					this.editForm.content=row.content
				}else{
					this.editFormTtile='新增'
					this.editForm.id=0
					this.editForm.name=this.name
					this.editForm.type=''
					this.editForm.content=''
				}
			},
			// 提交中
			submiting:function(bth){
				this.editLoading=true
				NProgress.start()
				if (bth) {
					this.btnEditText='提交中'
				}
			},
			// 提交完成
			end:function(message){
				this.editLoading=false
				NProgress.done()
				this.btnEditText='提 交'
				this.editFormVisible = false
				this.$notify(message)
			},
			//删除记录
			handleDel:function(row){
				var self=this
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					self.submiting(0)
					var ssj = new self.ssjUpdate(row.id)
					ssj.destroy().then(function (success) {
						self.end({ title: '成功', message: '删除成功', type: 'success' })
						self.getList()
				  }, function (error) {
						self.end({ title: '失败', message: '删除失败', type: 'error' })
				  });
				}).catch(() => {
				});
			},
			//提交
			editSubmit:function(){
				var self=this;
				self.$refs.editForm.validate((valid)=>{
					if(valid){
						self.$confirm('确认提交吗？','提示',{}).then(()=>{
							self.submiting(1)
							var ssj = (self.editForm.id === 0) ? new self.ssj() : new self.ssjUpdate(self.editForm.id)
							delete self.editForm.id
							for (let key in self.editForm) {
							  ssj.set(key, self.editForm[key])
							}
							ssj.save().then(function (todo) {
								self.end({ title: '成功', message: '提交成功', type: 'success' })
								self.getList()
						  }, function (error) {
								self.end({ title: '失败', message: '提交失败'+error, type: 'error' })
						  })
						})
					}
				})
			}

    }
  }
</script>

<style scoped>
	.toolbar .el-form-item {
		margin-bottom: 10px;
	}

	.toolbar {
		background: #fff;
		padding: 10px 10px 0px 10px;
	}
</style>
