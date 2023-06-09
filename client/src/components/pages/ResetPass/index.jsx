import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ResetPass = () => {
  const { token } = useParams();
  const newPass = useState('');

  // Vai rolar um encode e decode aqui
  // Preciso pegar o email no back aqui pra realizar a operação
  // E é isso
  // Um beijo da Anitta

  return (
    <div>a</div>
  );
};

export default ResetPass;
