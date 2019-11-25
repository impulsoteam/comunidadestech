import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import * as Yup from 'yup';
import styles from './styles';

import { CITYANDSTATES } from '../../utils/cityAndStates';
import countries from '../../utils/countries';
import { CATEGORIES } from '../../utils/comunityCategories';
import { TAGS } from '../../utils/comunityTags';

const CommunityForm = ({ service, initialValues, token }) => {
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Muito curto!')
      .max(30, 'Muito longo!')
      .required('Item obrigatório'),
    logo: Yup.string().matches(
      /^(http(s)?:\/\/|www\.).*(\.jpg|\.jpeg|\.png)$/,
      'Deve ser um endereço de uma imagem JPG ou PNG'
    ),
    url: Yup.string()
      .url('Link inválido. Exemplo: http://site.com')
      .required('Item obrigatório'),
    description: Yup.string().required('Item obrigatório'),
    type: Yup.string().required('Item obrigatório'),
    category: Yup.string().required('Item obrigatório'),
    tags: Yup.array()
      .required('Selecione pelo menos uma tag')
      .typeError('Selecione pelo menos uma tag'),

    members: Yup.number()
      .typeError('Valor deve ser em número')
      .required('Item obrigatório'),
    model: Yup.string().required('Item obrigatório'),
    location: Yup.object().shape({
      country: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
    }),
    globalProgram: Yup.object().shape({
      isParticipant: Yup.string().required('Item obrigatório'),
      name: Yup.string(),
    }),
    creator: Yup.object().shape({
      rocketChat: Yup.string(),
    }),
    owner: Yup.string()
      .email('Endereço de email inválido')
      .required('Item obrigatório'),
  });
  const modelOptions = [
    { label: 'Presencial', value: 'presential' },
    { label: 'Online', value: 'online' },
    { label: 'Ambos', value: 'both' },
  ];
  const communityTypes = [
    { label: 'Podcast', value: 'Podcast' },
    {
      label: 'Grupo do Facebook',
      value: 'Grupo do Facebook',
    },
    { label: 'Whatsapp', value: 'Whatsapp' },
    { label: 'Meetup', value: 'Meetup' },
    { label: 'Discord', value: 'Discord' },
    { label: 'Slack', value: 'Slack' },
  ];
  const globalProgramOptions = [
    { label: 'Sim', value: true },
    { label: 'Não', value: false },
  ];
  const statesOption = CITYANDSTATES.map((state) => {
    const states = {};

    states.label = state.nome;
    states.value = state.nome;

    return states;
  });

  const cityOption = (CITYANDSTATES, selectedState) => {
    const cities = CITYANDSTATES.filter(
      (state) => state.nome === selectedState
    )[0].cidades.map((city) => {
      const tempCities = {};
      tempCities.label = city;
      tempCities.value = city;
      return tempCities;
    });
    return cities;
  };

  const animatedComponents = makeAnimated();
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          setLoading(true);
          service(values);
          console.log('enviado', values);
        }}
      >
        {({ errors, touched, values, isSubmitting, setFieldValue }) => {
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
                    Nome da comunidade
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
                    A comunidade é presencial, online ou ambos?
                    <Select
                      name="model"
                      defaultValue={modelOptions.filter(
                        (value) => value.value === values.model
                      )}
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      placeholder="Clique para selecionar"
                      options={modelOptions}
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
                          (value) => value.value === values.location.country
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
                        defaultValue={statesOption.filter(
                          (value) => value.value === values.location.state
                        )}
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        placeholder="Clique para selecionar"
                        options={statesOption}
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
                        //todo
                        name="location.city"
                        // defaultValue={}
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        placeholder="Clique para selecionar"
                        options={cityOption(
                          CITYANDSTATES,
                          values.location.state
                        )}
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
                    Link da comunidade
                    <Field name="url" className="input" />
                    {errors.url && touched.url ? (
                      <div className="form-error">{errors.url}</div>
                    ) : null}
                  </label>
                  <label>
                    Descrição
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
                    Categoria
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
                    Tipo
                    <Select
                      name="type"
                      defaultValue={communityTypes.filter(
                        (type) => type.value === values.type
                      )}
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      placeholder="Clique para selecionar"
                      options={communityTypes}
                      onChange={(selectedOption, data) =>
                        handleStringChange(selectedOption, data.name)
                      }
                    />
                    {errors.type && touched.type ? (
                      <div className="form-error">{errors.type}</div>
                    ) : null}
                  </label>
                  <label>
                    Tags
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
                      defaultValue={globalProgramOptions.filter(
                        (option) =>
                          option.value === values.globalProgram.isParticipant
                      )}
                      name="globalProgram.isParticipant"
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      placeholder="Clique para selecionar"
                      options={globalProgramOptions}
                      onChange={(selectedOption, data) =>
                        handleStringChange(selectedOption, data.name)
                      }
                    />
                  </label>
                  {values.globalProgram.isParticipant && (
                    <label>
                      Qual?
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
                    Quantidade de Membros
                    <Field name="members" className="input" />
                    {errors.members && touched.members ? (
                      <div className="form-error">{errors.members}</div>
                    ) : null}
                  </label>
                  <label>
                    Logo da comunidade
                    <Field name="logo" className="input" />
                    {errors.logo && touched.logo ? (
                      <div className="form-error">{errors.logo}</div>
                    ) : null}
                  </label>
                  <label>
                    Se você é membro da Impulso Network, informe seu id
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
                    Informe o email do líder da comunidade:
                    <Field name="owner" className="input" />
                    {errors.owner && touched.owner ? (
                      <div className="form-error"> {errors.owner}</div>
                    ) : null}
                  </label>
                </div>
              </div>
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
                  {/* {token.isModerator && (
                    <button
                      onClick={() => setFieldValue('status', 'published')}
                      className="button is-primary  is-fullwidth is-large"
                      type="submit"
                    >
                      Enviar e publicar
                    </button>
                  )} */}
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

// CommunityForm.getInitialProps = async (ctx) => {
//   const { token } = cookies(ctx).ctech_token || {};
//   return { ...token };
// };

export default CommunityForm;
