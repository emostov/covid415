import React from 'react';

import FoodRedCircle from '../public/groceries_red_circle.png';
import MedicineRedCircle from '../public/medicine_red_circle.png';
import OtherRedCircle from '../public/other_red_circle.png';

export const typeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'medicine':
        return <img className='card-type-img' src={MedicineRedCircle} alt="medicine-pic"/>;
      case 'food':
        return <img className='card-type-img' src={FoodRedCircle} alt="food-pic"/>;
      case 'other':
        return <img className='card-type-img' src={OtherRedCircle} alt="other-pic"/>;
      default:
        return null;
    }
};

export const typeIconString = (type) => {
    switch (type.toLowerCase()) {
      case 'medicine':
        return `<img class="card-type-img" src="${MedicineRedCircle}" alt="medicine-pic" />`;
      case 'food':
        return `<img class="card-type-img" src="${FoodRedCircle}" alt="food-pic" />`;
      case 'other':
        return `<img class="card-type-img" src="${OtherRedCircle}" alt="other-pic" />`;
      default:
        return null;
    }
};