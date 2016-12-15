<template>
	<el-row>
	  <el-col :span="24" v-html="article">
		</el-col>
	</el-row>
</template>

<script>
import markdown from 'markdown'
export default {
	data() {
		return {
			article: ''
		}
	},
	created(){
		var query = this.query('summary')
		var self = this
		query.get(this.$route.params.id).then(function (todo) {
			self.article = markdown.markdown.toHTML(todo.attributes.content)
		}, function (error) {
			console.error(error)
		})
  }
}
</script>
