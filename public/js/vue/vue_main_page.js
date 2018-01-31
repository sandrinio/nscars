const api = axios.create({
		baseURL: 'http://localhost:3000'
});

new Vue({
		el: '#app',
		data() {
				return {
						transports: []
				}
		},
		methods: {
				test () {
						alert('hello')
				}
		},
		mounted () {
				let _this = this
				api.get('/transports')
						 .then((response) => {
								response.data.forEach(function (t) {
									_this.transports.push(t)
								})
						 })
						 .catch((err) => {
							console.log(err)
							})
		}
})