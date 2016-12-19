<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button @click.native="jump">新增</el-button>
		</el-col>

		<el-table :data="tableData" style="width: 100%" v-loading="loading">
			<el-table-column type="index" width="100"></el-table-column>
			<el-table-column prop="title" label="标题"></el-table-column>
			<el-table-column inline-template :context="_self" label="操作">
				<span>
					<el-button type="text" size="small" @click="jump(row, 'article')">查看</el-button>
					<el-button type="text" size="small" @click="jump(row, 'edit')">编辑</el-button>
					<el-button type="text" size="small" @click="handleDel(row)">删除</el-button>
				</span>
			</el-table-column>
		</el-table>
	</section>
</template>

<script>
import NProgress from 'nprogress'
export default {
	data() {
		return {
			loading: true,
			tableData: []
		}
	},
	created(){
		this.getList()
	},
	methods: {
		handleDel:function(row){
			var self=this
			this.$confirm('确认删除该标签吗?', '提示', {
				type: 'warning'
			}).then(() => {
				var tag = new self.updateObj('summary', row.id)
				tag.destroy().then(function (success) {
					self.$notify({ title: '成功', message: '删除成功', type: 'success' })
					self.getList()
				}, function (error) {
					self.$notify({ title: '失败', message: '删除失败'+error, type: 'error' })
				})
			}).catch((e) => {
				console.log(e)
			})
		},
		getList:function(){
			var self = this
			self.loading = true
			var query = self.query('summary')
			query.find().then(function (result) {
				var array = []
				result.forEach(function(val){
					let value = val.attributes
					value['id'] = val.id
					array.push(value)
				})
				self.tableData = array
				self.loading = false
			}, function(error){
				console.error(error)
				self.loading = false
			})
		},
		jump:function(row, type = ''){
			switch(type){
				case '':
					this.$router.push('/summary/write')
					break;
				case 'article':
					this.$router.push('/summary/article/'+row.id)
					break;
				case 'edit':
					this.$router.push('/summary/edit/'+row.id)
					break;
			}
		}
	}
}
</script>
<style scoped>
	 .toolbar {
		 background: #fff;
		 padding: 10px;
	 }
</style>
