import React from 'react';

/* State */
import { useSelector } from 'react-redux';

/* Children */
import { Table } from '../../molecules';
import { CheckoutForm } from '../../organisms';

/* Styles */
import { ClassicLayout } from '../../templates';
import Styled from './Styled';

/* Utils */
import formatFloat from '../../../utils/formatFloat';
import MetaHead from '../../helper/MetaHead';

export default function Checkout() {
  const { cart, totalPrice } = useSelector((state) => state.checkout);

  return (
    <ClassicLayout>
      <MetaHead
        title="Checkout your bag"
        description=""
      />
      <Styled>
        <Table
          body={
            cart.map((p) => ({
              ...p,
              price: formatFloat(p.price),
              subTotal: formatFloat(p.subTotal),
            }))
          }
          cols={ ['Name', 'Quantity', 'Unit Value', 'Sub-total', 'Remove Item'] }
          deleteItem
          sum={ formatFloat(totalPrice) }
          title="My order"
        />
        <CheckoutForm />
      </Styled>
    </ClassicLayout>
  );
}
