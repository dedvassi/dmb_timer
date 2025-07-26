const START_DATE_STR = '2025-06-30T12:00:00';
const START_DATE = new Date(START_DATE_STR);

const END_DATE_STR = '2025-07-31T12:00:00';
const END_DATE = new Date(END_DATE_STR);

const PHRASES = [
	'ПЛОХА!',
	'ВОЛЬНА',
	'Продолжаем наше занятие',
	'Начался отопительный сезон',
	'Напоминаю про технику безопасности',
	'Кто там щелкает',
	'Ты че тупой чтоли',
	'Латентный',
	'Под легкими наркотиками',
	'Соси родной',
	'Там сушилка не сушит. ХАХАХАХАХ, да похер',
	'То что',
	'Вы все трупы потому что дневальный спит',
	'Где этот еблан с супом',
	'Продолжается месячник чистоты',
	'Согласно расписаниЯ',
	'Смошенничать хотел, свои 40 тысяч захотел получить',
	'ЧТОБЫ ЧТО',
	'51 минута чего - 6:25))',
	'Пиздеж убили',
	'Долгоиграющая конфетка',
	'Пенсил на полшестого',
	'БРОМ',
	'Грязнулик',
	'Что на ужин? Рыбка!',
	'Почему череп пятый раз дневал подряд',
	'За углом кабак там бабы сосут',
	'Обращаю ваше внимание',
	'Миллиардер священник',
	'Чик-чик, вот такие вот дела',
	'Кучер вышел с территории части. Не прошло. Кучер вышел. А кто дежурный???',
	'дИвизьон подъем',
	'Ягода малина ЭЭЭЙ',
	'На ужин блядская рыба'

]
const marqueeContainer = document.querySelector(".marquee");
marqueeContainer.textContent = PHRASES.join('  |  ')

const progress = document.querySelector(".progress__bar");
const progressCount = document.querySelector(".progress__count");

function formatTime(value) {
	return String(value).padStart(2, '0');
}

function getFormattedTime(ms) {
	if (ms < 0) {
		return {days: 0, hours: 0, minutes: 0, seconds: 0, negative: true};
	}
	const days = Math.floor(ms / (1000 * 60 * 60 * 24));
	const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((ms % (1000 * 60)) / 1000);
	return {days, 
		hours, 
		minutes, 
		seconds, 
		negative: false
	};
}

function prevTimes(currentTimes) {
	let days = currentTimes.days - 1;
	let hours = currentTimes.hours - 1;
	let minutes = currentTimes.minutes -1;
	let seconds = currentTimes.seconds - 1;
	if (days < 0) {
		days = 0;
	}

	if (hours < 0) {
		hours = 23;
	}

	if (minutes < 0) {
		minutes = 59;
	}

	if (seconds < 0) {
		seconds = 59;
	} 
	return { 
		days, 
		hours, 
		minutes, 
		seconds
	};
}

function getPercentes(start, end, current) {
	const diff = end - start;
	const progress = current - start;
	
	return (progress * 100 / diff).toFixed(2);
}

function updateAllTimers() {
	const now = new Date().getTime();	
	const percentes = getPercentes(START_DATE.getTime(), END_DATE.getTime(), now);

	let distanceToDisplay = 0;
	let timerMessage = "";

	if (now < START_DATE.getTime()){
		distanceToDisplay = START_DATE.getTime() - now;
		timerMessage = "До начал:"; 
	}

	else if (now >= START_DATE.getTime() && now < END_DATE.getTime()){
		distanceToDisplay = END_DATE.getTime() - now;
		timerMessage = "До конца:"; 
	}
	else {
		distanceToDisplay = 0;
		timerMessage = "Пара-пара-пам! Всё!"; 
	}

	progress.style.width = `${percentes}%`;
	progressCount.textContent = `${percentes}%`;

	const currentTimes = getFormattedTime(distanceToDisplay);
	
	document.getElementById('prevDays').innerHTML = formatTime(prevTimes(currentTimes).days);
	document.getElementById('prevHours').innerHTML = formatTime(prevTimes(currentTimes).hours);
	document.getElementById('prevMinutes').innerHTML = formatTime(prevTimes(currentTimes).minutes);
	document.getElementById('prevSeconds').innerHTML = formatTime(prevTimes(currentTimes).seconds);
	
	if (distanceToDisplay <= 0) {
		document.getElementById('currentDays').innerHTML = "00";
		document.getElementById('currentHours').innerHTML = "00";
		document.getElementById('currentMinutes').innerHTML = "00";
		document.getElementById('currentSeconds').innerHTML = "00";
		
	} else {
		document.getElementById('currentDays').innerHTML = formatTime(currentTimes.days);
		document.getElementById('currentHours').innerHTML = formatTime(currentTimes.hours);
		document.getElementById('currentMinutes').innerHTML = formatTime(currentTimes.minutes);
		document.getElementById('currentSeconds').innerHTML = formatTime(currentTimes.seconds);		
	}

	document.getElementById('nextDays').innerHTML = formatTime(currentTimes.days + 1);
	document.getElementById('nextHours').innerHTML = formatTime(currentTimes.hours + 1);
	document.getElementById('nextMinutes').innerHTML = formatTime(currentTimes.minutes + 1);
	document.getElementById('nextSeconds').innerHTML = formatTime(currentTimes.seconds + 1);

	if (distanceToDisplay <= 0 && now >= END_DATE.getTime()) {
		clearInterval(timerInterval);
	}
}

const timerInterval = setInterval(updateAllTimers, 1000);
updateAllTimers();
