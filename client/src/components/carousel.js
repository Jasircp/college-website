import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

const ImageCarousel = () => {
  const importAll = (r) => {
    let images = {};
    r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
    return images;
  };

  const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
  return (
    <Carousel interval={3000} pause="hover">
      {Object.keys(images).map((key) => (
        <Carousel.Item key={key}>
          <img
            className="d-block w-100"
            src={images[key]}
            alt={key}
          />
          <div className="edit-button-container">
            <Link to="/imageupload"><button className="fa custom-button" >
            &#xf044;
            </button></Link>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
