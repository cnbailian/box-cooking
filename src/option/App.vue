<template>
	<div id="app">
		<section>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span style="line-height: 36px;">配置</span>
					<el-button style="float: right;" type="primary" @click="onSubmit">保存</el-button>
				</div>
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="appId">
						<el-input v-model="form.appId" placeholder="leancloud 的appId"></el-input>
					</el-form-item>
					<el-form-item label="appKey">
						<el-input v-model="form.appKey" placeholder="leancloud 的appKey"></el-input>
					</el-form-item>
					<el-form-item label="name">
						<el-input v-model="form.name" placeholder="you name"></el-input>
					</el-form-item>
				</el-form>
			</el-card>
		</section>
	</div>
</template>

<script>
	export default {
		name: 'app',
		components: {
		},
		data() {
			return {
				form: {
					appId: localStorage.appId,
					appKey: localStorage.appKey,
					name: this.name
				}
			}
		},
		methods: {
			onSubmit() {
				if (this.form.appId) localStorage.appId = this.form.appId
				if (this.form.appKey) localStorage.appKey = this.form.appKey
				localStorage.name = this.form.name
				this.$notify({
					title: 'success',
					message: '保存成功',
					type: 'success'
				});
			}
		}
	}
</script>

<style>
	body {
		/*background-color: #324057;*/
		margin: 0px;
		padding: 0px;
		/*background: url(assets/bg1.jpg) center !important;
		background-size: cover;*/
		background: #fff;
		font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
		font-weight: 400;
		-webkit-font-smoothing: antialiased;
	}
	.box-card{
		width:80%;
		margin:30px auto;
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
