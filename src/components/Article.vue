<template>

</template>

<script>
	export default {
		data() {
			return {
				tableData: this.typeList
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
    }
	}
</script>
