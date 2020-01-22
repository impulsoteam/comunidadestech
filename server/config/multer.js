import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import path from 'path';
import crypto from 'crypto';
const { NODE_ENV, BUCKET_NAME } = process.env;
const isDev = NODE_ENV === 'development';

const storageTypes = {
  development: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'temp', 'uploads'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);
        file.key = `${hash.toString('hex')}.${file.mimetype.split('/')[1]}`;
        cb(null, file.key);
      });
    },
  }),
  production: multerS3({
    s3: new aws.S3(),
    bucket: BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);
        const fileName = `${hash.toString('hex')}.${
          file.mimetype.split('/')[1]
        }`;
        cb(null, fileName);
      });
    },
  }),
};

export default {
  dest: path.resolve(__dirname, '..', '..', 'temp', 'uploads'),
  storage: storageTypes[!isDev ? 'development' : 'production'],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/svg',
      'image/svg+xml',
    ];
    const isAllowed = allowedMimes.includes(file.mimetype);

    isAllowed ? cb(null, true) : cb(new Error('Invalid file type.'));
  },
};
