import { styled } from '../../stitches.config';

export default styled('div', {
  // display: 'flex',
  minHeight: '70vh',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  padding: '',

  background: '$gray100',

  '@bp3': {
    minWidth: '85%',
    margin: '2rem 0'
  },
});
