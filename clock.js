const today = document.querySelector('.today')
const time = document.querySelector('.time')

function lz(i) {
	return `${i}`.padStart(2, '0')
}

function showTextTime() {
	const now = new Date()
	const days = [
		'Niedziela',
		'Poniedziałek',
		'Wtorek',
		'Środa',
		'Czwartek',
		'Piątek',
		'Sobota',
	]

	const textDate = `${days[now.getDay()]}`
	const textTime = `${lz(now.getHours())}:${lz(now.getMinutes())}:${lz(
		now.getSeconds()
	)}`

	today.textContent = textDate
	time.textContent = textTime

	window.requestAnimationFrame(showTextTime)
}
window.requestAnimationFrame(showTextTime)