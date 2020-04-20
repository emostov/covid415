import React from 'react';

import Logo from '../../public/COVID415.png';
import SocialDistancing from '../../public/social_distancing.svg'
// import HayesValley from '../../public/hayes_valley.png';
// import Potrero from '../../public/potrero.png';

class WelcomeModal extends React.Component {
    render() {
        return (
            <div className="modal-welcome-container">
                <div className="modal-welcome-heading">
                    <img src={ Logo } className='welcome-logo' alt="welcome-logo" />
                    <div className ='modal-welcome-header-text'>Neighbors helping neighbors affected by COVID-19 in San Francisco.</div>
                </div>
                <div className="modal-welcome-body">
                        <div className="welcome-section-1">
                            <div className="modal-body-header">Self-isolating?</div>
                            <div className="modal-body-text">Request a delivery from a local volunteer.</div>
                            <div className="modal-body-header">Want to help your neighbors?</div>
                            <div className="modal-body-text">Deliver essential items to quarantined people nearby.</div>
                            {/* <img src={HayesValley} className='sample-card' alt="hayes-card" /> */}
                            {/* <img src={Potrero} className='sample-card' alt="potrero-card"  /> */}
                            <button className="continue-button" onClick={() => this.props.openModal("instruction")}>Continue </button>
                        </div>
                        <div className="welcome-section-2">
                            <img src={SocialDistancing} className="modal-splash" alt="social-distancing" />
                            <div className="prototype-note">Please note: COVID-415 is currently in prototype. All requests are for demonstration purposes only.</div>
                        </div>
                </div>
            </div>
        )
    }
};

export default WelcomeModal;