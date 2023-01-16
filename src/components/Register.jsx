import React, { useState } from 'react';

const Register = ({ setRegister, setIsAuth }) => {
  const initialValues = { name: '', email: '', password: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setFormErrors({});
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Name is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors(validate(formValues));
    makeRequest();
  };

  const makeRequest = async () => {
    const { name, email, password } = formValues;
    const body = { email, password, name };
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_ORIGIN_URL}/auth/register`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          }
        );
        const data = await response.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          setIsAuth(true);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col w-4/6 md:w-3/6 lg:w-2/6 mx-auto gap-2">
      <h2 className="text-3xl">Sign Up</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          name="name"
          placeholder="name"
          className="rounded-md h-8 px-2"
          onChange={handleChange}
          value={formValues.name}
        />
        {formErrors ? (
          <div className="text-red-600">{formErrors.name}</div>
        ) : null}
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          className="rounded-md h-8 px-2"
          onChange={handleChange}
          value={formValues.email}
        />
        {formErrors ? (
          <div className="text-red-600">{formErrors.email}</div>
        ) : null}
        <input
          type="password"
          name="password"
          placeholder="password"
          className="rounded-md h-8 px-2"
          onChange={handleChange}
          value={formValues.password}
        />
        {formErrors ? (
          <div className="text-red-600">{formErrors.password}</div>
        ) : null}
        <button
          disabled={loading}
          className="bg-neon2 text-bg rounded-md h-8 hover:bg-bg hover:text-white"
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      <div className="flex justify-center gap-2">
        <p>Already have an account?</p>
        <p
          className="text-neon2 cursor-pointer"
          onClick={() => setRegister(false)}
        >
          Log In
        </p>
      </div>
    </div>
  );
};

export default Register;
