import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {
  // * auth states
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [tooltipData, setTooltipData] = React.useState({
    status: false,
    title: '',
  });
  const [userEmail, setUserEmail] = React.useState();
  const history = useHistory();

  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    _id: '',
  });

  const [cards, setCards] = React.useState([]);

  // * popups states
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  // * mounting

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    loggedIn && history.push('/');
  }, [loggedIn]);

  React.useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  // * popups handlers

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsTooltipOpen(false);
  };

  const closeByOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  };

  //* User

  const handleUpdateUser = (inputData) => {
    api
      .saveUserData(inputData)
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (avatarLink) => {
    api
      .updateAvatar(avatarLink)
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //* Cards

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (card) => {
    const isOwn = card.owner._id === currentUser._id;
    if (isOwn) {
      api
        .deleteCard(card._id)
        .then(() =>
          setCards((state) => state.filter((c) => c._id !== card._id))
        )
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleAddPlaceSubmit = (newCard) => {
    api
      .addNewCard(newCard)
      .then((response) => {
        setCards([response, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // * Auth

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .checkTokenValidity(token)
        .then((response) => {
          if (response) {
            setUserEmail(response.data.email);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then(() => {
        history.push('/sign-in');
        setTooltipData({
          status: true,
          title: 'Вы успешно зарегистрировались!',
        });
      })
      .catch(() => {
        setTooltipData({
          status: false,
          title: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
      })
      .finally(() => {
        setIsTooltipOpen(true);
      });
  };

  const handleLogin = (email, password) => {
    auth
      .login(email, password)
      .then((response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          setUserEmail(email);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserEmail('');
    setLoggedIn(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header email={userEmail} handleLogout={handleLogout} />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            handleCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />

          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <Footer />

        <EditProfilePopup
          closeByOverlayClick={closeByOverlayClick}
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          closeByOverlayClick={closeByOverlayClick}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          closeByOverlayClick={closeByOverlayClick}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          closeByOverlayClick={closeByOverlayClick}
          onClose={closeAllPopups}
          name="confirmation"
          title="Вы уверены?"
          submitButtonText="Да"
        ></PopupWithForm>

        <ImagePopup
          closeByOverlayClick={closeByOverlayClick}
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          closeByOverlayClick={closeByOverlayClick}
          name="tooltip"
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
          status={tooltipData.status}
          title={tooltipData.title}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
