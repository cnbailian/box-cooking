<template>
	<section>
		<el-row>
		  <el-col :span="8" v-for="(img, index) in imgs">
		    <el-card :body-style="{ padding: '0px' }">
					<div style="height:200px;">
		      	<img :src="img.content" class="image">
					</div>
		      <div style="padding: 14px;">
		        <span>{{ img.name }}</span>
		        <div class="bottom clearfix">
						  <time class="time">{{ img.time }}</time>
		          <el-button type="text" class="button" @click="handleDel(img.id)">删除</el-button>
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
	</section>
</template>

<script>
import NProgress from 'nprogress'

export default {
	data() {
		return {
			imgs: [],
			count:0
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
		// 列表获取
		getList:function(){
			var self = this
			var query = self.query()
		  query.equalTo('type', 'img')
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
				self.imgs = array
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
