const api = axios.create({
		baseURL: 'http://localhost:3000'
});

new Vue({
		el: '#app',
		data() {
				return {
						fuel: ['დიზელი', 'ჰიბრიდი', 'ბენზინი', 'ელექტრო'],
						mark: '',
						model: '',
						year: '',
						selectedType: '',
						odometer: '',
						engine: '',
						checkedFeature: [],
						comment: '',
						photos: [],
						error: null
				}
		},
		methods: {
				logIt(event) {
						event.preventDefault()
						const fdata = new FormData();
						fdata.append('mark', this.mark)
						fdata.append('photos', this.photos)

						const transport = {
								mark: this.mark,
								model: this.model,
								year: this.year,
								selectedType: this.selectedType,
								odometer: this.odometer,
								engine: this.engine,
								comment: this.comment,
								features: this.checkedFeature,
								photos: this.photos
						}

						const allFieldsFilled = Object
								 .keys(transport)
								 .every(key => !!transport[key])

						if(allFieldsFilled){
							this.error = 'შეავსე ყველა ველი'
								console.log(this.error)
						}else{
								api.post('/newTransport', fdata)
										 .then((response) => {
												 console.log(response.data.msg)
										 })
										 .catch((err) => {
												 console.log(err)
										 })
						}
				},
				onFileChange(e) {
						const files = e.target.files || e.dataTransfer.files;
						if (!files.length)
								return;
						this.createImage(files[0]);
				},
				createImage(file) {
						const reader = new FileReader();

						reader.onload = (e) => {
								this.photos.push(e.target.result)
						};
						reader.readAsDataURL(file);
				},
				removeImage: function (index) {
						console.log(`deleted ${index + 1}`)
						this.photos.splice(index, 1)
				}
		}
})