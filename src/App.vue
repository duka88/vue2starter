<template>
	<div class="main" id="app">
		<header-component />
		<router-view></router-view>
		<transition name="slide-fade">
			<login-popup-component v-if="popup === 'login'" />
		</transition>
		<footer-component />
	</div>
</template>

<script>
import HeaderComponent from './components/global/HeaderComponent';
import FooterComponent from './components/global/FooterComponent';
import LoginPopupComponent from './components/partials/LoginPopupComponent';

export default {
	name: 'App',
	components: {
		HeaderComponent,
		FooterComponent,
		LoginPopupComponent
	},
	computed: {
		popup() {
			return this.$store.state.users.openPopup;
		}
	}
};
</script>

