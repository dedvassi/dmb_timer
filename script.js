const timerContainer = document.querySelector(".timer-container");
const timerTemplate = document.querySelector("#timer-template");

timerContainer.appendChild(timerTemplate.content);

const timer = document.querySelector(".timer");
const progress = document.querySelector(".progress__bar");
const progressCount = document.querySelector(".progress__count");
const daysBlock = document.querySelector("#days");
const beforeStyle = window.getComputedStyle(daysBlock, '::before');
const hoursBlock = document.querySelector("#hours");
const minutesBlock = document.querySelector("#minutes");
const secondsBlock = document.querySelector("#seconds");

const endDay = new Date(2025, 6, 31, 14, 30);
const startDay = new Date(2025, 5, 30, 11, 30);

function getDifference(start, end) {
	const diffInMillesecond = end - start;
	const seconds = Math.floor(diffInMillesecond / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24)

	const newHours =  hours - 24 * days;
	const newMinutes = minutes - 60 * 24 * days - 60 * newHours
	const newSeconds = seconds - newMinutes * 60 - newHours * 3600 - days * 24 * 3600

	return { 
		days, 
		hours: newHours  < 10 ? `0${newHours}` : newHours, 
		minutes: newMinutes < 10 ? `0${newMinutes}` : newMinutes, 
		seconds: newSeconds  < 10 ? `0${newSeconds}` : newSeconds
	};
}

function getPercentes(start, end, current) {
	const diff = end - start;
	const progress = current - start;
	
	return (progress * 100 / diff).toFixed(2);
}

setInterval(() => {
	const currentDay = new Date();
	const percentes = getPercentes(startDay, endDay, currentDay);
	const { days, hours, minutes, seconds } = getDifference(currentDay, endDay);

	daysBlock.textContent = days;
	
	
	hoursBlock.textContent = hours;
	minutesBlock.textContent = minutes;
	secondsBlock.textContent = seconds;
	
	progress.style.width = `${percentes}%`;
	progressCount.textContent = `${percentes}%`;
}, 1000); 