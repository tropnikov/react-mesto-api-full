import React from 'react';
import { Link } from 'react-router-dom';

const Register = ({ handleRegister }) => {
  const [userData, setUserData] = React.useState({ email: '', password: '' });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = userData;
    handleRegister(email, password);
  };

  return (
    <main className="registration">
      <h2 className="registration__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          id="email"
          name="email"
          className="form__email form__input
          form__input_type_register"
          placeholder="Email"
          required
          onChange={handleChange}
          value={userData.email}
        />
        <input
          type="password"
          id="password"
          name="password"
          className="form__password form__input form__input_type_register"
          placeholder="Пароль"
          required
          minLength="8"
          onChange={handleChange}
          value={userData.password}
        />
        <button
          className="registration__submit form__submit button button_type_save button_type_registration-submit"
          type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
      <p className="registration__redirect-text">
        Уже зарегистрированы?&nbsp;
        <Link to="/sign-in" className="registration__redirect-link hover">
          Войти
        </Link>
      </p>
    </main>
  );
};
export default Register;
