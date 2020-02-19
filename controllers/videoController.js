import { videos } from '../db';
import routes from '../routes';

export const home = (req, res) => {
  res.render('home', { pageTitle: 'Home', videos });
};

export const search = (req, res) => {
  // const searchingBy = req.query.term;
  // res.render('search', { pagaTitle: 'Search', searchingBy: searchingBy });
  const {
    query: { term: searchingBy },
  } = req;
  res.render('search', { pagaTitle: 'Search', searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render('upload', { pagaTitle: 'Upload' });

export const postUpload = (req, res) => {
  const {
    body: { file, title, description },
  } = req;
  // To Do: Upload and Save Video
  res.redirect(routes.videoDetail(324393));
};

export const videoDetail = (req, res) =>
  res.render('videoDetail', { pagaTitle: 'Video Detail' });

export const editVideo = (req, res) =>
  res.render('editVideo', { pagaTitle: 'Edit Video' });

export const deleteVideo = (req, res) =>
  res.render('deleteVideo', { pagaTitle: 'Delete Video' });
