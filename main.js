const btnReadMore1 = document.querySelector('.read-more-btn')
const hidenText1 = document.querySelector('.read-more')

const input = document.querySelector('.input')
const btn = document.querySelector('.button')

const cityName = document.querySelector('h1')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.weather__img')

const stateWeather = document.querySelector('.state')
const temperature = document.querySelector('.temperature')
const cloudiness = document.querySelector('.cloudiness')
const windSpeed = document.querySelector('.windy-speed')
const precipitition = document.querySelector('.precipitition')

const photoTomorrowSix = document.querySelector('.weather-tomorrow-six__img')
const photoTomorrowTwelve = document.querySelector('.weather-tomorrow-twelve__img')
const photoTomorrowEighteen = document.querySelector('.weather-tomorrow-eighteen__img')
const temperatureTomorrowSix = document.querySelector('.temperature-tomorrow-six')
const temperatureTomorrowTwelve = document.querySelector('.temperature-tomorrow-twelve')
const temperatureTomorrowEighteen = document.querySelector('.temperature-tomorrow-eighteen')
const precipititionTomorrowSix = document.querySelector('.precipitition-tomorrow-six')
const precipititionTomorrowTwelve = document.querySelector('.precipitition-tomorrow-twelve')
const precipititionTomorrowEighteen = document.querySelector('.precipitition-tomorrow-eighteen')

const newData = document.querySelector('.new-title')
const newTwoData = document.querySelector('.newtwo-title')
const newThirdData = document.querySelector('.newthird-title')

const photoAfterTomorrowSix = document.querySelector('.weather-aftertomorrow-six__img')
const photoAfterTomorrowTwelve = document.querySelector('.weather-aftertomorrow-twelve__img')
const photoAfterTomorrowEighteen = document.querySelector('.weather-aftertomorrow-eighteen__img')
const temperatureAfterTomorrowSix = document.querySelector('.temperature-aftertomorrow-six')
const temperatureAfterTomorrowTwelve = document.querySelector('.temperature-aftertomorrow-twelve')
const temperatureAfterTomorrowEighteen = document.querySelector('.temperature-aftertomorrow-eighteen')
const precipititionAfterTomorrowSix = document.querySelector('.precipitition-aftertomorrow-six')
const precipititionAfterTomorrowTwelve = document.querySelector('.precipitition-aftertomorrow-twelve')
const precipititionAfterTomorrowEighteen = document.querySelector('.precipitition-aftertomorrow-eighteen')

const photoDataSix = document.querySelector('.weather-data-six__img')
const photoDataTwelve = document.querySelector('.weather-data-twelve__img')
const photoDataEighteen = document.querySelector('.weather-data-eighteen__img')
const temperatureDataSix = document.querySelector('.temperature-data-six')
const temperatureDataTwelve = document.querySelector('.temperature-data-twelve')
const temperatureDataEighteen = document.querySelector('.temperature-data-eighteen')
const precipititionDataSix = document.querySelector('.precipitition-data-six')
const precipititionDataTwelve = document.querySelector('.precipitition-data-twelve')
const precipititionDataEighteen = document.querySelector('.precipitition-data-eighteen')

const photoDataNextSix = document.querySelector('.weather-datatwo-six__img')
const photoDataNextTwelve = document.querySelector('.weather-datatwo-twelve__img')
const photoDataNextEighteen = document.querySelector('.weather-datatwo-eighteen__img')
const temperatureDataNextSix = document.querySelector('.temperature-datatwo-six')
const temperatureDataNextTwelve = document.querySelector('.temperature-datatwo-twelve')
const temperatureDataNextEighteen = document.querySelector('.temperature-datatwo-eighteen')
const precipititionDataNextSix = document.querySelector('.precipitition-datatwo-six')
const precipititionDataNextTwelve = document.querySelector('.precipitition-datatwo-twelve')
const precipititionDataNextEighteen = document.querySelector('.precipitition-datatwo-eighteen')

