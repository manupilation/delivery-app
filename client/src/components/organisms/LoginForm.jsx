import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/* State */
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/userSlice';

import {
  Button,
  ErrorMessage,
  Fieldset,
  HorizontalRule,
} from '../atoms';

import { TextInputLabel, ErrorMessageBox } from '../molecules';

/* Utils */
import {
  validateEmail,
  validatePassword,
} from '../../utils/validators';

import messages from '../../utils/messages';

/* Services */
import { loginRequest } from '../../services/request';

/* Styles */
import Form from '../atoms/Form';

/* Hooks */
import useFetch from '../../hooks/UseFetch';

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailErrVisible, setEmailErrVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordErrVisible, setPasswordErrVisible] = useState(false);
  const [loginErrVisible, setLoginErrVisible] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const {loading, error, request} = useFetch();

  // Enable Submit
  useEffect(() => {
    if (validateEmail(email) && validatePassword(password)) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [email, password]);

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {response: user} = await request(loginRequest, { email, password });

      if (user) {
        dispatch(setUser(user));

        localStorage.setItem('user', JSON.stringify({
          email,
          ...user,
        }));

        if (user.role === 'customer') {
          navigate('/customer/products');
        } else {
          navigate('/seller/orders');
        }
      }
    } catch (err) {
      setLoginErrVisible(true);
    }
  };

  return (
    <Form id="login-form" action="">
      {
        error && (
          <ErrorMessageBox
            id="user-not-found"
            dataTestId="common_login__element-invalid-email"
            message={messages.login.notFound }
          />
        )
      }
      <Fieldset id="control-group">
        <div>
          <TextInputLabel
            id="login-email-input"
            type="email"
            dataTestId="common_login__input-email"
            label="Email address"
            placeholder="Enter your email"
            value={ email }
            handleOnChange={ setEmail }
            handleOnBlur={
              () => setEmailErrVisible(!validateEmail(email))
            }
          />
          {
            emailErrVisible && (
              <ErrorMessage
                id="invalid-email-message"
                dataTestId="common_login__element-invalid-email"
                message={ messages.email.invalid }
              />
            )
          }
        </div>

        <div>
          <TextInputLabel
            id="login-password-input"
            type="password"
            dataTestId="common_login__input-password"
            label="Password"
            placeholder="Enter password"
            value={ password }
            handleOnChange={ setPassword }
            handleOnBlur={
              () => setPasswordErrVisible(!validatePassword(password))
            }
          />
          {
            passwordErrVisible && (
              <ErrorMessage
                id="invalid-password-message"
                dataTestId="common_login__element-invalid-password"
                message={ messages.password.invalid }
              />
            )
          }
        </div>
      </Fieldset>

      <div className="form__button-group">
        { loading ? (
          <Button
          id="loading-btn"
          type="button"
        >
          Carregando...
        </Button>
        ) : 
          (<Button
            id="login-btn"
            type="submit"
            dataTestId="common_login__button-login"
            handleOnClick={ (e) => handleSubmit(e) }
            disabled={ submitDisabled }
          >
            Login
          </Button>)
        }

        <HorizontalRule />

        <span className="form__link-message">
          Don&apos;t have an account?

          <Button
            id="sign-up-btn"
            type="button"
            dataTestId="common_login__button-register"
            link
          >
            <Link to="/register">Sign up</Link>
          </Button>
        </span>
        <span className="form__link-message">
          <Button
            type="button"
            link
          >
            <Link to="/lostPassword">Forgot your password?</Link>
          </Button>
        </span>
      </div>
    </Form>
  );
}
