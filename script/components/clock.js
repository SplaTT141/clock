const dateElement = document.querySelector('.date');
const timeElement = document.querySelector('.time');
const hoursElement = document.querySelector('.hours');
const minutesElement = document.querySelector('.minutes');
const secondsElement = document.querySelector('.seconds');

const londonBtnDOM = document.querySelector('.london');
const newYorkBtnDOM = document.querySelector('.new-york');
const tokyoBtnDOM = document.querySelector('.tokyo');
const rioBtnDOM = document.querySelector('.rio');
const vilniusBtnDOM = document.querySelector('.vilnius');

const sliderDOM = document.querySelector('.slider');

let currentTimeZone = 'Europe/Vilnius';
let intervalId = null;
let isPomodoro = false;

function clock() {
    const now = new Date();

    const timeFormatter = new Intl.DateTimeFormat('lt-LT', {
        timeZone: currentTimeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const dateFormatter = new Intl.DateTimeFormat('lt-LT', {
        timeZone: currentTimeZone,
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    const timeParts = timeFormatter.formatToParts(now);
    const h = Number(timeParts.find(p => p.type === 'hour').value);
    const min = Number(timeParts.find(p => p.type === 'minute').value);
    const s = Number(timeParts.find(p => p.type === 'second').value);

    timeElement.textContent = timeFormatter.format(now);
    dateElement.textContent = dateFormatter.format(now);

    clockArrowsRotation(h, min, s);
}

function clockArrowsRotation(h, min, s) {
    hoursElement.style.transform =
        `rotate(${h * 30 + min * 0.5}deg)`;
    minutesElement.style.transform =
        `rotate(${min * 6}deg)`;
    secondsElement.style.transform =
        `rotate(${s * 6}deg)`;
}

function startClock() {
    clearInterval(intervalId);
    clock();
    intervalId = setInterval(clock, 1000);
}

function setCity(timeZone) {
    currentTimeZone = timeZone;
    startClock();
}

vilniusBtnDOM.addEventListener('click', () => setCity('Europe/Vilnius'));
londonBtnDOM.addEventListener('click', () => setCity('Europe/London'));
newYorkBtnDOM.addEventListener('click', () => setCity('America/New_York'));
tokyoBtnDOM.addEventListener('click', () => setCity('Asia/Tokyo'));
rioBtnDOM.addEventListener('click', () => setCity('America/Sao_Paulo'));

sliderDOM.addEventListener('click', () => {
    isPomodoro = !isPomodoro;
    sliderDOM.classList.toggle('on');
    updatePomodoro();
});

function updatePomodoro() {
    timeElement.classList.remove('work', 'chill');

    if (isPomodoro) {
        timeElement.classList.add('work');
    }
}

startClock();
