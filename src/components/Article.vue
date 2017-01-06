<template>
	<el-row>
		<el-col :span="24" v-html="article" class="blog-markdown">
		</el-col>
	</el-row>
</template>

<script>
import showdown from 'showdown'

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
			self.article = new showdown.Converter().makeHtml(todo.attributes.content)
		}, function (error) {
			console.error(error)
		})
	}
}
</script>
<style media="screen">
	@import "../assets/markdown.css";
</style>
