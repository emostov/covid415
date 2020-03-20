import React from 'react';

import FoodRedCircle from '../public/groceries_red_circle.png';
import MedicineRedCircle from '../public/medicine_red_circle.png';
import OtherRedCircle from '../public/other_red_circle.png';
import FoodPeachCircle from '../public/groceries_peach_circle.png';
import MedicinePeachCircle from '../public/medicine_peach_circle.png';
import OtherPeachCircle from '../public/other_peach_circle.png';
import FoodGreenCircle from '../public/groceries_green_circle.png';
import MedicineGreenCircle from '../public/medicine_green_circle.png';
import OtherGreenCircle from '../public/other_green_circle.png';

export const typeIcon = (type, status) => {
    if (status === 0) {
        if (type === 'medicine') {
            return <img className='card-type-img' src={MedicineRedCircle} alt='medicine-pic'/>;
        } else if (type === 'food') {
            return <img className='card-type-img' src={FoodRedCircle} alt='food-pic'/>;
        } else if (type === 'other') {
            return <img className='card-type-img' src={OtherRedCircle} alt='other-pic'/>;
        }
    } else if (status === 1) {
        if (type === 'medicine') {
            return <img className='card-type-img' src={MedicinePeachCircle} alt='medicine-pic'/>;
        } else if (type === 'food') {
            return <img className='card-type-img' src={FoodPeachCircle} alt='food-pic'/>;
        } else if (type === 'other') {
            return <img className='card-type-img' src={OtherPeachCircle} alt='other-pic'/>;
        }
    } else if (status === 2) {
        if (type === 'medicine') {
            return <img className='card-type-img' src={MedicineGreenCircle} alt='medicine-pic'/>;
        } else if (type === 'food') {
            return <img className='card-type-img' src={FoodGreenCircle} alt='food-pic'/>;
        } else if (type === 'other') {
            return <img className='card-type-img' src={OtherGreenCircle} alt='other-pic'/>;
        }
    }
}

// export const typeIconString = (type) => {
//     switch (type.toLowerCase()) {
    //   case 'medicine':
    //     return `<img class="card-type-img-map" src="${MedicineRedCircle}" alt="medicine-pic" />`;
    //   case 'food':
    //     return `<img class="card-type-img-map" src="${FoodRedCircle}" alt="food-pic" />`;
    //   case 'other':
    //     return `<img class="card-type-img-map" src="${OtherRedCircle}" alt="other-pic" />`;
//       default:
//         return null;
//     }
// };

export const typeIconString = (type, status) => {
    if (status === 0) {
        if (type === 'medicine') {
            return `<img class="card-type-img-map" src="${MedicineRedCircle}" alt="medicine-pic" />`;
        } else if (type === 'food') {
            return `<img class="card-type-img-map" src="${FoodRedCircle}" alt="food-pic" />`;
        } else if (type === 'other') {
            return `<img class="card-type-img-map" src="${OtherRedCircle}" alt="other-pic" />`;
        }
    } else if (status === 1) {
        if (type === 'medicine') {
            return `<img class="card-type-img-map" src="${MedicinePeachCircle}" alt="medicine-pic" />`;
        } else if (type === 'food') {
            return `<img class="card-type-img-map" src="${FoodPeachCircle}" alt="food-pic" />`;
        } else if (type === 'other') {
            return `<img class="card-type-img-map" src="${OtherPeachCircle}" alt="other-pic" />`;
        }
    } else if (status === 2) {
        if (type === 'medicine') {
            return `<img class="card-type-img-map" src="${MedicineGreenCircle}" alt="medicine-pic" />`;
        } else if (type === 'food') {
            return `<img class="card-type-img-map" src="${FoodGreenCircle}" alt="food-pic" />`;
        } else if (type === 'other') {
            return `<img class="card-type-img-map" src="${OtherGreenCircle}" alt="other-pic" />`;
        }
    }
};

export const statusPopupClass = (status) => {
    switch (status) {
        case 0:
            return "popup-avail"
        case 1:
            return "popup-active"
        case 2:
            return "popup-done"
        default:
            break;
    }
};