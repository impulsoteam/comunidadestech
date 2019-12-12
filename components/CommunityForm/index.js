import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { reactSelectStyle } from './reactSelectStyle';

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
              <div className="column is-6-tablet is-offset-3-tablet is-4-desktop is-offset-4-desktop">
                <label>
                  Nome da comunidade *
                  <div className="input-wrapper">
                    <i className="fas fa-users fa-fw"></i>
                    <Field
                      name="name"
                      validate={checkName}
                      className="input is-medium"
                      placeholder="Digite o nome da sua comunidade"
                    />
                  </div>
                  {errors.name === nameAlreadyExists && !touched.name && (
                    <div className="form-error">{errors.name}</div>
                  )}
                  <ErrorMessage name="name">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
                <label>
                  Tipo *
                  <Select
                    name="type"
                    icon="\f075"
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
                    styles={reactSelectStyle}
                  />
                  <ErrorMessage name="type">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
                <label>
                  Categoria *
                  <Select
                    name="category"
                    icon="\f03a"
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
                    styles={reactSelectStyle}
                  />
                  <ErrorMessage name="category">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
                <label>
                  Tags *
                  <Select
                    name="tags"
                    icon="\f02b"
                    defaultValue={TAGS.filter((type) =>
                      values.tags.includes(type.value)
                    )}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    placeholder="Clique para selecionar"
                    isMulti
                    options={TAGS}
                    onBlur={() => setFieldTouched('tags', true)}
                    onChange={handleChange}
                    styles={reactSelectStyle}
                  />
                  <ErrorMessage name="tags">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
                <fieldset>
                  <legend>Pertence a algum programa global?</legend>
                  <div className="radio-group">
                    {GLOBAL_PROGRAM.map((item) => (
                      <div className="radio-item" key={item.label}>
                        <input
                          type="radio"
                          name="globalProgram.isParticipant"
                          value={item.value}
                          checked={
                            item.value === values.globalProgram.isParticipant
                          }
                          id={item.value.toString()}
                          onChange={() =>
                            setFieldValue(
                              'globalProgram.isParticipant',
                              item.value
                            )
                          }
                        />
                        <label
                          htmlFor={item.value.toString()}
                          className="radio-label"
                        >
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <ErrorMessage name="globalProgram.isParticipant">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </fieldset>
                {values.globalProgram.isParticipant && (
                  <label>
                    Qual? *
                    <div className="input-wrapper">
                      <i className="fas fa-users fa-fw"></i>
                      <Field
                        name="globalProgram.name"
                        defaultValue={values.globalProgram.name}
                        className="input"
                        placeholder="Digite o nome do programa"
                      />
                    </div>
                    <ErrorMessage name="globalProgram.name">
                      {(msg) => <div className="form-error">{msg}</div>}
                    </ErrorMessage>
                  </label>
                )}
                <fieldset>
                  <legend>A comunidade é presencial, online ou ambos? *</legend>
                  <div className="radio-group">
                    {MODEL.map((item) => (
                      <div className="radio-item" key={item.label}>
                        <input
                          type="radio"
                          name="model"
                          value={item.value}
                          checked={item.value === values.model}
                          id={item.value}
                          onChange={() => setFieldValue('model', item.value)}
                        />
                        <label htmlFor={item.value} className="radio-label">
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <ErrorMessage name="model">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </fieldset>
                <label>
                  País
                  <Select
                    defaultValue={countries.filter(
                      (country) => country.value === values.location.country
                    )}
                    name="location.country"
                    icon="\f0ac"
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
                    styles={reactSelectStyle}
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
                      icon="\f279"
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
                      styles={reactSelectStyle}
                    />
                  ) : (
                    <Select
                      styles={reactSelectStyle}
                      icon="\f279"
                      placeholder="Não aplica à sua seleção"
                      value="Não aplica à sua seleção"
                      isDisabled
                    />
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
                      icon="\f3c5"
                      options={getCities(values.location.state)}
                      defaultValue={cities.filter(
                        (city) => city.label === values.location.city
                      )}
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      placeholder="Clique para selecionar"
                      onBlur={() => setFieldTouched('location.city', true)}
                      onChange={(selectedOption, data) =>
                        handleStringChange(
                          selectedOption,
                          data.name,
                          setFieldValue
                        )
                      }
                      styles={reactSelectStyle}
                    />
                  ) : (
                    <Select
                      icon="\f3c5"
                      styles={reactSelectStyle}
                      placeholder="Não aplica à sua seleção"
                      value="Não aplica à sua seleção"
                      isDisabled
                    />
                  )}
                  <ErrorMessage name="location.city">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
                <label>
                  Quantidade de Membros *
                  <div className="input-wrapper">
                    <i className="fas fa-users fa-fw"></i>
                    <Field name="members" type="number">
                      {({ field }) => (
                        <MaskedInput
                          {...field}
                          mask={numberMask}
                          className="input"
                          placeholder="Digite a quantidade de membros"
                        />
                      )}
                    </Field>
                  </div>
                  <ErrorMessage name="members">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
                <label>
                  Informe um e-mail da liderança *
                  <div className="input-wrapper">
                    <i className="fas fa-envelope"></i>
                    <Field
                      name="owner"
                      className="input"
                      placeholder="Digite o email"
                    />
                  </div>
                  <ErrorMessage name="owner">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
                <label>
                  Link da comunidade *
                  <div className="input-wrapper">
                    <i className="fas fa-link"></i>
                    <Field name="url" className="input" />
                  </div>
                  <ErrorMessage name="url">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
                <label>
                  Link da Logo da comunidade
                  <div className="input-wrapper">
                    <i className="far fa-file-image"></i>
                    <Field
                      name="logo"
                      className="input"
                      placeholder="https://suacomunidade.com/imagem.jpg"
                    />
                  </div>
                  <ErrorMessage name="logo">
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
                    placeholder="Escreva um pouco sobre a comunidade"
                  />
                  <ErrorMessage name="description">
                    {(msg) => <div className="form-error">{msg}</div>}
                  </ErrorMessage>
                </label>
                <p className="required-form">* Itens obrigatórios</p>
              </div>
            </div>
            <div className="columns">
              <div className="column is-6-tablet is-offset-3-tablet is-4-desktop is-offset-4-desktop">
                <button
                  disabled={loading}
                  className="button is-primary is-fullwidth is-large"
                  type="submit"
                >
                  {loading ? (
                    <span>
                      <i className="fa fa-spinner fa-spin"></i> Cadastrar
                      Comunidade
                    </span>
                  ) : (
                    'Cadastrar Comunidade'
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
