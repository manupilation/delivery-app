import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ResetPassContainer from './Styled';
import { Button, Label, TextInput } from '../../atoms';
import MetaHead from '../../helper/MetaHead';
import CenterBox from '../../templates/CenterBox';
import { sendResetPassword } from '../../../services/request';
import { ErrorMessageBox, SuccessMessageBox } from '../../molecules';

const ResetPass = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');
  const [visibleError, setVisibleError] = useState(false);
  const [success, setSuccess] = useState(false);

  function onChangePass(target) {
    setNewPass(target.value);
  }

  function onChangeConfirmPass(target) {
    setConfirmNewPass(target.value);
  }

  async function fetchNewPassword(event) {
    event.preventDefault();
    try {
      const reset = await sendResetPassword(token, newPass);
      if(reset.confirm === 'ok') {
        setSuccess(true);
      }
    } catch(err) {
      setVisibleError(true);
    } finally {
      setTimeout(() => {
        navigate('/login');
      }, 4000);
    }

  }

  return (
    <CenterBox>
      <MetaHead
        title="Define your new password"
        description="Lost or forgot your password?"
      />
      <ResetPassContainer>
        <h2>Define your new password:</h2>
        <form>
          <Label>
            Enter your new password:
            <TextInput
              type="password"
              value={ newPass }
              onChange={ ({ target }) => onChangePass(target) }
              onBlur={ ({ target }) => onChangePass(target) }
            />
          </Label>
          <Label>
            Confirm your new password:
            <TextInput
              type="password"
              value={ confirmNewPass }
              onChange={ ({ target }) => onChangeConfirmPass(target) }
              onBlur={ ({ target }) => onChangeConfirmPass(target) }
            />
          </Label>
          <Button
            type="submit"
            handleOnClick={fetchNewPassword}
            disabled={!(newPass.length > 5) || (newPass !== confirmNewPass)}
          >
            Enviar
          </Button>
          { visibleError && <ErrorMessageBox message='Error: Invalid or expired token'></ErrorMessageBox> }
          { success && <SuccessMessageBox message='Everything worked!'></SuccessMessageBox> }
        </form>
      </ResetPassContainer>
    </CenterBox>
  );
};

export default ResetPass;
