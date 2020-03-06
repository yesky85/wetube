const recordContainer = document.getElementById('jsRecordContainer');
const recordBtn = document.getElementById('jsRecordButton');
const videoPreview = document.getElementById('jsVideoPreview');

const handleRecordClick = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
  } catch (error) {
    recordBtn.innerHTML = '😠 Cant record';
    recordBtn.removeEventListener('click', handleRecordClick);
  }
};

function init() {
  recordBtn.addEventListener('click', handleRecordClick);
}

if (recordContainer) {
  init();
}
