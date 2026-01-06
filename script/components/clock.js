const dateEl = document.querySelector('.date');
const timeEl = document.querySelector('.time');
const hoursEl = document.querySelector('.hours');
const minutesEl = document.querySelector('.minutes');
const secondsEl = document.querySelector('.seconds');

const londonBtn = document.querySelector('.london');
const newYorkBtn = document.querySelector('.new-york');
const tokyoBtn = document.querySelector('.tokyo');
const rioBtn = document.querySelector('.rio');
const vilniusBtn = document.querySelector('.vilnius');
const sliderEl = document.querySelector('.slider');
const pomodoroTimeEl = document.querySelector('.pomodoro-time');
const pomodoroTimerEl = document.querySelector('.pomodoro-timer');
const pomodoroRepeatBtn = document.querySelector('.repeat');

const months = [
    'Sausio', 'Vasario', 'Kovo', 'Balandžio', 'Gegužės', 'Birželio',
    'Liepos', 'Rugpjūčio', 'Rugsėjo', 'Spalio', 'Lapkričio', 'Gruodžio'
];

const days = [
    'Sekmadienis', 'Pirmadienis', 'Antradienis',
    'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis'
];

let offset = 2;

function updateClock() {
    const now = new Date();
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    const cityTime = new Date(utcTime + offset * 60 * 60 * 1000);

    let h = cityTime.getHours();
    let m = cityTime.getMinutes();
    let s = cityTime.getSeconds();

    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;

    timeEl.textContent = h + ':' + m + ':' + s;

    dateEl.textContent =
        days[cityTime.getDay()] + ', ' +
        months[cityTime.getMonth()] + ' ' +
        cityTime.getDate() + ' d.';

    hoursEl.style.transform = 'rotate(' + (cityTime.getHours() * 30) + 'deg)';
    minutesEl.style.transform = 'rotate(' + (cityTime.getMinutes() * 6) + 'deg)';
    secondsEl.style.transform = 'rotate(' + (cityTime.getSeconds() * 6) + 'deg)';
}

//Other cities

let timer;

function start() {
    clearInterval(timer);
    updateClock();
    timer = setInterval(updateClock, 1000);
}

vilniusBtn.addEventListener('click', () => {
    offset = 2;
    start();
});

londonBtn.addEventListener('click', () => {
    offset = 0;
    start();
});

newYorkBtn.addEventListener('click', () => {
    offset = -5;
    start();
});

tokyoBtn.addEventListener('click', () => {
    offset = 9;
    start();
});

rioBtn.addEventListener('click', () => {
    offset = -3;
    start();
});

// POMODORO

let workSeconds = 25 * 60;

sliderEl.addEventListener('click', () => {
    sliderEl.classList.toggle('on');
    timeEl.classList.toggle('work');

    if (timeEl.classList.contains('work')) {
        pomodoroTimer();
        pomodoroInterval = setInterval(pomodoroTimer, 1000);
        pomodoroTimeEl.classList.remove('off');
        pomodoroTimerEl.classList.add('work');
    }
});

function pomodoroTimer() {
    let minutes = Math.floor(workSeconds / 60);
    let seconds = workSeconds % 60;

    pomodoroTimerEl.innerHTML = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    workSeconds--;

    if (!timeEl.classList.contains('work')) {
        clearInterval(pomodoroInterval);
        pomodoroTimeEl.classList.add('off');
    }

    if (workSeconds < 0) {
        sliderEl.classList.remove('on');
        timeEl.classList.remove('work');

        workSeconds = 25 * 60;
    }
}

pomodoroRepeatBtn.addEventListener('click', () => {
    workSeconds = 25 * 60;
})

start();
