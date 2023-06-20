import { styled } from '../../../stitches.config';

const ResetPassContainer = styled('main', {
  boxShadow: '0 0 10px 10px hsla(215, 0%, 80%, .2)',
  display: 'flex',
  flexFlow: 'column nowrap',
  gap: '$4',
  padding: '$6 $5',

  '&>h2': {
    color: '$textDark',
    fontFamily: '$sans2',
    fontSize: '$6',
    fontWeight: '$7',
  },

  '&>form': {
    display: 'flex',
    flexFlow: 'column',
    gap: '$4',

    '& label': {
      display: 'flex',
      flexFlow: 'column',
      width: '100%',
      gap: '$2',
    },
  },
});

export default ResetPassContainer;
