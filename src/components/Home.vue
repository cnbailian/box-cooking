<template>
	<el-row class="panel">
		<el-col class="panel-top">
			<el-col style="font-size:26px;">
				<span>AD<i style="color:#20a0ff">MIN</i></span>
			</el-col>
		</el-col>
		<el-col :span="24">
			<!--<el-col :span="4">-->
			<aside style="width:230px;">
				<el-menu style="border-top: 1px solid #475669;" default-active="/table" class="el-menu-vertical-demo" @open="handleopen"
					@close="handleclose" @select="handleselect" theme="dark" unique-opened router>
					<el-menu-item index="/table"><i class="fa fa-line-chart"></i>table</el-menu-item>
					<el-menu-item index="/form"><i class="fa fa-line-chart"></i>form</el-menu-item>
					<el-menu-item index="/page3"><i class="fa fa-line-chart"></i>page3</el-menu-item>
					<el-menu-item index="/page6"><i class="fa fa-line-chart"></i>导航三</el-menu-item>
				</el-menu>
			</aside>
			<!--</el-col>-->
			<!--<el-col :span="20" class="panel-c-c">-->
			<section class="panel-c-c">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" style="margin-bottom:15px;">
						<strong style="width:200px;float:left;color: #475669;">{{currentPathName}}</strong>
					</el-col>
					<el-col :span="24" style="background-color:#fff;box-sizing: border-box;">
						<transition name="fade">
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
			  currentPathName:'Table'
      }
    },
		watch: {
			'$route' (to, from) {//监听路由改变
				this.currentPathName=to.name;
			}
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
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s
	}

	.fade-enter,
	.fade-leave-active {
		opacity: 0
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
