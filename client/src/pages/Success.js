import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  // get the cart from indexedDB
  useEffect(() => {
    async function saveOrder() {
      // access the idb cart
      const cart = await idbPromise('cat', 'get');
      // obtain all the product id's
      const products = cart.map((item) => item._id);
      // if there are products...
      if (products.length) {
        // perform the mutation to add the order
        const { data } = await addOrder({ variables: { products } });
        // then delete the ordered items from the idb
        const productData = data.addOrder.products;
        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }
      // redirect the user after 3 seconds
      setTimeout(() => {
        window.location.assign('/orderHistory');
      }, 3000);
    }
    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the homepage</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
