import React, { PureComponent } from 'react';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import * as Yup from 'yup';
import styles from './styles';

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
    .url('Link inválido. Exemplo: http://site.com')
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
  comunityOwner: Yup.string()
    .email('Endereço de email inválido')
    .required('Item obrigatório'),
});

export default class Comunity extends PureComponent {
  render() {
    return (
      <div className="container">
        <div className="hero-body">
          <div className="columns is-centered">
            <div className="column has-text-centered">
              <h1 className="title is-size-1-desktop is-size-2-tablet is-size-3-mobile">
                Cadastre sua comunidade
              </h1>
              <h2 className="subtitle is-size-4-desktop">
                Preencha o formulário e tenha sua comunidade publicada no nosso
                diretório!
              </h2>
            </div>
          </div>
        </div>
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
            category: '',
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
                        name="comunityName"
                        className="input"
                        placeholder="Digite o nome da sua comunidade"
                      />
                      {errors.comunityName && touched.comunityName ? (
                        <div className="form-error">{errors.comunityName}</div>
                      ) : null}
                    </label>
                    <label>
                      A comunidade é presencial, online ou ambos?
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
                        <div className="form-error">{errors.model}</div>
                      ) : null}
                    </label>
                    <label>
                      País
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
                            { label: 'Outro', value: 'Outro' },
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
                        <label>
                          Qual?
                          <Field name="otherCountry" className="input" />
                          {errors.otherCountry && touched.otherCountry ? (
                            <div>{errors.otherCountry}</div>
                          ) : null}
                        </label>
                      )}
                    </label>
                    <label>
                      Estado
                      {values.country === 'Brasil' &&
                      values.model !== 'Online' ? (
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
                        <Select
                          placeholder="Não aplica à sua seleção"
                          isDisabled
                        />
                      )}
                    </label>
                    <label>
                      Cidade
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
                        <div className="form-error">{errors.comunityType}</div>
                      ) : null}
                    </label>
                    <label>
                      Tags
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
                        <div className="form-error">{errors.tags}</div>
                      ) : null}
                    </label>
                    <label>
                      Pertence a algum programa global?
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
                    </label>
                    {values.globalProgramParticipant === 'Sim' && (
                      <label>
                        Qual?
                        <Field name="globalProgramName" className="input" />
                        {errors.globalProgramName &&
                        touched.globalProgramName ? (
                          <div>{errors.globalProgramName}</div>
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
                      <Field name="rocketId" className="input" />
                      {errors.rocketId && touched.rocketId ? (
                        <div className="form-error"> {errors.rocketId}</div>
                      ) : null}
                    </label>
                    <label>
                      Informe o email do líder da comunidade:
                      <Field name="comunityOwner" className="input" />
                      {errors.comunityOwner && touched.comunityOwner ? (
                        <div className="form-error">
                          {' '}
                          {errors.comunityOwner}
                        </div>
                      ) : null}
                    </label>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-half is-offset-one-quarter">
                    <button
                      className="button is-primary  is-fullwidth is-large"
                      type="submit"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
        <style jsx>{styles}</style>
      </div>
    );
  }
}
