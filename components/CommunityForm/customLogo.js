import React, { useState } from 'react';

import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';
import styles from './styles';

export default function CustomLogo({ setFieldValue, currentLogo }) {
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

  const makeClientCrop = async () => {
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

      window.URL.revokeObjectURL(fileUrl);
      const newFileUrl = window.URL.createObjectURL(blob);
      blob.name = fileName;
      blob.tempUrl = newFileUrl;
      setFieldValue('logo', blob);
      setFileUrl(newFileUrl);
      setSrc('');
    });
  };

  const renderDragMessage = (isDragActive, isDragReject) => {
    if (!!fileUrl) return <>Imagem selecionada</>;
    if (isDragActive) return <>Solte a imagem aqui</>;
    if (isDragReject) return <>Arquivo não suportado</>;
    return <>Clique ou arraste a imagem aqui</>;
  };

  return (
    <div className="custom-logo-wrapper">
      <div className="image-wrapper">
        <img alt="Crop" src={fileUrl || currentLogo} />
      </div>
      {src && (
        <div className="modal">
          <div className="modal-background" />
          <div className="modal-content">
            <div className="modal-title">
              <p>Editar imagem</p>
              <button
                type="button"
                onClick={() => setSrc('')}
                className="modal-close is-large"
                aria-label="close"
              ></button>
            </div>
            <div className="crop-wrapper">
              <ReactCrop
                src={src}
                crop={crop}
                ruleOfThirds
                onImageLoaded={(ref) => setImageRef(ref)}
                onChange={(crop) => setCrop(crop)}
              />
            </div>
            <div className="crop-controls">
              <button type="button" onClick={() => setSrc('')}>
                Cancelar
              </button>
              <button type="button" onClick={() => makeClientCrop()}>
                Escolher imagem
              </button>
            </div>
          </div>
        </div>
      )}
      <Dropzone accept="image/*" onDropAccepted={onSelectFile}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <div
            className="drag-button"
            style={{
              width: '99%',
              margin: '15px 0',
              height: '50px',
              border: '1px solid #7A7A7A',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '16px',
              color: '#7A7A7A',
              fontWeight: 'bold',
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {renderDragMessage(isDragActive, isDragReject)}
          </div>
        )}
      </Dropzone>
      <style jsx>{styles}</style>
    </div>
  );
}
