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
        haveName: !errors.name && touched.name ? 1 : 0,
        haveType: !errors.type && touched.type ? 1 : 0,
        haveCategory: !errors.category && touched.category ? 1 : 0,
        haveTags: !errors.tags && touched.tags ? 1 : 0,
        haveLogo: !errors.logo && touched.logo ? 1 : 0,
        haveDescription: !errors.description && touched.description ? 1 : 0,
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
      const { location: touchedLocation = {} } = touched;

      if (values.model === 'online')
        return { haveCountry: !!country && touchedLocation.country ? 1 : 0 };

      return {
        haveCountry: !!country && touchedLocation.country ? 1 : 0,
        haveState: !!state && touchedLocation.state ? 1 : 0,
        haveCity: !!city && touchedLocation.city ? 1 : 0,
      };
    };

    const getStepThree = () => {
      const stepThree = {
        haveMembers: !errors.members && touched.members ? 1 : 0,
        haveOwner: !errors.owner && touched.owner ? 1 : 0,
      };

      values.managers[0]
        ? (stepThree.haveManagers = 1)
        : delete stepThree.managers;

      return stepThree;
    };

    const getStepFour = () => {
      if (!values.links[0].url) return { haveLinks: 0 };
      const stepFour = {};

      values.links.forEach(({ url }, index) =>
        !!url ? (stepFour[`${index}`] = 1) : (stepFour[`${index}`] = 0)
      );
      console.log(stepFour);
      return stepFour;
    };

    const getPercentage = () => {
      const size = Object.keys(getStepFour()).length;
      const percentage = Object.values(getStepFour()).reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );
      return (percentage / size) * 100;
    };

    const titles = Object.keys(pageTitles);
    const lastTitle = titles[titles.length - 1];
    const currentPosition = Object.keys(pageTitles).indexOf(currentPage);

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
