<template>
	<el-row class="panel">
		<el-col class="panel-top">
			<el-col style="font-size:26px;">
				<img src="../icon.png" alt="" style="width: 3%;float: left;margin-right: 10px;">
				<span>B<i style="color:#20a0ff">ox</i></span>
			</el-col>
		</el-col>
		<el-col :span="24">
			<!--<el-col :span="4">-->
			<aside style="width:230px;">
				<el-menu style="border-top: 1px solid #475669;" :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleopen"
					@close="handleclose" @select="handleselect" theme="dark" unique-opened router>
					<el-menu-item index="/"><i class="fa fa-line-chart"></i>table</el-menu-item>
					<el-menu-item index="/type"><i class="fa fa-line-chart"></i>type</el-menu-item>
				</el-menu>
			</aside>
			<!--</el-col>-->
			<!--<el-col :span="20" class="panel-c-c">-->
			<section class="panel-c-c">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" style="margin-bottom:15px;">
						<strong style="width:200px;float:left;color: #475669;font-size: 21px;">{{currentPathName}}</strong>
					</el-col>
					<el-col :span="24" style="background-color:#fff;box-sizing: border-box;">
						<transition name="expand">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
			<!--</el-col>-->
		</el-col>
	</el-row>
</template>

<script>
  export default {
    data() {
      return {
			  currentPathName:'Table',
				defaultActive:this.$root._route.path
      }
    },
		watch: {
			'$route' (to, from) {//监听路由改变
				this.currentPathName=to.name
			}
		},
		created(){
			console.log(this.default)
		},
    methods: {
      onSubmit() {
        console.log('submit!');
      },
			handleopen(){
				//console.log('handleopen');
			},
			handleclose(){
				//console.log('handleclose');
			},
      handleselect:function(a,b){
				// console.log(a, b);
      },
    }
  }
</script>

<style scoped>
	/* 必需 */
	.expand-transition {
	  transition: all .3s ease;
	  height: 30px;
	  padding: 10px;
	  background-color: #eee;
	  overflow: hidden;
	}
	/* .expand-enter 定义进入的开始状态 */
	/* .expand-leave 定义离开的结束状态 */
	.expand-enter, .expand-leave {
	  height: 0;
	  padding: 0 10px;
	  opacity: 0;
	}

	.panel {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
	}

	.panel-top {
		height: 60px;
		line-height: 60px;
		background: #1F2D3D;
		color: #c0ccda;
	}

	.panel-center {
		background: #324057;
		position: absolute;
		top: 60px;
		bottom: 0px;
		overflow: hidden;
	}

	.panel-c-c {
		background: #f1f2f7;
		position: absolute;
		right: 0px;
		top: 0px;
		bottom: 0px;
		left: 230px;
		overflow-y: scroll;
		padding: 20px;
	}

	.logout {
		background: url(../assets/logout_36.png);
		background-size: contain;
		width: 20px;
		height: 20px;
		float: left;
	}

	.logo {
		width: 40px;
		float: left;
		margin: 10px 10px 10px 18px;
	}

	.tip-logout {
		float: right;
		margin-right: 20px;
		padding-top: 5px;
		cursor: pointer;
	}

	.admin {
		color: #c0ccda;
		text-align: center;
	}
</style>
