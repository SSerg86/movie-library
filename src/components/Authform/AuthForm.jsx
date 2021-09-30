import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import variables from '../../Var/variables';
import './authform.css';

import Alert from '../../components/Alert/Alert';
import AlertsContext from '../../context/alerts/alertsContext';
import AuthContext from '../../context/auth/authContext';

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const { alert, setAlert } = useContext(AlertsContext);
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // add validation
    setIsLoading(true);
    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${variables.API_KEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${variables.API_KEY}`;
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authContext.login(data.idToken);
        history.replace('/');
      })
      .catch((err) => {
        setAlert(' ' + err.message, 'danger');
      });
  };

  return (
    <>
      {alert ? <Alert message={alert.message} type={alert.type} /> : null}
      <section className="auth">
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={submitHandler}>
          <div className="auth__control">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className="auth__control">
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <div className="auth__actions">
            {!isLoading && (
              <button>{isLogin ? 'Login' : 'Create Account'}</button>
            )}
            {isLoading && <p>Sending request...</p>}
            <button
              type="button"
              className="auth__toggle"
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AuthForm;
