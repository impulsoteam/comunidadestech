import React from 'react';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import * as Yup from 'yup';

import { CITYANDSTATES } from '../../utils/cityAndStates';
import { CATEGORIES } from '../../utils/comunityCategories';
import { TAGS } from '../../utils/comunityTags';

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

const SignupSchema = Yup.object().shape({
  comunityName: Yup.string()
    .min(2, 'Muito curto!')
    .max(30, 'Muito longo!')
    .required('Item obrigatório'),
  model: Yup.string().required('Item obrigatório'),
  country: Yup.string(),
  otheCountry: Yup.string(),
  state: Yup.string(),
  city: Yup.string(),
  url: Yup.string()
    .url('Link inválido')
    .required('Item obrigatório'),
  description: Yup.string().required('Item obrigatório'),
  comunityType: Yup.string().required('Item obrigatório'),
  category: Yup.string().required('Item obrigatório'),
  tags: Yup.array()
    .required('Selecione pelo menos uma tag')
    .typeError('Selecione pelo menos uma tag'),
  globalProgramParticipant: Yup.string().required('Item obrigatório'),
  globalProgramName: Yup.string(),
  members: Yup.number()
    .typeError('Valor deve ser em número')
    .required('Item obrigatório'),
  logo: Yup.string().matches(
    /^(http(s)?:\/\/|www\.).*(\.jpg|\.jpeg|\.png)$/,
    'Deve ser um endereço de uma imagem JPG ou PNG'
  ),
  rocketId: Yup.string(),
});

