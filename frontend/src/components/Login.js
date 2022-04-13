import React from 'react';

const Login = ({ handleLogin }) => {
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
    handleLogin(email, password);
  };

  return (
    <main className="login">
      <h2 className="login__title">Вход</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          id="email"
          name="email"
          className="form__email form__input
          form__input_type_login"
          placeholder="Email"
          required
          value={userData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          name="password"
          className="form__password form__input form__input_type_login"
          placeholder="Пароль"
          required
          minLength="8"
          value={userData.password}
          onChange={handleChange}
        />
        <button
          className="login__submit form__submit button button_type_save button_type_login-submit"
          type="submit"
        >
          Войти
        </button>
      </form>
    </main>
  );
};
export default Login;
