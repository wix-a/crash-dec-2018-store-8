import React from 'react';
import { translate } from 'react-i18next';
import s from './App.scss';
import PropTypes from 'prop-types';
import ProductsList from '../ProductsList';
import { Router } from '@reach/router';
import AddProduct from '../AddProduct';
import Product from '../Product';
import Heading from 'wix-style-react/Heading';

const HomePage = () => <ProductsList />;
const ProductPage = ({ name }) => <Product productId={name} />;
const AddProductPage = () => <AddProduct />;

class App extends React.Component {
  state = {};
  static propTypes = {
    t: PropTypes.func,
  };

  render() {
    const { t } = this.props;

    return (
      <div className={s.root}>
        <Heading appearance="H1">Awesome team 8 store</Heading>
        <Router basepath="/crash-store-8">
          <HomePage path="/" />
          <ProductPage path="/product/:name" />
          <AddProductPage path="/new" />
        </Router>
      </div>
    );
  }
}

export default translate()(App);
