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

const months = [
    'Sausio', 'Vasario', 'Kovo', 'Balandzio', 'Geguzes', 'Birzelio',
    'Liepos', 'Rugpjucio', 'Rugsejo', 'Spalio', 'Lapkricio', 'Gruodzio'
];

const weekdays = [
    'Sekmadienis', 'Pirmadienis', 'Antradienis',
    'Treciadienis', 'Ketvirtadienis', 'Penktadienis', 'Sestadienis'
];

let cityOffset = 0;
let intervalId = null;

function clock() {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const localTime = new Date(utc + cityOffset * 3600000);

    const h = localTime.getHours();
    const min = localTime.getMinutes();
    const s = localTime.getSeconds();

    timeElement.textContent =
        `${addZero(h)}:${addZero(min)}:${addZero(s)}`;

    dateElement.textContent =
        `${weekdays[localTime.getDay()]}, ${months[localTime.getMonth()]} ${localTime.getDate()} d.`;

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

function addZero(n) {
    return n < 10 ? '0' + n : n;
}

function setCity(offset) {
    cityOffset = offset;
    startClock();
}

vilniusBtnDOM.addEventListener('click', () => setCity(0));
londonBtnDOM.addEventListener('click', () => setCity(-1));
newYorkBtnDOM.addEventListener('click', () => setCity(-6));
tokyoBtnDOM.addEventListener('click', () => setCity(8));
rioBtnDOM.addEventListener('click', () => setCity(-5));

let isPomodoro = false;

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
