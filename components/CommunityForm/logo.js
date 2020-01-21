import React, { useState } from 'react';

import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';
import 'react-image-crop/dist/ReactCrop.css';

export default function Logo({ setFieldValue, logo }) {
  const [src, setSrc] = useState('');
  const [imageRef, setImageRef] = useState('');
  const [crop, setCrop] = useState({ aspect: 1 });
  const [croppedImage, setCroppedImage] = useState('');
  const [fileUrl, setFleUrl] = useState();

  const onSelectFile = (files) => {
    if (!!files[0]) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result));
      reader.readAsDataURL(files[0]);
    }
  };
  const onCropChange = (crop) => setCrop(crop);

  const onImageLoaded = (ref) => setImageRef(ref);

  const onCropComplete = (crop) => makeClientCrop(crop);

  const makeClientCrop = async (crop) => {
    if (!!imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageRef,
        crop,
        'newFile.jpeg'
      );
      setFieldValue('logo', croppedImageUrl);
      setCroppedImage(croppedImageUrl);
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) return;
        blob.name = fileName;
        window.URL.revokeObjectURL(fileUrl);
        const newFileUrl = window.URL.createObjectURL(blob);
        setFleUrl(newFileUrl);
        resolve(newFileUrl);
      }, 'image/jpeg');
    });
  };

  const renderDragMessage = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return <>Arraste arquivos aqui...</>;
    }

    if (isDragReject) {
      return <p type="error">Arquivo não suportado</p>;
    }

    return <p type="success">Solte os arquivos aqui</p>;
  };

  return (
    <div>
      <div>
        <img alt="Crop" style={{ maxWidth: '100%' }} src={logo} />
      </div>
      {src && (
        <ReactCrop
          src={src}
          crop={crop}
          ruleOfThirds
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={onCropChange}
        />
      )}
      {/* {!!croppedImage && (
        <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImage} />
      )} */}
      <Dropzone accept="image/*" onDropAccepted={onSelectFile}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <div
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            <input {...getInputProps()} />
            {renderDragMessage(isDragActive, isDragReject)}
          </div>
        )}
      </Dropzone>
    </div>
  );
}
