<template>
	<section>
		<el-table :data="tableData" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" width="100">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="100" sortable>
			</el-table-column>
			<el-table-column inline-template label="姓名">
				<div><a target="_blank" :href="row">{{row.content}}</a></div>
	    </el-table-column>
			<el-table-column inline-template :context="_self" label="操作" width="100">
				<span>
					<el-button type="text" size="small" @click="handleDel(row)">删除</el-button>
				</span>
			</el-table-column>
		</el-table>

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
			listLoading:false,
			tableData: [],
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
			this.listLoading = true
			var self = this
			var query = self.query('main')
		  query.equalTo('type', 'link')
			query.count().then(function (count) {
				self.count = count
			})
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
				self.tableData = array
				self.listLoading = false
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
		handleDel:function(row){
			var self=this
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				self.submiting(0)
				var box = new self.updateObj('main', row.id)
				box.destroy().then(function (success) {
					self.end({ title: '成功', message: '删除成功', type: 'success' })
					self.getList()
				}, function (error) {
					self.end({ title: '失败', message: '删除失败', type: 'error' })
				})
			}).catch((e) => {
				console.log(e)
			})
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
