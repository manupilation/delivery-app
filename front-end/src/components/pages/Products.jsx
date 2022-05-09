import * as React from 'react';

/* Children */
import { Sidebar } from '../atoms';
import { Header } from '../molecules';
import { ProductCards } from '../organisms';

/* Styled */
import { styled } from '../../stitches.config';
import { getAllProducts } from '../../services/request';

const StitchesComponent = styled('div', {
  minHeight: '100vh',

  '&>.Container': {
    display: 'flex',
    paddingTop: '5rem',
    minHeight: '100vh',
  },
});

const Main = styled('div', {
  backgroundColor: '$gray100',
  position: 'relative',
  width: '100%',
  zIndex: '0',
});

const Products = () => {
  // const [authUser, setAuthUser] = useState(true);
  const [productsData, setProductsData] = React.useState([]);

  React.useEffect(() => {
    const user = localStorage.getItem('user');
    const token = JSON.parse(user);

    async function getData() {
      try {
        const getAll = await getAllProducts(token);
        setProductsData(getAll);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  return (
    <StitchesComponent id="products-page">
      {/* Header */}
      <Header />

      <div className="Container">
        <Sidebar />

        <Main>
          <ProductCards products={ productsData } />
        </Main>
      </div>

      {/* Footer */}
      <footer>
        <nav id="footer-nav" />
      </footer>
    </StitchesComponent>
  );
};

export default Products;
