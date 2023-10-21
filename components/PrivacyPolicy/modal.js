import React from 'react'

import PropTypes from 'prop-types'

import styles from '../GlobalComponents/Modal/styles'

const PrivacyModal = ({ handleConfirm, handleGoBack }) => <div className="modal">
  <div className="modal-content">
    <h2 className="title-modal">Seus dados serão excluídos</h2>
    <div className="modal-body">
      <p className="center">
        Tem certeza que deseja excluir todos os seus dados do comunidades.tech? Todas as comunidades que você cadastrou, gerencia e possui, bem como os seus dados serão excluídos permanentemente.
      </p>
      <div className="modal-buttons">
        <button title="Voltar" className="modal-btn" onClick={handleGoBack}>Cancelar</button>
        <button title="Confirmar" className="modal-btn" onClick={handleConfirm}>Excluir mesmo assim</button>
      </div>
    </div>
  </div>
  <style jsx>{styles}</style>
</div>

PrivacyModal.propTypes = {
  handleConfirm: PropTypes.func,
  handleGoBack: PropTypes.func
}

export default PrivacyModal
