import React from 'react';
import { Formik, Form, Field, FormikHelpers, FormikErrors } from 'formik';

interface FormValues {
  name: string;
  url: string;
}

export default function App() {
  const initialValues: FormValues = {
    name: '',
    url: '',
  };

  const validate = (values: FormValues): FormikErrors<FormValues> => {
    console.log('validate')
    const errors: FormikErrors<FormValues> = {};

    if (!values.name) {
      errors.name = 'Name is required';
    }
    if (!values.url) {
      errors.url = 'URL is required';
    }

    return errors;
  }

  const onSubmit = (values: FormValues, helpers: FormikHelpers<FormValues>) => {
    console.log('formik submit', values);
    console.log('formik submit', helpers);
  }

  return (
    <>
      <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
        {(formikProps) => (
          <Form>
            <p>
              <label>
                Name:<br/>
                <Field type="text" name="name" />
                {formikProps.touched.name ? 'Touched ' : ''}
                {formikProps.touched.name && formikProps.errors.name}
              </label>
            </p>
            <p>
              <label>
                URL:<br/>
                <Field type="text" name="url" />
                {formikProps.touched.url ? 'Touched ' : ''}
                {formikProps.touched.url && formikProps.errors.url}
              </label>
            </p>
            <p>
              <button type="submit">Submit</button>
            </p>
            <p>
              Values: {JSON.stringify(formikProps.values)}
            </p>
            <p>
              Errors: {JSON.stringify(formikProps.errors)}
            </p>
            <p>
              Touched: {JSON.stringify(formikProps.touched)}
            </p>
            <p>
              isSubmitting: {JSON.stringify(formikProps.isSubmitting)}<br/>
              isValidating: {JSON.stringify(formikProps.isValidating)}<br/>
              status: {JSON.stringify(formikProps.status)}<br/>
              submitCount: {JSON.stringify(formikProps.submitCount)}
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
}
