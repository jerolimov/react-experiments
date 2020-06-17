import React from 'react';

export default function App() {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputFields = event.currentTarget.querySelectorAll('input');
    const formValues: Record<string, string> = {};
    inputFields.forEach((inputField) => {
      formValues[inputField.name] = inputField.value;
    })
    console.log('submit', formValues);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <p>
          <label>
            Name:<br/>
            <input type="text" name="name" />
          </label>
        </p>
        <p>
          <label>
            URL:<br/>
            <input type="text" name="url" />
          </label>
        </p>
        <p>
          <button type="submit">Submit</button>
        </p>
      </form>
    </>
  );
}
