import React, { useState } from 'react';

import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';

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
    <div style={{ margin: '10px 0' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <img
          alt="Crop"
          style={{ width: '120px', height: '120px' }}
          src={fileUrl || currentLogo}
        />
      </div>
      {src && (
        <div
          class="modal"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div className="modal-background" />
          <div
            className="modal-content"
            style={{
              background: 'white',
              borderRadius: '5px',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px ',
            }}
          >
            <div
              style={{
                height: '48px',
                background: '#8C43FF',
                display: 'flex',
                alignItems: 'center',
                padding: '0px 20px',
              }}
            >
              <p>Editar imagem</p>
              <button
                type="button"
                onClick={() => setSrc('')}
                className="modal-close is-large"
                aria-label="close"
              ></button>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ReactCrop
                src={src}
                crop={crop}
                ruleOfThirds
                onImageLoaded={(ref) => setImageRef(ref)}
                onChange={(crop) => setCrop(crop)}
              />
            </div>
            <div
              style={{
                height: '68px',
                display: 'flex',
                padding: '0px 20px',
                justifyContent: 'end',
                alignItems: 'center',
              }}
            >
              <button
                type="button"
                style={{
                  borderRadius: '5px',
                  border: '1px solid #8C43FF',
                  height: '70%',
                  background: 'white',
                  fontWeight: 'bold',
                  fontSize: '16px ',
                  color: '#8C43FF',
                }}
                onClick={() => setSrc('')}
              >
                Cancelar
              </button>
              <button
                type="button"
                style={{
                  borderRadius: '5px',
                  marginLeft: '8px',
                  border: '1px solid #8C43FF',
                  height: '70%',
                  background: '#8C43FF',
                  fontWeight: 'bold',
                  fontSize: '16px ',
                  color: 'white',
                }}
                onClick={() => makeClientCrop()}
              >
                Escolher imagem
              </button>
            </div>
          </div>
        </div>
      )}
      <Dropzone accept="image/*" onDropAccepted={onSelectFile}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <div
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
    </div>
  );
}
