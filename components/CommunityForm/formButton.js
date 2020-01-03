import React from 'react';

import styles from './styles';
import { colors } from '../../utils/variables';

export default function FormButton({
  errors,
  touched,
  values,
  pageTitles,
  currentPage,
  setCurrentPage,
  loading,
}) {
  const renderButton = () => {
    const getStepOne = () => {
      const { globalProgram: errorGlobalProgram = {} } = errors;
      const { globalProgram: touchedGlobalProgram = {} } = touched;
      const stepOne = {
        haveName: !errors.name && !!values.name ? 1 : 0,
        haveType: !errors.type && !!values.type ? 1 : 0,
        haveCategory: !errors.category && !!values.category ? 1 : 0,
        haveTags: !errors.tags && !!values.tags ? 1 : 0,
        haveLogo: !errors.logo && !!values.logo ? 1 : 0,
        haveDescription: !errors.description && !!values.description ? 1 : 0,
      };
      if (
        !errorGlobalProgram.name &&
        touchedGlobalProgram.name &&
        values.globalProgram.isParticipant
      ) {
        stepOne.haveGlobalProgram = 1;
      } else if (!values.globalProgram.isParticipant) {
        delete stepOne.haveGlobalProgram;
      } else {
        stepOne.haveGlobalProgram = 0;
      }
      return stepOne;
    };

    const getStepTwo = () => {
      const { city, state, country } = values.location;

      if (values.model === 'online') return { haveCountry: !!country ? 1 : 0 };

      return {
        haveCountry: !!country ? 1 : 0,
        haveState: !!state ? 1 : 0,
        haveCity: !!city ? 1 : 0,
      };
    };

    const getStepThree = () => {
      const stepThree = {
        haveMembers: !errors.members && !!values.members ? 1 : 0,
        haveOwner: !errors.owner && !!values.owner ? 1 : 0,
      };

      if (values.managers[0]) {
        for (const { email } of values.managers) {
          stepThree[email] = 1;
        }
      }

      return stepThree;
    };

    const getStepFour = () => {
      const stepFour = {};

      values.links.forEach((link, index) => {
        const { links: linkErros = [] } = errors;
        const noErros = linkErros.length === 0;

        if (!link.url && noErros) return (stepFour[`link${index}`] = 0);
        if (!!link.url && noErros) return (stepFour[`link${index}`] = 1);

        !!link.url && linkErros[index] === null
          ? (stepFour[`link${index}`] = 1)
          : (stepFour[`link${index}`] = 0);
      });
      console.log(stepFour);
      return stepFour;
    };

    const steps = {
      BasicInfos: getStepOne(),
      Location: getStepTwo(),
      People: getStepThree(),
      Links: getStepFour(),
    };

    const titles = Object.keys(pageTitles);
    const lastTitle = titles[titles.length - 1];
    const currentPosition = Object.keys(pageTitles).indexOf(currentPage);

    const getPercentage = () => {
      const size = Object.keys(steps[currentPage]).length;
      const percentage = Object.values(steps[currentPage]).reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );
      return (percentage / size) * 100;
    };

    // if (currentPage === lastTitle) {
    //   return (
    //     <>
    //       <button
    //         disabled={loading}
    //         className="button is-primary is-fullwidth is-large"
    //         type="submit"
    //       >
    //         {loading ? (
    //           <span>
    //             <i className="fa fa-spinner fa-spin"></i> Criar Comunidade
    //           </span>
    //         ) : (
    //           'Criar Comunidade'
    //         )}
    //       </button>
    //       <style jsx>{styles}</style>
    //     </>
    //   );
    // }
    return (
      <>
        <button
          disabled={loading}
          className="button is-primary is-fullwidth is-large"
          type="button"
          style={{
            background: `linear-gradient(to right, ${
              colors.primary
            } ${getPercentage()}%, ${colors.heliotrope} 0%)`,
          }}
          onClick={() =>
            setCurrentPage(Object.keys(pageTitles)[currentPosition + 1])
          }
        >
          Continuar
        </button>
      </>
    );
  };
  return renderButton();
}
