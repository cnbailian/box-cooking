<template>
	<section>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button @click.native="show = true;tag = ''">新增</el-button>
    </el-col>

    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column type="index" width="100"></el-table-column>
      <el-table-column prop="tag" label="名称"></el-table-column>
      <el-table-column prop="type" label="主题" inline-template>
        <el-tag :type="row.type">{{row.type}}</el-tag>
      </el-table-column>
      <el-table-column inline-template :context="_self" label="操作">
        <span>
          <el-button type="text" size="small" @click="jump(row)">查看</el-button>
          <el-button type="text" size="small" @click="handleDel(row)">删除</el-button>
        </span>
      </el-table-column>
    </el-table>

    <el-dialog title="添加" v-model="show" :close-on-click-modal="false">
      <el-form label-width="80px" ref="editForm">
				<el-form-item label="主题">
					<el-select v-model="tagTypeValue">
						<el-option v-for="type in tagType" :label="type.label" :value="type.value"></el-option>
					</el-select>
				</el-form-item>
        <el-form-item label="名称">
          <el-input v-model="tag" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="show = false">取 消</el-button>
        <el-button type="primary" @click.native="handleAdd" :loading="editLoading">{{btnEditText}}</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import NProgress from 'nprogress'
export default {
  data() {
    return {
      loading: true,
      editLoading: false,
      btnEditText: '添 加',
      tableData: [],
      show: false,
      tag: '',
      tagTypeValue: '',
      tagType: this.tagTypeList
    }
  },
	created(){
		this.getList()
	},
  methods: {
    handleAdd:function(){
      var self = this
      this.btnEditText = '提交中'
      this.editLoading = true
      var tag = new this.tagObj
			tag.set('name', this.name)
			tag.set('tag', this.tag)
			tag.set('type', this.tagTypeValue)
			tag.save().then(function (todo) {
				self.editLoading = false
				self.btnEditText = '添 加'
				self.show = false
				self.$notify({ title: '成功', message: '编辑成功', type: 'success' })
				self.getList()
			}, function (error) {
				self.editLoading = false
				self.btnEditText = '添 加'
				self.show = false
				self.$notify({ title: '失败', message: '提交失败'+error, type: 'error' })
			})
    },
    handleDel:function(row){
			var self=this
			this.$confirm('确认删除该标签吗?', '提示', {
				type: 'warning'
			}).then(() => {
				var tag = new self.updateObj('tag', row.id)
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
      var query = this.query('tag')
		  query.find().then(function (result) {
				var array = []
				result.forEach(function(val){
					let value = val.attributes
					value['id'] = val.id
					array.push(value)
				})
				self.tableData = array
        self.loading = false
		  })
    },
		jump:function(row){
			this.$router.push('/tag/'+row.id)
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
