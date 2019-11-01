import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Dropdown } from 'semantic-ui-react';
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

export const ValidationSchemaExample = () => {
  return (
    <div>
      <h1>Signup</h1>
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
              <label htmlFor="comunityName">Nome da comunidade</label>
              <br />
              <Field name="comunityName" />
              {errors.comunityName && touched.comunityName ? (
                <div>{errors.comunityName}</div>
              ) : null}
              <br />
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
                  handleStringChange(selectedOption, data.name, setFieldValue)
                }
              />
              {errors.model && touched.model ? <div>{errors.model}</div> : null}
              <br />
              <label htmlFor="country">País</label>
              <br />
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
                    handleStringChange(selectedOption, data.name, setFieldValue)
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
              <br />
              <label htmlFor="state">Estado</label>
              <br />
              {values.country === 'Brasil' && values.model !== 'Online' ? (
                <Select
                  name="state"
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  placeholder="Clique para selecionar"
                  options={statesOption}
                  onChange={(selectedOption, data) =>
                    handleStringChange(selectedOption, data.name, setFieldValue)
                  }
                />
              ) : (
                <Select placeholder="Não aplica à sua seleção" isDisabled />
              )}
              <br />
              <label htmlFor="city">Cidade</label>
              <br />
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
                    handleStringChange(selectedOption, data.name, setFieldValue)
                  }
                />
              ) : (
                <Select placeholder="Não aplica à sua seleção" isDisabled />
              )}
              <br />
              <label htmlFor="url">Link da comunidade</label>
              <br />
              <Field name="url" />
              {errors.url && touched.url ? <div>{errors.url}</div> : null}
              <br />
              <label htmlFor="description">Descrição</label>
              <br />
              <Field name="description" />
              {errors.description && touched.description ? (
                <div>{errors.description}</div>
              ) : null}
              <br />
              <label htmlFor="category">Categoria</label>
              <br />
              <Select
                name="category"
                closeMenuOnSelect={true}
                components={animatedComponents}
                placeholder="Clique para selecionar"
                options={CATEGORIES}
              />
              <br />
              <label htmlFor="comunityType">Tipo</label>
              <br />
              <Select
                name="comunityType"
                closeMenuOnSelect={true}
                components={animatedComponents}
                placeholder="Clique para selecionar"
                options={[
                  { label: 'Podcast', value: 'Podcast' },
                  { label: 'Grupo do Facebook', value: 'Grupo do Facebook' },
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
              <br />
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
              {errors.tags && touched.tags ? <div>{errors.tags}</div> : null}
              <br />
              <label htmlFor="globalProgramParticipant">
                Pertence a algum programa global?
              </label>
              <br />
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
              <br />
              <label htmlFor="members">Quantidade de Membros</label>
              <br />
              <Field name="members" />
              {errors.members && touched.members ? (
                <div>{errors.members}</div>
              ) : null}
              <br />
              <label htmlFor="logo">Logo da comunidade</label>
              <br />
              <Field name="logo" />
              {errors.logo && touched.logo ? <div>{errors.logo}</div> : null}
              <br />
              <label htmlFor="rocketId">
                Se você é membro da Impulso Network, informe seu id
              </label>
              <br />
              <Field name="rocketId" />
              {errors.rocketId && touched.rocketId ? (
                <div>{errors.rocketId}</div>
              ) : null}
              <br />
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
