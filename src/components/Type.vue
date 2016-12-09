<template>
	 <el-table :data="tableData" style="width: 100%">
		 <el-table-column type="index" width="100"></el-table-column>
		 <el-table-column prop="name" label="类型"></el-table-column>
		 <el-table-column inline-template :context="_self" label="操作">
			 <span>
				 <el-button type="text" size="small" @click="jump(row)">查看列表</el-button>
			 </span>
		 </el-table-column>
	 </el-table>
 </template>

 <script>
	 export default {
		 data() {
			 return {
				 tableData: this.typeList
			 }
		 },
     methods: {
			 jump:function(row){
				 this.$router.push('/'+row.value)
			 }
		 }
	 }
 </script>
