import React from 'react';
import banner1 from '../../../assets/Images/banner-img-1.jpg';
import banner2 from '../../../assets/Images/banner-img-2.jpg';
import banner3 from '../../../assets/Images/banner-img-3.jpg';
import banner4 from '../../../assets/Images/banner-img-4.jpg';

/**
 * @description Carousel display
 * @function carousel
 * @returns {JSX} jsx
 */
const carousel = () => (
  <div id="carouselrecipecontrol" className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators">
      <li data-target="carouselrecipecontrol" data-slide-to="0" className="active" />
      <li data-target="carouselrecipecontrol" data-slide-to="1" />
      <li data-target="carouselrecipecontrol" data-slide-to="2" />
      <li data-target="carouselrecipecontrol" data-slide-to="3" />
    </ol>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src={banner1} alt="recipe" className="d-bock w-100" />
      </div>
      <div className="carousel-item">
        <img src={banner4} alt="recipe" className="d-bock w-100" />
      </div>
      <div className="carousel-item">
        <img src={banner2} alt="recipe" className="d-bock w-100" />
      </div>
      <div className="carousel-item">
        <img src={banner3} alt="recipe" className="d-bock w-100" />
      </div>
      <a href="#carouselrecipecontrol" className="carousel-control-prev" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a href="#carouselrecipecontrol" className="carousel-control-next" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  </div>
);

export default carousel;

