import React, { useState } from 'react';

import emailRegex from '../../utils/constants/emailRegex';
import { HorizontalRule, Button, Label, TextInput } from '.';
import { Link, useNavigate } from 'react-router-dom';
import { sendResetEmail } from '../../services/request';
import { ErrorMessageBox, SuccessMessageBox } from '../molecules';

const ResetPassForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [invalidMail, setInvalidMail] = useState(true);

  async function submitResetPass(event) {
    event.preventDefault();
    const localResetPassUrl = window.location.href.replace('/lostPassword', '/resetPass');
    const data = await sendResetEmail(email, localResetPassUrl);

    if(data.confirm === 'ok') {
      setSent(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      setError(true);
    }
  }

  function onChangeEmailInput(target) {
    setEmail(target.value);
    const testEmail = emailRegex.test(email);

    testEmail ? setInvalidMail(false) : setInvalidMail(true);
  }

  return (
    <form>
      <Label>
        Email address:
        <TextInput
          type="email"
          value={ email }
          onChange={ ({ target }) => onChangeEmailInput(target) }
          onBlur={ ({ target }) => onChangeEmailInput(target) }
        />
      </Label>

      { error && <ErrorMessageBox 
          id='send-email-error'
          dataTestId='send-email-error'
          message="Ocorreu algum erro. Tente novamente mais tarde."
        ></ErrorMessageBox> 
      }

      { sent && <SuccessMessageBox
          id='sent-email'
          message="Email enviado!"
        ></SuccessMessageBox> 
      }
      <Button
        type="submit"
        handleOnClick={submitResetPass}
        disabled={ invalidMail }
      >
        Enviar
      </Button>

      <HorizontalRule />

      <span className="form__link-message">
        Already have an account?
        <Button
          id="login-btn"
          type="button"
          link
        >
          <Link to="/login">Sign in</Link>
        </Button>
      </span>
    </form>
  );
};

export default ResetPassForm;
