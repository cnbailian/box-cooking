<template>
	<div id="app">
		<section>
			<el-row>
				<el-select v-model="value" placeholder="请选择" @change="handleType">
					<el-option v-for="item in options" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-row>
			<el-row>
				<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :placeholder="placeholder" v-model="content"  v-focus>
				</el-input>
			</el-row>
			<el-row style="float:right">
				<el-button type="primary" @click="handleSubmit">提交保存</el-button>
			</el-row>
		</section>
	</div>
</template>

<script>
export default {
	name: 'app',
	components: {
	},
	// 自定义指令 实现聚焦textarea
	directives: {
		focus: {
			inserted: function (el) {
				el.querySelector("textarea").focus()
			}
		}
	},
	data() {
		return {
			content: String(document.execCommand('paste')),
			options: this.typeList,
			value: 'text',
			placeholder: '请输入文本内容 Control+S保存'
		}
	},
	created(){
		this.hotkey()
	},
	methods: {
		handleType(type) {
			switch(type){
				case 'img':
					this.placeholder = '请输入图片网络地址'
					break;
				case 'link':
					this.placeholder = '请输入链接地址'
					break;
				case 'text':
					this.placeholder = '请输入文本内容 Control+S保存'
					break;
			}
		},
		handleSubmit(){
			var box = new this.box;
			box.set('name',this.name)
			box.set('type',this.value)
			box.set('content',this.content)
			if (this.value == 'img') {
				var fileName = this.content.replace(/^.*[\\\/]/, '')
				var file = this.networkFile(fileName, this.content)
				file.save().then(function(file) {
					box.set('content', file.url())
				}, function(error) {
					console.error(error)
				})
			}
			var self = this
			box.save().then(function (todo) {
				self.content = ''
			}, function (error) {
				console.error(error)
			})
		},
		hotkey(){
			var Control = false
			var self = this
			document.body.onkeydown = function(e){
				if (event.keyCode === 17)
					Control = true
				if (event.keyCode === 83 && Control)
					self.handleSubmit()
			}
			document.body.onkeyup = function (event) {
				if (event.keyCode === 17)
					Control = false
			}
		}
	}
}
</script>

<style>

	.bounce-enter-active {
		animation: bounce-in .5s;
	}

	.bounce-leave-active {
		animation: bounce-out .2s;
	}

	@keyframes bounce-in {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1.05);
		}
		100% {
			transform: scale(1);
		}
	}

	@keyframes bounce-out {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(0.95);
		}
		100% {
			transform: scale(0);
		}
	}

	body {
		/*background-color: #324057;*/
		margin: 0px;
		padding: 0px;
		/*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
		background: #1F2D3D;
		font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
		font-weight: 400;
		-webkit-font-smoothing: antialiased;
		width: 250px;
		height: 200px;
	}

	#app {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 250px;
	}
	.el-row {
		margin: 10px;
		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-submenu [class^=fa] {
		vertical-align: baseline;
		margin-right: 10px;
	}

	.el-menu-item [class^=fa] {
		vertical-align: baseline;
		margin-right: 10px;
	}
</style>
