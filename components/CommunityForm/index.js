import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import styles from './styles';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { countries, states, cities } from './location';
import {
  SignupSchema,
  CATEGORIES,
  TAGS,
  TYPES,
  MODEL,
  GLOBAL_PROGRAM,
} from './utils';

const CommunityForm = ({ service, initialValues }) => {
  const getCities = (state) => cities.filter((city) => city.state === state);
  const animatedComponents = makeAnimated();
  const [loading, setLoading] = useState(false);

  const numberMask = createNumberMask({
    prefix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    integerLimit: 6,
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          setLoading(true);
          service(values);
        }}
      >
        {({ errors, touched, values, setFieldValue }) => {
          const handleChange = (selectedOption) => {
            const selected =
              selectedOption && selectedOption.map(({ value }) => value);
            setFieldValue('tags', selected);
          };

          const handleStringChange = (selectedOption, data) => {
            setFieldValue(`${data}`, selectedOption.value);
          };

          return (
            <Form>
              <div className="columns">
                <div className="column">
                  <label>
                    Nome da comunidade *
                    <Field
                      name="name"
                      className="input"
                      placeholder="Digite o nome da sua comunidade"
                    />
                    {errors.name && touched.name ? (
                      <div className="form-error">{errors.name}</div>
                    ) : null}
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
                      onChange={(selectedOption, data) =>
                        handleStringChange(
                          selectedOption,
                          data.name,
                          setFieldValue
                        )
                      }
                    />
                    {errors.model && touched.model ? (
                      <div className="form-error">{errors.model}</div>
                    ) : null}
                  </label>
                  <label>
                    País
                    {values.model === 'Online' || values.model === '' ? (
                      <Select
                        isDisabled
                        name="location.country"
                        placeholder="Não aplica à sua seleção"
                      />
                    ) : (
                      <Select
                        defaultValue={countries.filter(
                          (country) => country.value === values.location.country
                        )}
                        name="location.country"
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        placeholder="Clique para selecionar"
                        options={countries}
                        onChange={(selectedOption, data) =>
                          handleStringChange(
                            selectedOption,
                            data.name,
                            setFieldValue
                          )
                        }
                      />
                    )}
                    {values.location.country === 'Outro' && (
                      <label>
                        Qual?
                        <Field name="location.country" className="input" />
                        {errors.otherCountry && touched.otherCountry ? (
                          <div>{errors.otherCountry}</div>
                        ) : null}
                      </label>
                    )}
                  </label>
                  <label>
                    Estado
                    {values.location.country === 'Brasil' &&
                    values.model !== 'online' ? (
                      <Select
                        name="location.state"
                        defaultValue={states.filter(
                          (state) => state.label === values.location.state
                        )}
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        placeholder="Clique para selecionar"
                        options={states}
                        onChange={(selectedOption, data) =>
                          handleStringChange(
                            selectedOption,
                            data.name,
                            setFieldValue
                          )
                        }
                      />
                    ) : (
                      <Select
                        placeholder="Não aplica à sua seleção"
                        isDisabled
                      />
                    )}
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
                        onChange={(selectedOption, data) =>
                          handleStringChange(
                            selectedOption,
                            data.name,
                            setFieldValue
                          )
                        }
                      />
                    ) : (
                      <Select
                        placeholder="Não aplica à sua seleção"
                        isDisabled
                      />
                    )}
                  </label>
                  <label>
                    Link da comunidade *
                    <Field name="url" className="input" />
                    {errors.url && touched.url ? (
                      <div className="form-error">{errors.url}</div>
                    ) : null}
                  </label>
                  <label>
                    Descrição *
                    <Field
                      name="description"
                      component="textarea"
                      className="textarea"
                      rows="4"
                    />
                    {errors.description && touched.description ? (
                      <div className="form-error">{errors.description}</div>
                    ) : null}
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
                      onChange={(selectedOption, data) =>
                        handleStringChange(
                          selectedOption,
                          data.name,
                          setFieldValue
                        )
                      }
                    />
                    {errors.category && touched.category ? (
                      <div className="form-error">{errors.category}</div>
                    ) : null}
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
                      onChange={(selectedOption, data) =>
                        handleStringChange(selectedOption, data.name)
                      }
                    />
                    {errors.type && touched.type ? (
                      <div className="form-error">{errors.type}</div>
                    ) : null}
                  </label>
                  <label>
                    Tags *
                    <Select
                      name="tags"
                      defaultValue={values.tags.map((tag) => ({
                        label: tag,
                        name: tag,
                      }))}
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      placeholder="Clique para selecionar"
                      isMulti
                      options={TAGS}
                      onChange={handleChange}
                    />
                    {errors.tags && touched.tags ? (
                      <div className="form-error">{errors.tags}</div>
                    ) : null}
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
                      onChange={(selectedOption, data) =>
                        handleStringChange(selectedOption, data.name)
                      }
                    />
                  </label>
                  {values.globalProgram.isParticipant && (
                    <label>
                      Qual? *
                      <Field
                        name="globalProgram.name"
                        defaultValue={values.globalProgram.name}
                        className="input"
                      />
                      {errors.globalProgram &&
                      errors.globalProgram.name &&
                      touched.globalProgram &&
                      touched.globalProgram.name ? (
                        <div>{errors.globalProgram.name}</div>
                      ) : null}
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
                    {errors.members && touched.members ? (
                      <div className="form-error">{errors.members}</div>
                    ) : null}
                  </label>
                  <label>
                    Link da Logo da comunidade
                    <Field name="logo" className="input" />
                    {errors.logo && touched.logo ? (
                      <div className="form-error">{errors.logo}</div>
                    ) : null}
                  </label>
                  <label>
                    Se você é membro da Impulso Network, informe seu nome de
                    usuário
                    <Field name="creator.rocketChat" className="input" />
                    {errors.creator &&
                    errors.creator.rocketChat &&
                    touched.creator &&
                    touched.creator.rocketChat ? (
                      <div className="form-error">
                        {errors.creator.rocketChat}
                      </div>
                    ) : null}
                  </label>
                  <label>
                    Informe o email do líder da comunidade *
                    <Field name="owner" className="input" />
                    {errors.owner && touched.owner ? (
                      <div className="form-error"> {errors.owner}</div>
                    ) : null}
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
            </Form>
          );
        }}
      </Formik>

      <style jsx>{styles}</style>
    </>
  );
};

export default CommunityForm;
