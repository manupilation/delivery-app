import React from 'react';
import PropTypes from 'prop-types';

/* Children */
import { Label } from '../../atoms';
import TableBody from '../TableBody';
import TableFooter from '../TableFooter';

/* Styled */
import Styled from './Styled';

export default function Table({ data }) {
  return (
    <Styled>
      <caption>My order</caption>

      <thead>
        <tr>
          {
            data.header.map((heading) => (
              <td
                id={ `${heading.toLowerCase()}-column` }
                key={ heading }
              >
                <Label>{ heading }</Label>
              </td>
            ))
          }
        </tr>
      </thead>

      <TableBody data={ data.body } />

      <TableFooter data={ data.footer } />
    </Styled>
  );
}

Table.propTypes = {
  data: PropTypes.shape({
    header: PropTypes.arrayOf(PropTypes.string),
    body: PropTypes.arrayOf(PropTypes.string),
    footer: PropTypes.arrayOf(PropTypes.string),
  }),
}.isRequired;
