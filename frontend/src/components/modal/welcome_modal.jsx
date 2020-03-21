import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import '../../styles/task_form.scss'

import Logo from '../../public/COVID415.png';
import SocialDistancing from '../../public/social_distancing.svg'
import Food from '../../public/groceries.png';
import Medicine from '../../public/medicine.png';
import Other from '../../public/other.png';
import keys from '../../config/keys_mapbox';

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
                        </div>
                        <div className="welcome-section-2">
                            <img src={SocialDistancing} className="modal-splash"></img>
                        </div>    
                        <div className="welcome-section-3"></div>
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