<template>
	<div class="popup" >
		<div @click="closePopup()" class="button" >
			close
		</div>
	</div>
</template>
<script>
export default {
	name: 'Login',
	data() {
		return {

		}
	},
	methods: {
		closePopup() {
				this.$store.commit('users/setPopup', false);
		}
	}
}
</script>
