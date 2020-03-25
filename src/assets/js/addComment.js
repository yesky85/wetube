import axios from 'axios';

const addCommentForm = document.getElementById('jsAddComment');
const commentList = document.getElementById('jsCommentList');
const commentNumber = document.getElementById('jsCommentNumber');
const deleteButton = document.getElementsByClassName('jsDeleteButton');

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const handleDeleteClick = event => {
  const deleteComment = event.target.parentNode;
  const comment = deleteComment.children[0].innerText;
  sendComment(comment, 0);

  commentList.removeChild(deleteComment);

  decreaseNumber();
};

const addComment = comment => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const deleteBtn = document.createElement('span');

  deleteBtn.innerHTML = ' ❎';
  deleteBtn.addEventListener('click', handleDeleteClick);

  span.innerHTML = comment;
  li.appendChild(span);
  li.appendChild(deleteBtn);
  commentList.prepend(li);

  increaseNumber();
};

const sendComment = async (comment, state) => {
  const videoId = window.location.href.split('/videos/')[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: 'POST',
    data: {
      comment,
      state,
    },
  });
  if (response.status === 200 && state) {
    addComment(comment);
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector('input');
  const comment = commentInput.value;
  sendComment(comment, 1);
  commentInput.value = '';
};

function init() {
  addCommentForm.addEventListener('submit', handleSubmit);
  if (deleteButton) {
    let cnt = 0;
    let x = 0;
    for (x in deleteButton) {
      deleteButton[cnt].addEventListener('click', handleDeleteClick);
      console.log(cnt);
      cnt = cnt + 1;
    }
  }
}

if (addCommentForm) {
  init();
}
