import React, { useEffect } from 'react';

/* State */
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../../redux/features/ordersSlice';

/* Children */
import { OrderCards } from '../../organisms';

/* Utils */
import LocalStorageMethods from '../../../utils/localStorage';

/* Styles */
import { ClassicLayout } from '../../templates';
import Styled from './Styled';
import MetaHead from '../../helper/MetaHead';

export default function Orders() {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.orders);

  // Fetch Orders
  useEffect(() => {
    const user = LocalStorageMethods.getParsedItem('user');

    if (user) {
      dispatch(fetchOrders({ token: user.token, role: user.role }));
    }
  }, [dispatch]);

  return (
    <ClassicLayout>
      <MetaHead
        title="My orders"
        description="Check your order list."
      />
      <Styled>
        {
          orders.length
            ? <OrderCards orders={ orders } />
            : (
              <div className="Empty">
                <h2>{ 'You haven\'t placed an order yet!' }</h2>
              </div>
            )
        }
      </Styled>
    </ClassicLayout>
  );
}
