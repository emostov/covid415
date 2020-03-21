import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import '../../styles/task_form.scss'

import Logo from '../../public/COVID415.png';
import SocialDistancing from '../../public/social_distancing.svg'
import HayesValley from '../../public/hayes_valley.png';
import Potrero from '../../public/potrero.png';
import MedicineRedCircle from '../../public/medicine_red_circle.png';
import FoodRedCircle from '../../public/groceries_red_circle.png';
import OtherRedCircle from '../../public/other_red_circle.png';

class WelcomeModal extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="modal-welcome-container">
                <div className="modal-welcome-heading">
                    <img src={ Logo } className='welcome-logo'></img>
                    Neighbors helping neighbors affected by COVID-19 in San Francisco.
                </div>
                <div className="modal-welcome-body">
                    {/* <div className="modal-welcome-section">
                        <div className="modal-body-header">
                            Self-isolating? */}
                        <div className="welcome-section-1">
                            <div className="modal-body-header">Self-isolating?</div>
                            <div className="modal-body-text">Request a delivery from a local volunteer.</div>
                            {/* <div className="deliv-type-container">
                                <img src={FoodRedCircle} className='welcome-deliv-type' />
                                <img src={MedicineRedCircle} className='welcome-deliv-type' />
                                <img src={OtherRedCircle} className='welcome-deliv-type' />
                            </div> */}<br />
                            <div className="modal-body-header">Want to help your neighbors?</div>
                            <div className="modal-body-text">Deliver essential items to quarantined people nearby.</div>
                            <img src={HayesValley} className='sample-card' />
                            <img src={Potrero} className='sample-card' />
                            <button className="complete-button">Continue </button>
                        </div>
                        <div className="welcome-section-2">
                            <img src={SocialDistancing} className="modal-splash"></img>
                        </div>    
                            {/* <div className="modal-body-sub-header">Request a delivery from a local volunteer.</div>
                        </div>
                    </div>
                    <div className="gutter"></div>
                    <div className="modal-welcome-section">
                        <div className="modal-body-header">
                            Want to help your neighbor?
                        </div> */}
                    {/* </div> */}
                </div>
            </div>
        )
    }
};

export default WelcomeModal;