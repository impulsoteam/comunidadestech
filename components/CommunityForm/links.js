import React from 'react'
import Select from 'react-select'
import { Field, ErrorMessage, FieldArray } from 'formik'
import PropTypes from 'prop-types'
import { linksSelectStyle } from './reactSelectStyle'
import styles from './styles'
import { LINKS } from './utils'

function Links({ errors, values, setFieldValue }) {
  const handleStringChange = (selectedOption, data) => {
    setFieldValue(data || data.value, selectedOption.value)
  }

  return (
    <>
      <div className="links-wrapper">
        <h5>Links *</h5>
        <div>
          <FieldArray
            name="links"
            render={(arrayHelpers) => (
              <div>
                {values.links.map((link, index) => (
                  <>
                    <div key={index} className="link-section">
                      <Select
                        name={`links[${index}].type`}
                        onChange={(selectedOption, data) =>
                          handleStringChange(
                            selectedOption,
                            data.name,
                            setFieldValue
                          )
                        }
                        value={LINKS.filter(
                          (link) => link.value === values.links[index].type
                        )}
                        styles={linksSelectStyle}
                        options={LINKS}
                      />
                      <label>
                        <Field
                          name={`links.${index}.url`}
                          className="input link-input"
                          placeholder="https://"
                        />
                      </label>
                      <button
                        disabled={values.links.length === 1}
                        type="button"
                        className="link-delete"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        -
                      </button>
                    </div>
                    <ErrorMessage name={`links[${index}].url`}>
                      {(msg) => <div className="form-error">{msg}</div>}
                    </ErrorMessage>
                    {!values.links[index + 1] && (
                      <div style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          disabled={
                            (errors.links && !!errors.links[index]) ||
                            !values.links[index].url
                          }
                          className="button is-primary is-outlined"
                          onClick={() => {
                            arrayHelpers.push({ type: 'url', url: '' })
                          }}
                        >
                          <span className="icon is-small">
                            <i className="fas fa-plus"></i>
                          </span>
                          <span>adicionar mais um link</span>
                        </button>
                      </div>
                    )}
                  </>
                ))}
              </div>
            )}
          />
        </div>
      </div>
      <p className="required-form">* Itens obrigatórios</p>
      <style jsx>{styles}</style>
    </>
  )
}

Links.propTypes = {
  setFieldValue: PropTypes.func,
  errors: PropTypes.object,
  values: PropTypes.object
}

export default Links
