import css from 'styled-jsx/css';

export default css`
  .title {
    font-weight: 700;
  }
  .subtitle {
    font-family: 'Raleway', sans-serif;
    font-size: 20px !important;
    font-weight: 300;
    margin: 0 auto 20px;
    max-width: 400px;
  }

  label {
    display: inline-block;
    width: 100%;
    margin-top: 20px;
    font-weight: 600;
    position: relative;

    .input {
      background: red;
    }

    .form-error {
      font-size: 10px;
      color: red;
      line-height: 1;
      position: absolute;
      bottom: -12px;
      font-weight: normal;
    }
  }

  button {
    margin-top: 20px;
  }

  .container {
    margin-bottom: 50px;
  }

  .required-form {
    font-size: 12px;
    font-weight: bold;
  }
`;
