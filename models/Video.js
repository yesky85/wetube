import mongoose from 'mongoose';
mongoose.set('useUnifiedTopology', true);

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: 'File URL is required',
  },
  title: {
    type: String,
    required: 'Tilte is required',
  },
  description: String,
  views: {
    type: Number,
    default: 0,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      Ref: 'Comment',
    },
  ],
});

const model = mongoose.model('Video', VideoSchema);

export default model;
