import axios from 'axios';
const state = {
	products: [],
	searchResults: [],
	sortedProduct: [],
	searchSuggestions: [],
	therapies: [],
	product: {}
};

const mutations = {
	setProduct(state, payload) {
		state.product = state.products.find(product => product.id === payload);
	},
	setProducts(state, payload) {
		state.products =  payload;
	},
	sortProducts(state, payload) {
		let obj = state.products.reduce((prev, curent) => {
			let group = curent[payload][0] !== '(' ?  curent[payload][0] : curent[payload][1].toUpperCase();

			if(!prev[group]) {
				prev[group] = {group, products: [curent]}
			}else{
				prev[group].products.push(curent);
			}

			return prev;
		}, {});
		state.sortedProduct = Object.entries(obj).sort().reduce( (o,[k,v]) => (o[k]=v,o), {} );
	},
	sortTherapy(state) {
		let obj = state.products.reduce((prev, curent) => {
			let group = curent['Therapy Area'];

			if(!prev[group]) {
				prev[group] = {group, products: [curent]}
			}else{
				prev[group].products.push(curent);
			}

			return prev;
		}, {});
		state.sortedProduct = Object.entries(obj).sort().reduce( (o,[k,v]) => (o[k]=v,o), {} );
	},
	searchProducts(state, payload) {
		if (payload === '') {
			state.searchSuggestions = [];
			state.searchResults = [];
		} else {
			let req = new RegExp(`(\\b${payload}\\S+\\b)`,"ig");
			let resultItems = [];
			let resultWords = [];
			state.products.forEach((product) => {
				let brand = product['Brand Name'].match(req);
				let name = product['Generic Name'].match(req);
				let therapy = product['Therapy Area'].match(req);
				if (brand) {
					resultItems.push(product);
					resultWords.push(product['Brand Name']);
				} else if (name) {
					resultItems.push(product);
					resultWords.push(product['Generic Name']);
				} else if (therapy) {
					resultItems.push(product);
					resultWords.push(product['Therapy Area']);
				}
			});

			state.searchResults = resultItems;
			state.searchSuggestions =  [...new Set(resultWords)].slice(0,5);
		}
	},
	resetSearchSuggestions(state) {
		state.searchSuggestions = [];
	},
	setTherapies(state) {
		state.therapies =  [...new Set(state.products.map(product => product['Therapy Area']))];
	}
};

const actions = {
	setProduct({commit}, payload) {
		commit('setProduct', payload);
	},
	getProducts({commit, state}, payload) {
		if(state.products.length === 0) {
			axios.get('products.json')
				.then(({data})=>{
					commit('setProducts', data);
					if(payload.search) {
						commit('searchProducts', payload.search);
					} else {
						commit('sortProducts', payload.sort);
						commit('setTherapies');
					}
				});
		}else{
			if(!payload.search) {
				commit('sortProducts', payload.sort);
			}
		}
	}
};

export default {
	namespaced: true,
	state,
	actions,
	mutations
};