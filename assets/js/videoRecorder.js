const recordContainer = document.getElementById('jsRecordContainer');
const recordBtn = document.getElementById('jsRecordButton');
const videoPreview = document.getElementById('jsVideoPreview');

let streamObject;

const handleVideoData = event => {
  console.log(event);
};

const startRecording = () => {
  const videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener('dataavailable', handleVideoData);
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = 'Stop Recording';
    streamObject = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = '😠 Cant record';
  } finally {
    recordBtn.removeEventListener('click', getVideo);
  }
};

function init() {
  recordBtn.addEventListener('click', getVideo);
}

if (recordContainer) {
  init();
}
