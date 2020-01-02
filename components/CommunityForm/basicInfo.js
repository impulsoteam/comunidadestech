import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { api, setHeader } from '../../utils/axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { reactSelectStyle } from './reactSelectStyle';
import styles from './styles';

import {
  CATEGORIES,
  TAGS,
  TYPES,
  GLOBAL_PROGRAM,
  errorMessages,
} from './utils';

export default function BasicInfos({
  credentials,
  errors,
  touched,
  values,
  dirty,
  initialValues,
  setFieldValue,
  setFieldTouched,
}) {
  const { nameAlreadyExists } = errorMessages;
  const animatedComponents = makeAnimated();
  const checkName = async (name) => {
    if (!name || name === initialValues.name) return;
    setHeader(credentials);
    const { data } = await api.get(`/community/checkName/${name}`);

    return data ? nameAlreadyExists : null;
  };
  const handleChange = (selectedOption) => {
    const selected = selectedOption && selectedOption.map(({ value }) => value);
    setFieldValue('tags', selected);
  };
  const handleStringChange = (selectedOption, data) => {
    setFieldValue(data || data.value, selectedOption.value);
  };
  return (
    <>
      {/* <pre
        style={{
          background: '#f6f8fa',
          fontSize: '.65rem',
          padding: '.5rem',
        }}
      >
        {JSON.stringify({ values, dirty, errors, touched }, null, 2)}
      </pre> */}
      <label>
        Nome da comunidade *
        <div className="input-wrapper">
          <i className="fas fa-users fa-fw"></i>
          <Field
            name="name"
            validate={checkName}
            onBlur={() => setFieldTouched('name', true)}
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
          defaultValue={TYPES.filter((type) => type.value === values.type)}
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
            handleStringChange(selectedOption, data.name, setFieldValue)
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
          defaultValue={TAGS.filter((type) => values.tags.includes(type.value))}
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
                checked={item.value === values.globalProgram.isParticipant}
                id={item.value.toString()}
                onChange={() =>
                  setFieldValue('globalProgram.isParticipant', item.value)
                }
              />
              <label htmlFor={item.value.toString()} className="radio-label">
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
        <div className="input-wrapper">
          <Field
            name="description"
            component="textarea"
            className="textarea"
            rows="4"
            placeholder="Escreva um pouco sobre a comunidade"
          />
        </div>
        <ErrorMessage name="description">
          {(msg) => <div className="form-error">{msg}</div>}
        </ErrorMessage>
      </label>
      <style jsx>{styles}</style>
    </>
  );
}
