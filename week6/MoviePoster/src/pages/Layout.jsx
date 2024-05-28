import { Header, Footer } from '../components';
import PropTypes from 'prop-types';

const Layout = ({children}) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout