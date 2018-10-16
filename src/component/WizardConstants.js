import React, { Component } from 'react';
import { Field } from 'react-final-form';
import { render } from 'react-dom';

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

export const Error = ({ name }) => (
  <Field
    name={name}
    subscribe={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
)

export const required = value => (value ? undefined : 'Required')