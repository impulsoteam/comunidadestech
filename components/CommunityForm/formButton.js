import React from 'react';
import { css, jsx } from '@emotion/core';
/** @jsx jsx */
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
    if (type === 'edit') return;
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
          type={type === 'edit' ? 'submit' : 'button'}
          style={{
            backgroundColor: colors.heliotrope,
            padding: 0,
            height: '40px',
          }}
          css={css`
            &:before {
              align-items: center;
              content: "${getTitle()}";
              display: flex;
              height: 40px;
              position: absolute;
              z-index: 1;
            }
            &:after {
              background: ${colors.primary};
              border-radius: 4px;
              content: '';
              height: 40px;
              left: 0;
              position: absolute;
              transition: all 0.5s;
              width: ${getPercentage()}%;
            }
          `}
          onClick={() => setNextPage()}
        >
          {getTitle()}
          <style jsx>{styles}</style>
        </button>
      );
    return (
      <div className="wrapper">
        <div className="container" style={{ maxWidth: '936px' }}>
          <div className="columns">
            <div className="column is-12-mobile is-8-tablet is-6-desktop is-offset-3-desktop is-offset-2-tablet columns">
              <div className="column is-5">
                <button
                  disabled={loading}
                  className="button is-primary is-large is-fullwidth is-outlined"
                  type="button"
                  onClick={() => setCurrentPage(Object.keys(pageTitles)[0])}
                >
                  Voltar
                </button>
              </div>
              <div className="column is-7">
                <button
                  disabled={loading}
                  className="button is-primary is-large is-fullwidth"
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
              </div>
            </div>
            <style jsx>{styles}</style>
          </div>
        </div>
      </div>
    );
  };

  return renderButton();
}
