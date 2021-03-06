import React from 'react';
import { translate } from 'react-i18next';
// import s from './AddProduct.scss';
import PropTypes from 'prop-types';
import Button from 'wix-style-react/Button';
import FormField from 'wix-style-react/FormField';
import Input from 'wix-style-react/Input';
import { navigate } from '@reach/router';
import axios from 'axios';
import debounce from 'debounce';
import s from './AddProduct.scss';

class AddProduct extends React.Component {
  static propTypes = {
    t: PropTypes.func,
  };
  state = {};

  handleCancel = () => {
    navigate('/crash-store-8', { replace: true });
  };

  handleChange({ name, description, price, img }) {
    this.setState({
      name: name || this.state.name,
      description: description || this.state.description,
      price: price || this.state.price,
      img: img || this.state.img,
    });
  }

  handleAdd = async () => {
    const { name, description, price, img } = this.state;
    // this.props.addProduct({ name, description, price, img });
    await axios.post('/api/products', { name, description, price, img });
    navigate('/crash-store-8', {
      state: { name, description, price, img },
      replace: true,
    });
  };

  handleImageChange = debounce(async term => {
    const { data: images } = await axios.get(
      `https://api.unsplash.com/search/photos?page=1&query=${term}&client_id=a5d4238f515992d21f853e054a976abdc2467ea35799c7fea1e208f78e8b0644`,
    );
    this.setState({ flickerImages: images.results.map(i => i.links.download) });
  }, 200);

  handleSelectImage = img => {
    this.setState({ img });
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <div>
          <h2>{t('product.add.title')}</h2>
        </div>
        <FormField label="name" required>
          <Input
            id="name"
            dataHook="name"
            placeholder="product name"
            onChange={e => this.handleChange({ name: e.target.value })}
          />
        </FormField>
        <FormField label="description">
          <Input
            id="description"
            dataHook="description"
            placeholder="product description"
            onChange={e => this.handleChange({ description: e.target.value })}
          />
        </FormField>
        <FormField label="price">
          <Input
            id="price"
            dataHook="price"
            placeholder="product price"
            onChange={e => this.handleChange({ price: e.target.value })}
          />
        </FormField>
        <FormField label="image">
          <Input
            id="img"
            dataHook="img"
            placeholder="product image"
            onChange={e => this.handleImageChange(e.target.value)}
          />
        </FormField>

        {this.state.flickerImages && (
          <div className={s.imagesContainer} data-hook="images">
            {this.state.flickerImages.map(url => (
              <div
                className={url === this.state.img && s.selected}
                onClick={() => this.handleSelectImage(url)}
                key={url}
                style={{ backgroundImage: `url("${url}")` }}
                alt={url}
              />
            ))}
          </div>
        )}

        <Button dataHook="add" onClick={this.handleAdd}>
          Add
        </Button>
        <Button
          dataHook="cancel"
          onClick={this.handleCancel}
          skin="destructive"
          upgrade
        >
          Cancel!
        </Button>
      </div>
    );
  }
}

export default translate()(AddProduct);
