<template>
	<section>
		<el-col :span="24">
			<el-col :span="5" style="margin:5px 10px;">
				<el-input placeholder="请输入标题" v-model="title"></el-input>
			</el-col>
			<el-button type="primary" @click="save(false)" style="margin:5px;" v-loading="saveLoading">保存</el-button>
			<el-button type="primary" @click="save(true)" style="margin:5px;" v-loading="saveLoading">提交</el-button>
		</el-col>
		<el-col :span="12" style="padding:0 10px;" v-loading="loading" element-loading-text="上传中">
			<el-input type="textarea" :autosize="{ minRows: 10, maxRows: 10}" placeholder="markdown格式 右侧在线预览" v-model="textarea"></el-input>
		</el-col>
		<el-col :span="12" class="show-html blog-markdown" v-html="markdown( textarea )" id="html"></el-col>
	</section>
</template>

<script>
import markdown from 'markdown'

export default {
	data() {
		return {
			textarea: '',
			title: '',
			loading: false,
			id: false,
			saveLoading: false
		}
	},
	mounted: function() {
		var self = this
		// 按滚动条百分比进行预览
		var holder = document.getElementsByTagName('textarea')[0]
		holder.addEventListener("scroll", function(){
			var current = this.scrollTop / (this.scrollHeight - this.clientHeight)
			var html = document.getElementById('html')
			html.scrollTop = (html.scrollHeight - html.clientHeight) * current
		})
		// 图片推拽上传
		holder.ondragover = function () { return false }
		holder.ondragend = function () { return false }
		holder.ondrop = function (event) {
			event.preventDefault()
			var files = event.dataTransfer.files
			for (var i = 0; i < files.length; i++) {
				self.loading = true
				let file = self.file(files[i].name, files[i])
				file.save().then(function(file) {
					self.loading = false
					self.textarea += "\n![]("+file.url()+")"
				}, function(error) {
					self.loading = false
					console.error(error)
				})
			}
		}
	},
	created(){
		if (this.$route.params.id) {
			var query = this.query('summary')
			var self = this
			query.get(this.$route.params.id).then(function (todo) {
				self.id = todo.id
				self.title = todo.attributes.title
				self.textarea = todo.attributes.content
			}, function (error) {
				console.error(error)
			})
		}
	},
	methods: {
		markdown:function(html){
			return markdown.markdown.toHTML(html)
		},
		save:function(jump = false){
			this.saveLoading = true
			if (this.textarea == '') return true
			var self = this
			var summary = this.id ? new self.updateObj('summary', this.id) : new self.summary()
			summary.set('name', this.name)
			summary.set('title', this.title)
			summary.set('content', this.textarea)
			summary.save().then(function (todo) {
				self.saveLoading = false
				self.id = todo.id
				if (jump) self.$router.push('/summary')
			}, function (error) {
				console.error(error)
			})
		}
	}
}
</script>

<style>
	@import "../assets/markdown.css";
	textarea{
		font-size: 16px;
		font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
		font-weight: 400;
	}
	.show-html{
		float:right;
		height: 895px;
		overflow: auto;
		line-height: 21px;
		font-size: 15px
	}
</style>
