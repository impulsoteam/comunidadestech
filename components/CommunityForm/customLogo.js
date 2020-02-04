import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import ReactCrop from 'react-image-crop'

import 'react-image-crop/lib/ReactCrop.scss'
import PropTypes from 'prop-types'

import styles from './styles'

function CustomLogo ({ setFieldValue, currentLogo }) {
  const [src, setSrc] = useState('')
  const [crop, setCrop] = useState({})
  const [fileUrl, setFileUrl] = useState()
  const [imageRef, setImageRef] = useState('')
  const [imageError, setImageError] = useState(false)

  const onSelectFile = (files) => {
    if (files[0]) {
      const reader = new FileReader()
      reader.addEventListener('load', () => setSrc(reader.result))
      reader.readAsDataURL(files[0])
    }
  }

  const onImageLoaded = (ref) => {
    const width = ref.width > ref.height ? ref.height : ref.width
    const height = ref.height > ref.width ? ref.width : ref.height
    const scaleX = ref.width - width
    const scaleY = ref.height - height
    const x = scaleX === 0 ? 0 : scaleX / 2
    const y = scaleY === 0 ? 0 : scaleY / 2

    setImageRef(ref)

    setCrop({
      unit: 'px',
      aspect: 1,
      width,
      height,
      x,
      y
    })

    return false
  }

  const onError = () => {
    setImageError(
      'Algo está errado com a url do seu logo, tente fazer o upload novamente'
    )
  }

  const makeClientCrop = async () => {
    if (!!imageRef && crop.width && crop.height) { await getCroppedImg(imageRef, crop, 'customLogo') }
  }

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

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
    )

    canvas.toBlob((blob) => {
      if (!blob) return

      window.URL.revokeObjectURL(fileUrl)
      const newFileUrl = window.URL.createObjectURL(blob)
      blob.name = fileName
      blob.tempUrl = newFileUrl
      setImageError('')
      setFieldValue('logo', blob)
      setFileUrl(newFileUrl)
      setSrc('')
    })
  }

  const renderDragMessage = (isDragActive, isDragReject) => {
    switch (true) {
      case !!fileUrl:
        return <div>Imagem selecionada</div>
      case isDragReject:
        return <div>Arquivo não suportado</div>
      case isDragActive:
        return <div>Solte a imagem aqui</div>
      default:
        return <div>Clique ou arraste a imagem aqui</div>
    }
  }

  const renderImage = () => {
    const image = fileUrl || currentLogo

    if (!!image && !imageError) {
      return (
        <div className="image-wrapper">
          <img alt="Logo da Comunidade" src={image} onError={onError} />
          <style jsx>{styles}</style>
        </div>
      )
    }
  }

  const renderCropModal = () => {
    if (src) {
      return (
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
                onImageLoaded={(ref) => onImageLoaded(ref)}
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
          <style jsx>{styles}</style>
        </div>
      )
    }
  }

  return (
    <div className="custom-logo-wrapper">
      {renderImage()}
      {renderCropModal()}

      {!!imageError && <div className="image-error">{imageError}</div>}

      <Dropzone accept="image/*" onDropAccepted={onSelectFile}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <div className="drag-button" {...getRootProps()}>
            <input {...getInputProps()} />
            {renderDragMessage(isDragActive, isDragReject)}
          </div>
        )}
      </Dropzone>

      <style jsx>{styles}</style>
    </div>
  )
}

CustomLogo.propTypes = {
  setFieldValue: PropTypes.func,
  currentLogo: PropTypes.string
}

export default CustomLogo
