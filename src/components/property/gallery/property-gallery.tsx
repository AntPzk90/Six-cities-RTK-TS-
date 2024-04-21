import React from 'react';

interface IProps {
  images: string[]
}

function PropertyGallery({images}: IProps): JSX.Element {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images.slice(0, 6).map((imageUrl) => (
          <div className="property__image-wrapper" key={imageUrl}>
            <img
              className="property__image"
              src={imageUrl}
              alt="place"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyGallery;
