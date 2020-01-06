import React from 'react';

import styles from './styles';
import { colors } from '../../utils/variables';

export default function FormButton({
  isMobile,
  type,
  pageTitles,
  currentStatus,
  currentPage,
  setCurrentPage,
  loading,
}) {
  const { totalPercentage, stepsPercentage } = currentStatus;

  const getPercentage = () => {
    if (isMobile) return totalPercentage;
    return stepsPercentage[currentPage];
  };

  const isDisabled = () => {
    const isLoading = loading;
    const mobileIncomplete = isMobile && totalPercentage < 100;
    const currentStepIncomplete = stepsPercentage[currentPage] < 100;

    if (isLoading || mobileIncomplete || currentStepIncomplete) return true;

    return false;
  };

  const setNextPage = () => {
    const pages = Object.keys(pageTitles);
    const currentIndex = pages.indexOf(currentPage);

    setCurrentPage(pages[currentIndex + 1]);
  };

  const getTitle = () => {
    if (type === 'edit') return 'Atualizar Comunidade';

    return currentPage === 'ReviewAndSave' ? 'Criar Comunidade' : 'Continuar';
  };

  const renderButton = () => {
    if (currentPage !== 'ReviewAndSave')
      return (
        <button
          disabled={isDisabled()}
          className="button is-primary is-fullwidth is-large"
          type="button"
          style={{
            background: `linear-gradient(to right, ${
              colors.primary
            } ${getPercentage()}%, ${colors.heliotrope} 0%)`,
          }}
          onClick={() => setNextPage()}
        >
          {getTitle()}
        </button>
      );
    return (
      <>
        <button
          disabled={loading}
          className="button is-primary is-fullwidth is-large"
          type="submit"
        >
          {loading ? (
            <span>
              <i className="fa fa-spinner fa-spin"></i> Continuar
            </span>
          ) : (
            getTitle()
          )}
        </button>
        <button
          disabled={loading}
          className="button is-primary is-fullwidth is-large"
          type="button"
          onClick={() => setCurrentPage(Object.keys(pageTitles)[0])}
        >
          Voltar
        </button>
        <style jsx>{styles}</style>
      </>
    );
  };

  return renderButton();
}
