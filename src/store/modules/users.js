
const state = {
	user: {
		name: 'test',
	},
	openPopup: false,
};

const mutations = {
	setPopup(state, payload) {
		state.openPopup = payload;
	}
};

const actions = { };

export default {
	namespaced: true,
	state,
	actions,
	mutations
};