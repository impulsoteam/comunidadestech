import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { ErrorMessage } from 'formik'
import PropTypes from 'prop-types'
import { countries, states, cities } from './locationOptions'
import { reactSelectStyle } from './reactSelectStyle'
import styles from './styles'
import { MODEL } from './utils'

function Location({
  // credentials,
  // errors,
  // touched,
  values,
  // initialValues,
  setFieldValue,
  setFieldTouched
}) {
  const animatedComponents = makeAnimated()
  const getCities = (state) => cities.filter((city) => city.state === state)
  const handleStringChange = (selectedOption, data) => {
    setFieldValue(data || data.value, selectedOption.value)
  }
  
  return (
    <>
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
            handleStringChange(selectedOption, data.name, setFieldValue)
          }
          styles={reactSelectStyle}
        />
        <ErrorMessage name="location.country">
          {(msg) => <div className="form-error">{msg}</div>}
        </ErrorMessage>
      </label>
      <label>
        Estado
        {values.location.country === 'Brasil' && values.model !== 'online'
          ? <Select
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
              handleStringChange(selectedOption, data.name, setFieldValue)
            }
            styles={reactSelectStyle}
          />
          : <Select
            styles={reactSelectStyle}
            icon="\f279"
            placeholder="Não aplica à sua seleção"
            value="Não aplica à sua seleção"
            isDisabled
          />
        }
        <ErrorMessage name="location.state">
          {(msg) => <div className="form-error">{msg}</div>}
        </ErrorMessage>
      </label>
      <label>
        Cidade
        {values.location.country === 'Brasil' &&
          values.model !== 'online' &&
          values.location.state
          ? <Select
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
              handleStringChange(selectedOption, data.name, setFieldValue)
            }
            styles={reactSelectStyle}
          />

          : <Select
            icon="\f3c5"
            styles={reactSelectStyle}
            placeholder="Não aplica à sua seleção"
            value="Não aplica à sua seleção"
            isDisabled
          />
        }
        <ErrorMessage name="location.city">
          {(msg) => <div className="form-error">{msg}</div>}
        </ErrorMessage>
      </label>
      <p className="required-form">* Itens obrigatórios</p>
      <style jsx>{styles}</style>
    </>
  )
}

Location.propTypes = {
  credentials: PropTypes.object,
  errors: PropTypes.object,
  initialValues: PropTypes.object,
  touched: PropTypes.object,
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  setFieldTouched: PropTypes.func
}

export default Location
