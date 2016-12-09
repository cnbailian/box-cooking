<template>
	<section>
		<el-row v-loading="loading">
		  <el-col :span="8" v-for="(text, index) in texts">
		    <el-card :body-style="{ padding: '0px' }">
					<div style="padding: 14px;min-height:200px;">
		        <span>{{ text.content }}</span>
					</div>
		      <div style="padding: 14px;">
		        <div class="bottom clearfix">
						  <time class="time">{{ text.time }}</time>
		          <el-button type="text" class="button" @click="handleDel(text.id)">删除</el-button>
		          <el-button type="text" class="button" @click="handleEdit(text)" style="margin-right:10px;">编辑</el-button>
		        </div>
		      </div>
		    </el-card>
		  </el-col>
		</el-row>

		<!--分页-->
		<el-col :span="24" class="toolbar" style="padding-bottom:10px;margin-top:30px;">
			<el-pagination @size-change="sizeChange" @current-change="current" :page-sizes="[10, 15, 20]" layout="total, sizes, prev, pager, next, jumper"
				:total="count" style="float:right">
			</el-pagination>
		</el-col>

		<el-dialog title="编辑" v-model="showForm" :close-on-click-modal="false">
			<el-form label-width="80px" ref="editForm">
				<el-form-item label="描述">
					<el-input type="textarea" v-model="content" placeholder="描述"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="showForm = false">取 消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{ btnEditText }}</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
import NProgress from 'nprogress'

export default {
	data() {
		return {
			texts: [],
			count:0,
			loading: true,
			showForm: false,
			content: '',
			editLoading: false,
			btnEditText: '提 交'
		};
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
		handleEdit:function(text){
			this.showForm = true
			this.content = text.content
			this.textId = text.id
		},
		editSubmit:function(){
			var self = this;
			// 设置提交状态
			self.editLoading = true
			self.btnEditText = '提交中'
			var box = new self.boxUpdate(this.textId)
			box.set('content', self.content)
			box.save().then(function (todo) {
				self.editLoading = false
				self.btnEditText = '提 交'
				self.showForm = false
				self.$notify({ title: '成功', message: '编辑成功', type: 'success' })
				self.getList()
			}, function (error) {
				self.editLoading = false
				self.btnEditText = '提 交'
				self.showForm = false
				self.$notify({ title: '失败', message: '提交失败'+error, type: 'error' })
			})
		},
		// 列表获取
		getList:function(){
			this.loading = true
			var self = this
			var query = self.query()
		  query.equalTo('type', 'text')
			query.count().then(function (count) {
				self.count = count
			});
			query.limit(this.tableSize);
			query.skip((this.tablePage - 1) * this.tableSize);
			query.find().then(function (result) {
				var array = []
				result.forEach(function(val){
					let value = val.attributes
					value['time'] = val.createdAt.toLocaleString()
					value['id'] = val.id
					array.push(value)
				})
				self.texts = array
				self.loading = false
			})
		},
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
		handleDel:function(id){
			var self=this
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				self.submiting(0)
				var box = new self.boxUpdate(id)
				box.destroy().then(function (success) {
					console.log("a")
					self.end({ title: '成功', message: '删除成功', type: 'success' })
					self.getList()
				}, function (error) {
					console.log(error)
					self.end({ title: '失败', message: '删除失败', type: 'error' })
				});
			}).catch((e) => {
				console.log(e)
			});
		},
	}
}
</script>

<style>
	.time {
		font-size: 13px;
		color: #999;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}

	.button {
		padding: 0;
		float: right;
	}

	.image {
		max-width: 100%;
		max-height: 100%;
		display: block;
    margin: 0 auto;
	}

	.clearfix:before,
	.clearfix:after {
			display: table;
			content: "";
	}

	.clearfix:after {
			clear: both
	}
</style>
