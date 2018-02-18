import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import logo from '../../assets/logoCoin.png';

class ImageLoader extends Component {
  state = {
    imageSrc: logo,
  }

  componentDidMount() {
    const newSrc = this.props.imageUrl;
    this.setNewImage(newSrc);
  }

  setNewImage(src) {
    if (src) {
      this.setState({ imageSrc: src });
    }
  }

  render() {
    const image = <Image src={this.state.imageSrc} avatar />;
    return (
      image
    );
  }
}

ImageLoader.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default ImageLoader;
