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
    const image = <Image src={this.state.imageSrc} size={this.props.size} avatar />;
    return (
      image
    );
  }
}

ImageLoader.propTypes = {
  imageUrl: PropTypes.string,
  size: PropTypes.string,
};

ImageLoader.defaultProps = {
  imageUrl: undefined,
  size: undefined,
};

export default ImageLoader;
