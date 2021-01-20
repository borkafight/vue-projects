import authApi from '@/api/auth'

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
}

const mutations = {
  registerStart(state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  registerSuccess(state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isloggedIn = true
  },
  registerFailure(state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
}

const actions = {
  register(context, credentials) {
    return new Promise((resolve) => {
      authApi
        .register(credentials)
        .then((response) => {
          console.log(response)
          context.commit('registerSuccess', response)
          resolve(response.data.user)
        })
        .catch((result) => {
          console.log(result)
          context.commit('registerFailure', result.response.data.errors)
        })
    })
    // context.commit('registerStart')
  },
}

export default {
  state,
  mutations,
  actions,
}
