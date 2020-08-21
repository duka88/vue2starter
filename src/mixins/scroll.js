const scrollMixin = {
	methods: {
		scrollToTop() {
			window.scrollTo({top: 0, behavior: 'smooth'});
		},
		scrollTo(letter) {
			let el = document.getElementById(`product-${letter}`);
			el.scrollIntoView({behavior: "smooth", block: "start"})
		},
	}
};

export default scrollMixin;