const apiLink = 'https://api.openweathermap.org/data/2.5/forecast?q='
const apiKey = '&appid=de4b6f094e32c006acaedd690e3fba3d'
const units = '&units=metric'
const lang = '&lang=pl'
let $city
let url
btnReadMore1.addEventListener('click', function () {
	hidenText1.classList.toggle('read-more--show')

	btnReadMore1.textContent = btnReadMore1.textContent.includes('Pokaż więcej')? 'Schowaj':'Pokaż więcej'
})

const getWeather = () => {
	$city = !input.value ? 'Kraków' : input.value
	url = apiLink + $city + apiKey + units + lang

	axios
		.get(url)
		.then((res) => {
			console.log(res)
			console.log(`------------`)
			const now = new Date()

			const arrayToday = res.data.list[0]
			const tempToday = arrayToday.main.temp
			const cloudinessToday = arrayToday.clouds.all
			const precipititionToday = arrayToday.pop
			const windToday = arrayToday.wind.speed
			const statusToday = Object.assign({}, ...arrayToday.weather)

			cityName.textContent = res.data.city.name

			temperature.textContent = `Temperatura: ${Math.floor(tempToday)}°C`
			cloudiness.textContent = `-Zachmurzenie: ${cloudinessToday}%`
			windSpeed.textContent = `-Wiatr: ${windToday}m/s`
			stateWeather.textContent =
				statusToday.description.at(0).toUpperCase() +
				statusToday.description.substring(1)

			const checkPrecipitition = (precipitition, place) => {
				if (precipitition === 0) {
					place.textContent = `-Szansa na opady: ${precipitition}%`
				} else if (precipitition === 1) {
					place.textContent = `-Szansa na opady: ${precipitition + '00'}%`
				} else if (precipitition >= 0.01 && precipitition <= 0.99) {
					place.textContent = `-Szansa na opady: ${Math.floor(
						precipitition * 100
					)}%`
				}
			}
			checkPrecipitition(precipititionToday, precipitition)

			warning.textContent = ''
			input.value = ''

			function checkIconWeater(Object, image, checkHaour) {
				if (Object.id >= 200 && Object.id <= 202) {
					image.setAttribute('src', 'img/rainandthunderstorm.svg')
				} else if (Object.id > 202 && Object.id < 300) {
					image.setAttribute('src', 'img/thunderstorm.svg')
				} else if (Object.id >= 300 && Object.id <= 321) {
					image.setAttribute('src', 'img/rain.svg')
				} else if (Object.id === 500 && checkHaour <= 17) {
					image.setAttribute('src', 'img/raincludysunny.svg')
				} else if (Object.id === 500) {
					image.setAttribute('src', 'img/moonraincloudy.svg')
				} else if (Object.id >= 501 && Object.id < 600) {
					image.setAttribute('src', 'img/rain.svg')
				} else if (Object.id >= 600 && Object.id < 700) {
					image.setAttribute('src', 'img/snow.webp')
				} else if (Object.id === 800 && checkHaour <= 17) {
					image.setAttribute('src', 'img/sunny.svg')
				} else if (Object.id === 800) {
					image.setAttribute('src', 'img/moon.svg')
				} else if (Object.id >= 701 && Object.id < 800) {
					image.setAttribute('src', 'img/fog.png')
				} else if (Object.id === 801 && checkHaour <= 17) {
					image.setAttribute('src', 'img/sunnyandclody.svg')
				} else if (Object.id === 801) {
					image.setAttribute('src', 'img/mooncloudy.svg')
				} else if (Object.id > 801 && Object.id < 804 && checkHaour <= 17) {
					image.setAttribute('src', 'img/sunnyandtwoclody.svg')
				} else if (Object.id > 801 && Object.id < 804) {
					image.setAttribute('src', 'img/moonandtwocloudy.svg')
				} else if (Object.id === 804) {
					image.setAttribute('src', 'img/cloudy.svg')
				} else {
					image.setAttribute('src', 'img/error.png')
				}
			}
			checkIconWeater(statusToday, photo, now.getHours())

			const checkPrecipitition2 = (precipitition, place) => {
				if (precipitition === 0) {
					place.textContent = `💧 ${precipitition}%`
				} else if (precipitition === 1) {
					place.textContent = `💧 ${precipitition + '00'}%`
				} else if (precipitition >= 0.01 && precipitition <= 0.99) {
					place.textContent = `💧 ${Math.floor(precipitition * 100)}%`
				}
			}

			function lz(i) {
				return `${i}`.padStart(2, '0')
			}
			const objectTomorrowSix = res.data.list.find((obj) =>obj['dt_txt'] ===`${now.getFullYear()}-${lz(now.getMonth() + 1)}-${lz(now.getDate() + 1)} 06:00:00`)
			const objectTomorrowTwelve = res.data.list.find((obj) =>obj['dt_txt'] ===`${now.getFullYear()}-${lz(now.getMonth() + 1)}-${lz(now.getDate() + 1)} 12:00:00`)
			const objectTomorrowEighteen = res.data.list.find((obj) =>obj['dt_txt'] ===`${now.getFullYear()}-${lz(now.getMonth() + 1)}-${lz(now.getDate() + 1)} 18:00:00`)

			const stateTomorrowSix = Object.assign({}, ...objectTomorrowSix.weather)
			temperatureTomorrowSix.textContent = `${Math.floor(objectTomorrowSix.main.temp)}°C`
			checkIconWeater(stateTomorrowSix, photoTomorrowSix, 17)
			checkPrecipitition2(objectTomorrowSix.pop, precipititionTomorrowSix)

			const stateTomorrowTwelve = Object.assign({},...objectTomorrowTwelve.weather)
			temperatureTomorrowTwelve.textContent = `${Math.floor(objectTomorrowTwelve.main.temp)}°C`
			checkIconWeater(stateTomorrowTwelve, photoTomorrowTwelve, 17)
			checkPrecipitition2(objectTomorrowTwelve.pop, precipititionTomorrowTwelve)

			const stateTomorrowEighteen = Object.assign({},...objectTomorrowEighteen.weather)
			temperatureTomorrowEighteen.textContent = `${Math.floor(objectTomorrowEighteen.main.temp)}°C`
			checkIconWeater(stateTomorrowEighteen, photoTomorrowEighteen, 17)
			checkPrecipitition2(objectTomorrowEighteen.pop,precipititionTomorrowEighteen)

			const objectAfterTomorrowSix = res.data.list.find((obj) =>obj['dt_txt'] ===`${now.getFullYear()}-${lz(now.getMonth() + 1)}-${lz(now.getDate() + 2)} 06:00:00`)
			const objectAfterTomorrowTwelve = res.data.list.find((obj) =>obj['dt_txt'] ===`${now.getFullYear()}-${lz(now.getMonth() + 1)}-${lz(now.getDate() + 2)} 12:00:00`)
			const objectAfterTomorrowEighteen = res.data.list.find((obj) =>obj['dt_txt'] ===`${now.getFullYear()}-${lz(now.getMonth() + 1)}-${lz(now.getDate() + 2)} 18:00:00`)

			const stateAfterTomorrowSix = Object.assign({},...objectAfterTomorrowSix.weather)
			temperatureAfterTomorrowSix.textContent = `${Math.floor(objectAfterTomorrowSix.main.temp)}°C`
			checkIconWeater(stateAfterTomorrowSix, photoAfterTomorrowSix, 17)
			checkPrecipitition2(objectAfterTomorrowSix.pop,precipititionAfterTomorrowSix)

			const stateAfterTomorrowTwelve = Object.assign({},...objectAfterTomorrowTwelve.weather)
			temperatureAfterTomorrowTwelve.textContent = `${Math.floor(objectAfterTomorrowTwelve.main.temp)}°C`
			checkIconWeater(stateAfterTomorrowTwelve, photoAfterTomorrowTwelve, 17)
			checkPrecipitition2(objectAfterTomorrowTwelve.pop,precipititionAfterTomorrowTwelve)

			const stateAfterTomorrowEighteen = Object.assign({},...objectAfterTomorrowEighteen.weather)
			temperatureAfterTomorrowEighteen.textContent = `${Math.floor(objectAfterTomorrowEighteen.main.temp)}°C`
			checkIconWeater(stateAfterTomorrowEighteen,photoAfterTomorrowEighteen,17)
			checkPrecipitition2(objectAfterTomorrowEighteen.pop,precipititionAfterTomorrowEighteen)

			newData.textContent = `${lz(now.getDate() + 3)}-${lz(now.getMonth() + 1)}-${now.getFullYear()}`
			const objectDataSix = res.data.list.find((obj) =>obj['dt_txt'] ===`${now.getFullYear()}-${lz(now.getMonth() + 1)}-${lz(now.getDate() + 3)} 06:00:00`)
			const objectDataTwelve = res.data.list.find((obj) =>obj['dt_txt'] ===`${now.getFullYear()}-${lz(now.getMonth() + 1)}-${lz(now.getDate() + 3)} 12:00:00`)
			const objectDataEighteen = res.data.list.find((obj) =>obj['dt_txt'] ===`${now.getFullYear()}-${lz(now.getMonth() + 1)}-${lz(now.getDate() + 3)} 18:00:00`)

			const stateDataSix = Object.assign({}, ...objectDataSix.weather)
			temperatureDataSix.textContent = `${Math.floor(objectDataSix.main.temp)}°C`
			checkIconWeater(stateDataSix, photoDataSix, 17)
			checkPrecipitition2(objectDataSix.pop, precipititionDataSix)

			const stateDataTwelve = Object.assign({}, ...objectDataTwelve.weather)
			temperatureDataTwelve.textContent = `${Math.floor(objectDataTwelve.main.temp)}°C`
			checkIconWeater(stateDataTwelve, photoDataTwelve, 17)
			checkPrecipitition2(objectDataTwelve.pop, precipititionDataTwelve)

			const stateDataEighteen = Object.assign({}, ...objectDataEighteen.weather)
			temperatureDataEighteen.textContent = `${Math.floor(objectDataEighteen.main.temp)}°C`
			checkIconWeater(stateDataEighteen, photoDataEighteen, 17)
			checkPrecipitition2(objectDataEighteen.pop, precipititionDataEighteen)

			newTwoData.textContent = `${lz(now.getDate() + 4)}-${lz(now.getMonth() + 1)}-${now.getFullYear()}`
			const objectDataNextSix = res.data.list.find((obj) =>obj['dt_txt'] ===`${now.getFullYear()}-${lz(now.getMonth() + 1)}-${lz(now.getDate() + 4)} 06:00:00`)
			const objectDataNextTwelve = res.data.list.find((obj) =>obj['dt_txt'] ===`${now.getFullYear()}-${lz(now.getMonth() + 1)}-${lz(now.getDate() + 4)} 12:00:00`)
			const objectDataNextEighteen = res.data.list.find((obj) =>obj['dt_txt'] ===`${now.getFullYear()}-${lz(now.getMonth() + 1)}-${lz(now.getDate() + 4)} 18:00:00`)

			const stateDataNextSix = Object.assign({}, ...objectDataNextSix.weather)
			temperatureDataNextSix.textContent = `${Math.floor(objectDataNextSix.main.temp)}°C`
			checkIconWeater(stateDataNextSix, photoDataNextSix, 17)
			checkPrecipitition2(objectDataNextSix.pop, precipititionDataNextSix)

			const stateDataNextTwelve = Object.assign({},...objectDataNextTwelve.weather)
			temperatureDataNextTwelve.textContent = `${Math.floor(objectDataNextTwelve.main.temp)}°C`
			checkIconWeater(stateDataNextTwelve, photoDataNextTwelve, 17)
			checkPrecipitition2(objectDataNextTwelve.pop, precipititionDataNextTwelve)

			const stateDataNextEighteen = Object.assign({},...objectDataNextEighteen.weather)
			temperatureDataNextEighteen.textContent = `${Math.floor(objectDataNextEighteen.main.temp)}°C`
			checkIconWeater(stateDataNextEighteen, photoDataNextEighteen, 17)
			checkPrecipitition2(objectDataNextEighteen.pop,precipititionDataNextEighteen
			)
		})
		.catch(() => (warning.textContent = 'Źle wpisałeś!'))
}

const enterCheck = () => {
	if (event.keyCode === 13) {
		getWeather()
	}
}

getWeather()
btn.addEventListener('click', getWeather)
input.addEventListener('keyup', enterCheck)
