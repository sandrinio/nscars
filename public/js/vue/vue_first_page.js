
new Vue({
		el: '#content',
		data () {
				return {
						prodYear: null,
						engine: null,
						hybrid: false,
						total: null,
						warning: false
				}
		},
		methods: {
				calc () {
						let e = (new Date).getFullYear(),
								 t = parseInt(this.prodYear),
								 n = this.engine * 1000,
								 a = this.hybrid,
								 c = e - t
						let coef
						if(c < 3){
							coef = 1.5
						}
						if(c === 3){
							coef = 1.4
						}
						if(c === 4){
							coef = 1.2
						}
						if(c === 5){
							coef = 1
						}
						if(c > 5 && c < 9){
								coef = .8
						}
						if(c === 9) {
								coef = .9
						}
						if(c === 10) {
								coef = 1.1
						}
						if(c === 11) {
								coef = 1.3
						}
						if(c === 12) {
								coef = 1.5
						}
						if(c === 13) {
								coef = 1.8
						}
						if(c === 14) {
								coef = 2.1
						}
						if(c > 14) {
								coef = 2.4
						}

						let m = Math.round(coef * n);
						a && t > 2011 && (m = 40 * m / 100)
						if(this.total){
						this.total = m + Math.round(.05 * n * (1 + .05 * c)) + 150 + 20 + 30 + " ლარი"
						}else{
								this.total = 'გთხოვთ აირჩიოთ წელი ან ძრავი'
						}

				}
		}
})




