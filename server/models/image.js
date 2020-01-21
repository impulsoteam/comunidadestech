import mongoose from 'mongoose';
import aws from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const imageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
    },
    url: String,
    size: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

imageSchema.pre('save', function() {
  if (!this.url) this.url = `${process.env.APP_URL}/files/${this.key}`;
});
imageSchema.pre('remove', function() {
  const dev = process.env.NODE_ENV !== 'production';

  if (dev) {
    return promisify(fs.unlink)(
      path.resolve(__dirname, '..', '..', 'temp', 'uploads', this.key)
    );
  } else {
    const s3 = new aws.S3();
    return s3
      .deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: this.key,
      })
      .promise();
  }
});
export default mongoose.model('Image', imageSchema);
