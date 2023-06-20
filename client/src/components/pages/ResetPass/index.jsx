import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ResetPassContainer from './Styled';
import { Button, Label, TextInput } from '../../atoms';
import MetaHead from '../../helper/MetaHead';
import CenterBox from '../../templates/CenterBox';

const ResetPass = () => {
  const { token } = useParams();
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');

  function onChangePass(target) {
    setNewPass(target.value);
  }

  function onChangeConfirmPass(target) {
    setConfirmNewPass(target.value);
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
            handleOnClick={() => {}}
            disabled={!(newPass.length < 5) && newPass !== confirmNewPass }
          >
            Enviar
          </Button>
        </form>
      </ResetPassContainer>
    </CenterBox>
  );
};

export default ResetPass;
