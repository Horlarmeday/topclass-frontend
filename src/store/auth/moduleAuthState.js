export default {
    status: '',
    token: localStorage.getItem('user-token') || '',
    user: null,
    isLoggedInUser: null,
    search: null
}