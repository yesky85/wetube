import getBlobDuration from 'get-blob-duration';

const videoContainer = document.getElementById('jsVideoPlayer');
const videoPlayer = document.querySelector('#jsVideoPlayer video');
const playBtn = document.getElementById('jsPlayButton');
const volumeBtn = document.getElementById('jsVolumeButton');
const fullScreenBtn = document.getElementById('jsFullScreen');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');
const volumeRange = document.getElementById('jsVolume');

const views = document.getElementById('jsvideoViews');

const registerView = () => {
  const videoId = window.location.href.split('/videos/')[1];
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if (this.responseText === 1)
        views.innerHTML = `${this.responseText} view`;
      else views.innerHTML = `${this.responseText} views`;
    }
  };
  xhttp.open('POST', `/api/${videoId}/view`, true);
  xhttp.send();
};

// const registerView = () => {
//   const videoId = window.location.href.split('/videos/')[1];
//   fetch(`/api/${videoId}/view`, {
//     method: 'POST',
//   });
// };

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    volumeRange.value = videoPlayer.volume;
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    volumeRange.value = 0;
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function handleResizeScreenClick() {
  document.exitFullscreen();
  fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScreenBtn.addEventListener('click', handleFullScreenClick);
  fullScreenBtn.removeEventListener('click', handleResizeScreenClick);
}

function handleFullScreenClick() {
  videoContainer.requestFullscreen();
  fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenBtn.removeEventListener('click', handleFullScreenClick);
  fullScreenBtn.addEventListener('click', handleResizeScreenClick);
}

const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function setCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

async function setTotalTIme() {
  const blobUrl = `${videoPlayer.src}`;
  const duration = await getBlobDuration(blobUrl);
  const totalTimeString = formatDate(duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(setCurrentTime, 1000);
}

function handleEnded() {
  registerView();
  videoPlayer.currentTIme = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleVolumeRange(event) {
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;
  if (value >= 0.8) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.4) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else if (value >= 0.1) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
  videoPlayer.muted = false;
}

function init() {
  videoPlayer.volume = 0.5;
  playBtn.addEventListener('click', handlePlayClick);
  volumeBtn.addEventListener('click', handleVolumeClick);
  fullScreenBtn.addEventListener('click', handleFullScreenClick);
  videoPlayer.addEventListener('loadedmetadata', setTotalTIme);
  videoPlayer.addEventListener('ended', handleEnded);
  videoPlayer.addEventListener('click', handlePlayClick);
  volumeRange.addEventListener('input', handleVolumeRange);
}

if (videoContainer) {
  init();
}
