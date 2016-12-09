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
				<el-table-column type="index" width="100">
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

		<!--表单-->
		<el-dialog :title="editFormTtile" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="类型">
					<el-select v-model="editForm.type" placeholder="请选择" @change="handleType">
				    <el-option v-for="item in options" :label="item.name" :value="item.value"></el-option>
				  </el-select>
				</el-form-item>
				<el-form-item label="图片上传" v-show="showImg">
					<el-card :body-style="{ padding: '0px' }" style="max-height:300px;"  v-show="showThumbnail">
						<img :src="thumbnail" class="image">
					</el-card>
					<el-upload action="/" :before-upload="handleUplode">
					  <el-button size="small" type="primary">点击上传</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="内容">
					<el-input type="textarea" v-model="editForm.content" :placeholder="placeholder"></el-input>
				</el-form-item>
				<el-form-item label="描述" v-show="showImg">
					<el-input type="textarea" v-model="description" placeholder="描述"></el-input>
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
				formInline: { content: '' }, // 工具条
				count:0, // 分页总数默认值
				editFormVisible:false, // 表单页面show开关
				editFormTtile:'编辑', // 表单标题
				editForm: {}, // 表单内容默认值
				placeholder: '请输入文本内容',  // 内容的默认文本
				showImg: false, // 上传show开关
				showThumbnail: false, // 缩略图show开关
				thumbnail: '', // 默认缩略图
				description: '', // 默认图片描述
				options: this.typeList,	// 默认类别
				editLoading:false, // 提交状态
				btnEditText:'提 交', // 提交按钮内容
				tableData: [], // 默认列表内容
				listLoading:true // 列表加载
     	}
    },
		created(){
			this.tableSize = 10
			this.tablePage = 1
			this.getList()
		},
    methods: {
			// 类型切换
			handleType(type) {
				this.showImg = false
				switch(type){
					case 'img':
						this.showImg = true
						this.placeholder = '请输入图像网络地址'
						break
					case 'link':
						this.placeholder = '请输入链接地址'
						break
					case 'text':
						this.placeholder = '请输入文本内容'
						break
				}
			},
      handleUplode(file) {
				this.currentFile = file
				this.showThumbnail = true
				var reader = new FileReader();
        reader.readAsDataURL(file);
				var self = this
        reader.onload = function(e){
            self.thumbnail = this.result
        }
				return false
      },
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
				this.listLoading = true
				var self = this
				var query = self.query()
  			query.descending('createdAt');
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
					self.listLoading = false
			  })
			},
			// 表单赋值
			setForm:function(row){
				this.showImg = false
				this.showThumbnail = false
				this.editFormVisible = true
				if (row) {
					this.editFormTtile = '编辑'
					this.editForm = {
						id: row.id,
						name: row.name,
						type: row.type,
						content: row.content
					}
					if (row.type == 'img') {
						this.showImg = true
						this.showThumbnail = true
						this.thumbnail = row.content
					}
				}else{
					this.editFormTtile = '新增'
					this.editForm = {
						id: 0,
						name: this.name,
						type: 'text',
						content: ''
					}
				}
			},
			// 提交中
			submiting:function(bool){
				this.editLoading = true
				NProgress.start()
				if (bool) {
					this.btnEditText = '提交中'
				}
			},
			// 提交完成
			end:function(message){
				this.editLoading = false
				NProgress.done()
				this.btnEditText = '提 交'
				this.editFormVisible = false
				this.$notify(message)
			},
			//删除记录
			handleDel:function(row){
				var self = this
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					self.submiting(0)
					var box = new self.boxUpdate(row.id)
					box.destroy().then(function (success) {
						self.end({ title: '成功', message: '删除成功', type: 'success' })
						self.getList()
				  }, function (error) {
						self.end({ title: '失败', message: '删除失败', type: 'error' })
				  });
				}).catch(() => {
				})
			},
			//提交
			editSubmit:function(){
				var self = this;
				// 设置提交状态
				self.submiting(1)
				// 根据提交类型实例化leancloud
				var box = (self.editForm.id === 0) ? new self.box() : new self.boxUpdate(self.editForm.id)
				delete self.editForm.id
				// 图像特殊处理
				if (self.editForm.type == 'img') {
					self.editForm.description = self.description
					var fileName = self.currentFile ? self.currentFile.name : self.editForm.content.replace(/^.*[\\\/]/, '')
					var file = self.currentFile ? self.file(fileName, self.currentFile) :  self.networkFile(fileName, self.editForm.content)
			    file.save().then(function(file) {
			      self.editForm.content = file.url()
						for (let key in self.editForm) {
						  box.set(key, self.editForm[key])
						}
						box.save().then(function (todo) {
							self.end({ title: '成功', message: '提交成功', type: 'success' })
							self.getList()
					  }, function (error) {
							self.end({ title: '失败', message: '提交失败'+error, type: 'error' })
					  })
			    }, function(error) {
			      console.error(error)
			    })
				}
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
