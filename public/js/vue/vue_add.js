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
						error: null,
						file: []
				}
		},
		methods: {
				logIt(event) {
						event.preventDefault()
						const fdata = new FormData();
						fdata.append('mark', this.mark)
						fdata.append('model', this.model)
						fdata.append('year', this.year)
						fdata.append('selectedType', this.selectedType)
						fdata.append('odometer', this.odometer)
						fdata.append('engine', this.engine)
						fdata.append('comment', this.comment)
						fdata.append('features', this.checkedFeature)
						for(let i = 0; i < this.file.length; i++){
								fdata.append('photos', this.file[i])
						}
						const transport = {
								mark: this.mark,
								model: this.model,
								year: this.year,
								selectedType: this.selectedType,
								odometer: this.odometer,
								engine: this.engine,
								comment: this.comment,
						}

						const allFieldsFilled = Object
								 .keys(transport)
								 .every(key => !!transport[key])

						if(!allFieldsFilled){
							this.error = 'შეავსე ყველა ველი'
								console.log(this.error)
						}else{
								api.post('/newTransport', fdata)
										 .then((response) => {
										window.location.replace('admin/add')
												 console.log(response.data.msg)
												 window.location.replace('/admin')
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
						this.file.push(files[0])
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