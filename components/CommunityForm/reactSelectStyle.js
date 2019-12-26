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

export const linksSelectStyle = {
  indicatorSeparator: (styles) => ({ ...styles, display: 'none' }),
  singleValue: (styles) => ({ ...styles, strong: { display: 'none' } }),
  control: (styles) => ({
    ...styles,
    height: '44px',
    width: '60px',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: `${colors.primary}`,
    padding: '0 8px 0 0',
    ':hover': {
      opacity: '0.5',
    },
  }),
  menu: (styles) => ({ ...styles, width: '100%' }),
};
