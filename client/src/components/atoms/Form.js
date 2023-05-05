import { styled } from '../../stitches.config';

export default styled('form', {
  display: 'flex',
  flexFlow: 'column nowrap',
  gap: '$4',

  '&>.form__button-group': {
    display: 'flex',
    flexFlow: 'column nowrap',
    gap: '$3',

    '&>.form__link-message': {
      alignItems: 'center',
      color: '$textDark',
      display: 'flex',
      flexFlow: 'row nowrap',
      fontFamily: '$sans',
      fontSize: '$2',
      fontWeight: '$5',
      gap: '$1',
      justifyContent: 'center',
    },
    '&>#loading-btn': {
      cursor: 'wait',
      opacity: '0.9',
    },
  },
});
