import React, { useState } from 'react';

import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';
import 'react-image-crop/dist/ReactCrop.css';

export default function Logo({ setFieldValue, currentLogo }) {
  const [src, setSrc] = useState('');
  const [imageRef, setImageRef] = useState('');
  const [crop, setCrop] = useState({ aspect: 1 });
  const [fileUrl, setFileUrl] = useState();

  const onSelectFile = (files) => {
    if (!!files[0]) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result));
      reader.readAsDataURL(files[0]);
    }
  };
  const onCropChange = (crop) => setCrop(crop);

  const onImageLoaded = (ref) => setImageRef(ref);

  const onCropComplete = () => makeClientCrop(crop);

  const makeClientCrop = async (crop) => {
    if (!!imageRef && crop.width && crop.height)
      await getCroppedImg(imageRef, crop, 'customLogo');
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

    canvas.toBlob((blob) => {
      if (!blob) return;
      blob.name = fileName;
      window.URL.revokeObjectURL(fileUrl);
      const newFileUrl = window.URL.createObjectURL(blob);
      setFieldValue('logo', blob);
      setFileUrl(newFileUrl);
      setSrc('');
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
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <img
          alt="Crop"
          style={{ width: '120px', height: '120px' }}
          src={fileUrl || currentLogo}
        />
      </div>
      {src && (
        <>
          <div class="modal" style={{ display: 'block' }}>
            <div className="modal-background"></div>
            <div className="modal-content">
              <ReactCrop
                src={src}
                crop={crop}
                ruleOfThirds
                onImageLoaded={onImageLoaded}
                onChange={onCropChange}
                className="modal"
              />
              <button type="button" onClick={() => onCropComplete()}>
                escolher imagem
              </button>
              <button type="sair" onClick={() => setSrc('')}>
                cancelar
              </button>
            </div>
            <button
              className="modal-close is-large"
              aria-label="close"
            ></button>
          </div>
          {/* <ReactCrop
            src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={onImageLoaded}
            onChange={onCropChange}
            className="modal"
          />
          <button type="button" onClick={() => onCropComplete()}>
            escolher imagem
          </button>
          <button type="sair" onClick={() => setSrc('')}>
            cancelar
          </button> */}
        </>
      )}
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
