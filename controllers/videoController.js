export const home = (req, res) => res.render('home', { pageTitle: 'Home' });
export const search = (req, res) =>
  res.render('search', { pagaTitle: 'Search' });
export const upload = (req, res) =>
  res.render('upload', { pagaTitle: 'Upload' });
export const videoDetail = (req, res) =>
  res.render('videoDetail', { pagaTitle: 'Video Detail' });
export const editVideo = (req, res) =>
  res.render('editVideo', { pagaTitle: 'Edit Video' });
export const deleteVideo = (req, res) =>
  res.render('deleteVideo', { pagaTitle: 'Delete Video' });
