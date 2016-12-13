<template>
	<section style="">
    <el-col :span="12" style="padding:0 10px;">
      <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 10}" placeholder="markdown格式 右侧在线预览" v-model="textarea"></el-input>
    </el-col>
    <el-col :span="12" class="show-html" v-html="markdown( textarea )"></el-col>
	</section>
</template>

<script>
import markdown from 'markdown'

export default {
  data() {
    return {
      textarea: ''
    }
  },
	created(){
		// document.getElementsByTagName('textarea').addEventListener("click", function(){
		//     document.getElementById("demo").innerHTML = "Hello World";
		// }
		// document.getElementsByTagName('textarea').addEventListener()
		// document.getElementsByTagName('textarea').onscroll(function(){
		// 	console.log('aa')
		// })
		// document.getElementsByTagName('textarea').onscroll(this.htmlScroll)
	},
  methods: {
    markdown:function(html){
      return markdown.markdown.toHTML(html)
    },
		htmlScroll:function(scroll){
			console.log(scroll)
		}
  }
}
</script>

<style>
section{
  min-height:895px;
  background:rgb(224, 224, 224);
}
.show-html{
  float:right;
  height: 895px;
  overflow: auto;
}
</style>
