import { colors } from '/utils/variables';

export const reactSelectStyle = {
  control: (styles, { ...props }) => ({
    ...styles,
    backgroundColor: props.isDisabled
      ? `${colors.softCloud}`
      : `${colors.white}`,
    minHeight: '44px',
  }),
  option: (styles) => ({ ...styles }),
  dropdownIndicator: (styles, { ...props }) => ({
    ...styles,
    color: props.isDisabled ? `${colors.silverChalice}` : `${colors.primary}`,
    svg: {
      height: '25px',
      width: '25px',
    },
    ':hover': {
      opacity: '0.5',
    },
  }),
  indicatorSeparator: (styles) => ({ ...styles, display: 'none' }),
  placeholder: (styles, { ...props }) => {
    return {
      ...styles,
      alignItems: 'center',
      color: `${colors.boulder}`,
      display: 'flex',
      fontSize: '14px',
      marginLeft: '-2px',

      ':before': {
        color: `${colors.alto}`,
        content: `"${props.selectProps.icon}"`,
        display: 'block',
        fontFamily: 'FontAwesome',
        fontSize: '14px',
        fontWeight: 'normal',
        marginRight: 6,
        textAlign: 'center',
        width: '1.25em',
      },
    };
  },
  singleValue: (styles, { ...props }) => {
    return {
      ...styles,
      alignItems: 'center',
      color: `${colors.dark}`,
      display: 'flex',
      fontSize: '14px',
      marginLeft: '-2px',

      ':before': {
        color: `${colors.alto}`,
        content: `"${props.selectProps.icon}"`,
        display: 'block',
        fontFamily: 'FontAwesome',
        fontSize: '14px',
        fontWeight: 'normal',
        marginRight: 6,
        textAlign: 'center',
        width: '1.25em',
      },
    };
  },
};
