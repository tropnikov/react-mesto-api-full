import logo from '../images/logo.svg';
import { Route, Switch, Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header page__section">
      <img
        className="logo header__logo"
        src={logo}
        alt="Логотип Проекта Место"
      />

      <Switch>
        <Route exact path="/">
          <div className="header__user">
            <p className="header__email">{props.email}</p>
            <Link
              to="/sign-in"
              onClick={props.handleLogout}
              className="header__link header__link_logged-in button hover"
            >
              Выйти
            </Link>
          </div>
        </Route>

        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link button hover">
            Регистрация
          </Link>
        </Route>

        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link button hover">
            Войти
          </Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
