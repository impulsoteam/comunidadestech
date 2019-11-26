import mongoose from 'mongoose';

export const connect = async () => {
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
};

export const errorMessages = {
  withoutName: 'Community validation failed: name: Path `name` is required.',
  withoutCountry:
    'Community validation failed: location.country: Path `location.country` is required.',
  withoutCityAndState:
    'Community validation failed: location.city: Path `location.city` is required., location.state: Path `location.state` is required.',
};
