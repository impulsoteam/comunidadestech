import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { api, setHeader } from '../../utils/axios';
import styles from './styles';
import { countries, states, cities } from './location';
import {
  SignupSchema,
  errorMessages,
  CATEGORIES,
  TAGS,
  TYPES,
  MODEL,
  GLOBAL_PROGRAM,
} from './utils';

const CommunityForm = ({ service, initialValues, loading, credentials }) => {
  const getCities = (state) => cities.filter((city) => city.state === state);
  const animatedComponents = makeAnimated();

  const numberMask = createNumberMask({
    prefix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    integerLimit: 6,
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={(values) => service(values)}
    >
      {({ values, setFieldValue, setFieldTouched, errors, touched }) => {
        const { nameAlreadyExists } = errorMessages;

        const checkName = async (name) => {
          if (!name || name === initialValues.name) return;
          setHeader(credentials);
          const { data } = await api.get(`/community/checkName/${name}`);

          return data ? nameAlreadyExists : null;
        };

        const handleChange = (selectedOption) => {
          const selected =
            selectedOption && selectedOption.map(({ value }) => value);
          setFieldValue('tags', selected);
        };

        const handleStringChange = (selectedOption, data) => {
          setFieldValue(data || data.value, selectedOption.value);
        };

        return (
          <Form>
            <div className="columns">
              <div className="column">
                <label>
                  Nome da comunidade *
                  <Field
                    name="name"
                    validate={checkName}
                    className="input"
                    placeholder="Digite o nome da sua comunidade"
                  />
                  {errors.name === nameAlreadyExists && !touched.name && (
                    <div className="form-error">{errors.name}</div>
                  )}
                  <ErrorMessage name="name">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
                <label>
                  A comunidade é presencial, online ou ambos? *
                  <Select
                    name="model"
                    defaultValue={MODEL.filter(
                      (value) => value.value === values.model
                    )}
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    placeholder="Clique para selecionar"
                    options={MODEL}
                    onBlur={() => setFieldTouched('model', true)}
                    onChange={(selectedOption, data) =>
                      handleStringChange(
                        selectedOption,
                        data.name,
                        setFieldValue
                      )
                    }
                  />
                  <ErrorMessage name="model">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
                <label>
                  País
                  <Select
                    defaultValue={countries.filter(
                      (country) => country.value === values.location.country
                    )}
                    name="location.country"
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    placeholder="Clique para selecionar"
                    options={countries}
                    onBlur={() => setFieldTouched('location.country', true)}
                    onChange={(selectedOption, data) =>
                      handleStringChange(
                        selectedOption,
                        data.name,
                        setFieldValue
                      )
                    }
                  />
                  <ErrorMessage name="location.country">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
                <label>
                  Estado
                  {values.location.country === 'Brasil' &&
                  values.model !== 'online' ? (
                    <Select
                      name="location.state"
                      defaultValue={states.filter(
                        (state) => state.value === values.location.state
                      )}
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      placeholder="Clique para selecionar"
                      options={states}
                      onBlur={() => setFieldTouched('location.state', true)}
                      onChange={(selectedOption, data) =>
                        handleStringChange(
                          selectedOption,
                          data.name,
                          setFieldValue
                        )
                      }
                    />
                  ) : (
                    <Select placeholder="Não aplica à sua seleção" isDisabled />
                  )}
                  <ErrorMessage name="location.state">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
                <label>
                  Cidade
                  {values.location.country === 'Brasil' &&
                  values.model !== 'online' &&
                  values.location.state ? (
                    <Select
                      name="location.city"
                      defaultValue={cities.filter(
                        (city) => city.label === values.location.city
                      )}
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      placeholder="Clique para selecionar"
                      options={getCities(values.location.state)}
                      onBlur={() => setFieldTouched('location.city', true)}
                      onChange={(selectedOption, data) =>
                        handleStringChange(
                          selectedOption,
                          data.name,
                          setFieldValue
                        )
                      }
                    />
                  ) : (
                    <Select placeholder="Não aplica à sua seleção" isDisabled />
                  )}
                  <ErrorMessage name="location.city">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
                <label>
                  Link da comunidade *
                  <Field name="url" className="input" />
                  <ErrorMessage name="url">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
                <label>
                  Descrição *
                  <Field
                    name="description"
                    component="textarea"
                    className="textarea"
                    rows="4"
                  />
                  <ErrorMessage name="description">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
              </div>
              <div className="column">
                <label>
                  Categoria *
                  <Select
                    name="category"
                    defaultValue={CATEGORIES.filter(
                      (category) => category.value === values.category
                    )}
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    placeholder="Clique para selecionar"
                    options={CATEGORIES}
                    onBlur={() => setFieldTouched('category', true)}
                    onChange={(selectedOption, data) =>
                      handleStringChange(
                        selectedOption,
                        data.name,
                        setFieldValue
                      )
                    }
                  />
                  <ErrorMessage name="category">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
                <label>
                  Tipo *
                  <Select
                    name="type"
                    defaultValue={TYPES.filter(
                      (type) => type.value === values.type
                    )}
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    placeholder="Clique para selecionar"
                    options={TYPES}
                    onBlur={() => setFieldTouched('type', true)}
                    onChange={(selectedOption, data) =>
                      handleStringChange(selectedOption, data.name)
                    }
                  />
                  <ErrorMessage name="type">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
                <label>
                  Tags *
                  <Select
                    name="tags"
                    defaultValue={TYPES.filter(
                      (type) => type.value === values.type
                    )}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    placeholder="Clique para selecionar"
                    isMulti
                    options={TAGS}
                    onBlur={() => setFieldTouched('tags', true)}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="tags">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
                <label>
                  Pertence a algum programa global?
                  <Select
                    defaultValue={GLOBAL_PROGRAM.filter(
                      (option) =>
                        option.value === values.globalProgram.isParticipant
                    )}
                    name="globalProgram.isParticipant"
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    placeholder="Clique para selecionar"
                    options={GLOBAL_PROGRAM}
                    onBlur={() =>
                      setFieldTouched('globalProgram.isParticipant', true)
                    }
                    onChange={(selectedOption, data) =>
                      handleStringChange(selectedOption, data.name)
                    }
                  />
                  <ErrorMessage name="globalProgram.isParticipant">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
                {values.globalProgram.isParticipant && (
                  <label>
                    Qual? *
                    <Field
                      name="globalProgram.name"
                      defaultValue={values.globalProgram.name}
                      className="input"
                    />
                    <ErrorMessage name="globalProgram.name">
                      {(msg) => <div className="form-error">{msg}</div>}
                    </ErrorMessage>
                  </label>
                )}
                <label>
                  Quantidade de Membros *
                  <Field name="members" type="number">
                    {({ field }) => (
                      <MaskedInput
                        {...field}
                        mask={numberMask}
                        className="input"
                      />
                    )}
                  </Field>
                  <ErrorMessage name="members">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
                <label>
                  Link da Logo da comunidade
                  <Field name="logo" className="input" />
                  <ErrorMessage name="logo">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
                <label>
                  Se você é membro da Impulso Network, informe seu nome de
                  usuário
                  <Field name="creator.rocketChat" className="input" />
                  <ErrorMessage name="creator.rocketChat">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
                <label>
                  Informe o email do líder da comunidade *
                  <Field name="owner" className="input" />
                  <ErrorMessage name="owner">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
              </div>
            </div>
            <p className="required-form">* Itens obrigatórios</p>
            <div className="columns">
              <div className="column is-half is-offset-one-quarter">
                <button
                  disabled={loading}
                  className="button is-primary  is-fullwidth is-large"
                  type="submit"
                >
                  {loading ? (
                    <span>
                      <i className="fa fa-spinner fa-spin"></i> enviar
                    </span>
                  ) : (
                    'enviar'
                  )}
                </button>
              </div>
            </div>
            <style jsx>{styles}</style>
          </Form>
        );
      }}
    </Formik>
  );
};

CommunityForm.getInitialProps = async (ctx) => {
  const credentials = cookies(ctx).ctech_credentials || {};
  return { ...credentials };
};

export default CommunityForm;
