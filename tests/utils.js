import mongoose from 'mongoose';

export const connect = async () => {
  return mongoose.connect('mongodb://localhost/ctechTest', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
};
