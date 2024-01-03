const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

//Selecting the actual audio element
const currentSong = document.querySelector('audio');

//Index of current song
let songIndex = 0;

//Status of current audio element
let isPlaying = false;

//Classes and Titles for Player Btns
let playingBtnsClasses = ['fa-play', 'fa-pause'];
let playBtnTitles = ['Play', 'Pause'];

function restoreDefaults() {
    isPlaying = false;
    playingBtnsClasses = ['fa-play', 'fa-pause'];
    playBtnTitles = ['Play', 'Pause'];
};

//Music Metadata
const songDetailsArray = [
    {name: 'j1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design'},
    {name: 'j2',
    displayName: 'Seven Nation Army',
    artist: 'Jacinto Design'},
    {name: 'j3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design'},
    {name: 'm1',
    displayName: 'Metric Row (Remix)',
    artist: 'Jacinto/Metric Design'},
];

//Play, Pause Audio Functions
function playSong() {
    isPlaying = true;
    currentSong.play();
};

function pauseSong() {
    isPlaying = false;
    currentSong.pause();
};

function playPauseSong() {
    isPlaying? pauseSong() : playSong();
};

function toggleBtnClass() {
    playBtn.classList.replace(playingBtnsClasses[0], playingBtnsClasses[1]);
    playingBtnsClasses.reverse();
};

function toggleBtnTitle() {
    playBtnTitles.reverse();
    playBtn.setAttribute('title', playBtnTitles[0]); 
}

function loadSong(song) {
    const {displayName, artist: songArtist, name} = song;
    title.textContent = displayName;
    artist.textContent = songArtist;

    if (isPlaying) {
        pauseSong();
    };

    currentSong.addEventListener('canplay', () => {
        // If the player was playing, start the new song
        if (isPlaying) {
            playSong();
        }
    });

    currentSong.src = `music/${name}.mp3`;
    image.src = `img/${name}.jpg`;
};

//Next Song
function loadNextSong() {
    songIndex++;
    if (songIndex == songDetailsArray.length) {
        songIndex = 0;
    };
    loadSong(songDetailsArray[songIndex]);
};

//Previous Song
function loadPrevSong() {
    songIndex--;
    if (songIndex == -1) {
        songIndex = songDetailsArray.length-1;
    };
    loadSong(songDetailsArray[songIndex]);
};

//Formats the given total seconds into a string representation in MM:SS format
function formatTimeFromSeconds(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const formattedMinutes = (minutes < 10) ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = (seconds < 10) ? `0${seconds}` : `${seconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
};

//Update Progress Bar and Time
function updateProgressBar(e) {
    if (isPlaying) {
        const {duration, currentTime} = e.srcElement;
        const progressPercent = currentTime*100/duration;
        progress.style.width = progressPercent+"%";
        if (duration && currentTime) {
            durationEl.textContent = formatTimeFromSeconds(duration);
            currentTimeEl.textContent = formatTimeFromSeconds(currentTime);
        };
    }
};

function changeCurrentTime(e) {
    let progressBarWidth = this.clientWidth;
    let clickAdress = e.offsetX;
    const {duration} = currentSong;
    currentSong.currentTime = clickAdress/progressBarWidth * duration;
};

loadSong(songDetailsArray[songIndex]);

//Play pause event listener
playBtn.addEventListener('click', ()=> {
    playPauseSong();
    toggleBtnClass(isPlaying);
    toggleBtnTitle(isPlaying);
});

//Previous and next song event listeners
prevBtn.addEventListener('click', () => {
     restoreDefaults();
     loadPrevSong();
     playPauseSong();
     toggleBtnClass(isPlaying);
     toggleBtnTitle(isPlaying);
});

nextBtn.addEventListener('click', () => {
    restoreDefaults();
    loadNextSong();
    playPauseSong();
    toggleBtnClass(isPlaying);
    toggleBtnTitle(isPlaying);
});

progressContainer.addEventListener('click', changeCurrentTime);
currentSong.addEventListener('timeupdate', updateProgressBar);
currentSong.addEventListener('ended', ()=> {
    restoreDefaults();
    loadNextSong();
    playPauseSong();
    toggleBtnClass(isPlaying);
    toggleBtnTitle(isPlaying);
});