export const RegistrationForm = () => {
  return (
    <div className="container">
      <h1>Cadastro</h1>
      <Formik
        initialValues={{
          comunityName: '',
          model: '',
          country: '',
          otherCountry: '',
          state: '',
          city: '',
          url: 'https://',
          description: '',
          category: 'Desenvolvimento de software',
          tags: [],
          globalProgramParticipant: 'nao',
          globalProgramName: '',
          rocketId: '',
          comunityType: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log('enviado', values);
        }}
      >
        {({ errors, touched, values, setFieldValue }) => {
          console.log(values);
          const handleChange = (selectedOption) => {
            const selected =
              selectedOption && selectedOption.map(({ value }) => value);
            values.tags = selected;
          };

          const handleStringChange = (selectedOption, data) => {
            console.log(data, ': ', selectedOption.value);
            setFieldValue(`${data}`, selectedOption.value);
          };

          return (
            <Form>
              <div class="columns">
                <div class="column">
                  <label htmlFor="comunityName">Nome da comunidade</label>

                  <Field name="comunityName" className="input" />
                  {errors.comunityName && touched.comunityName ? (
                    <div>{errors.comunityName}</div>
                  ) : null}

                  <label htmlFor="model">
                    A comunidade é presencial, online ou ambos?
                  </label>

                  <Select
                    name="model"
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    placeholder="Clique para selecionar"
                    options={[
                      { label: 'Presencial', value: 'Presencial' },
                      { label: 'Online', value: 'Online' },
                      { label: 'Ambos', value: 'Ambos' },
                    ]}
                    onChange={(selectedOption, data) =>
                      handleStringChange(
                        selectedOption,
                        data.name,
                        setFieldValue
                      )
                    }
                  />
                  {errors.model && touched.model ? (
                    <div>{errors.model}</div>
                  ) : null}

                  <label htmlFor="country">País</label>

                  {values.model === 'Online' || values.model === '' ? (
                    <Select
                      isDisabled
                      name="country"
                      placeholder="Não aplica à sua seleção"
                    />
                  ) : (
                    <Select
                      name="country"
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      placeholder="Clique para selecionar"
                      options={[
                        { label: 'Brasil', value: 'Brasil' },
                        { label: 'Outro', value: 'Online' },
                      ]}
                      onChange={(selectedOption, data) =>
                        handleStringChange(
                          selectedOption,
                          data.name,
                          setFieldValue
                        )
                      }
                    />
                  )}
                  {values.country === 'Outro' && (
                    <>
                      <span>Qual?</span>
                      <Field name="otherCountry" />
                      {errors.otherCountry && touched.otherCountry ? (
                        <div>{errors.otherCountry}</div>
                      ) : null}
                    </>
                  )}

                  <label htmlFor="state">Estado</label>

                  {values.country === 'Brasil' && values.model !== 'Online' ? (
                    <Select
                      name="state"
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
                    <Select placeholder="Não aplica à sua seleção" isDisabled />
                  )}
                  <label htmlFor="city">Cidade</label>
                  {values.country === 'Brasil' &&
                  values.model !== 'Online' &&
                  values.state ? (
                    <Select
                      name="city"
                      closeMenuOnSelect={true}
                      components={animatedComponents}
                      placeholder="Clique para selecionar"
                      options={cityOption(CITYANDSTATES, values.state)}
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
                  <label htmlFor="url">Link da comunidade</label>
                  <Field name="url" className="input" />
                  {errors.url && touched.url ? <div>{errors.url}</div> : null}
                  <label htmlFor="description">Descrição</label>
                  <Field
                    name="description"
                    component="textarea"
                    className="textarea"
                    rows="2"
                  />
                  {errors.description && touched.description ? (
                    <div>{errors.description}</div>
                  ) : null}
                </div>
                <div class="column">
                  <label htmlFor="category">Categoria</label>
                  <Select
                    name="category"
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    placeholder="Clique para selecionar"
                    options={CATEGORIES}
                  />
                  <label htmlFor="comunityType">Tipo</label>
                  <Select
                    name="comunityType"
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    placeholder="Clique para selecionar"
                    options={[
                      { label: 'Podcast', value: 'Podcast' },
                      {
                        label: 'Grupo do Facebook',
                        value: 'Grupo do Facebook',
                      },
                      { label: 'Whatsapp', value: 'Whatsapp' },
                      { label: 'Meetup', value: 'Meetup' },
                      { label: 'Discord', value: 'Discord' },
                      { label: 'Slack', value: 'Slack' },
                    ]}
                    onChange={(selectedOption, data) =>
                      handleStringChange(selectedOption, data.name)
                    }
                  />
                  {errors.comunityType && touched.comunityType ? (
                    <div>{errors.comunityType}</div>
                  ) : null}
                  <label htmlFor="tags">Tags</label>
                  <Select
                    name="tags"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    placeholder="Clique para selecionar"
                    isMulti
                    options={TAGS}
                    onChange={handleChange}
                  />
                  {errors.tags && touched.tags ? (
                    <div>{errors.tags}</div>
                  ) : null}
                  <label htmlFor="globalProgramParticipant">
                    Pertence a algum programa global?
                  </label>
                  <Select
                    name="globalProgramParticipant"
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    placeholder="Clique para selecionar"
                    options={[
                      { label: 'Sim', value: 'Sim' },
                      { label: 'Não', value: 'Nao' },
                    ]}
                    onChange={(selectedOption, data) =>
                      handleStringChange(selectedOption, data.name)
                    }
                  />
                  {values.globalProgramParticipant === 'Sim' && (
                    <>
                      <span>Qual?</span>
                      <Field name="globalProgramName" />
                      {errors.globalProgramName && touched.globalProgramName ? (
                        <div>{errors.globalProgramName}</div>
                      ) : null}
                    </>
                  )}
                  <label htmlFor="members">Quantidade de Membros</label>
                  <Field name="members" className="input" />
                  {errors.members && touched.members ? (
                    <div>{errors.members}</div>
                  ) : null}
                  <label htmlFor="logo">Logo da comunidade</label>
                  <Field name="logo" className="input" />
                  {errors.logo && touched.logo ? (
                    <div>{errors.logo}</div>
                  ) : null}
                  <label htmlFor="rocketId">
                    Se você é membro da Impulso Network, informe seu id
                  </label>
                  <Field name="rocketId" className="input" />
                  {errors.rocketId && touched.rocketId ? (
                    <div>{errors.rocketId}</div>
                  ) : null}
                  <button type="submit">Submit</button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
