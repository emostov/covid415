import React from 'react';

import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';


import Logo from '../../public/COVID415.png';
import SocialDistancing from '../../public/social_distancing.svg'
import HayesValley from '../../public/hayes_valley.png';
import Potrero from '../../public/potrero.png';

class InstructionModal extends React.Component {
    render() {
        return (
            <div className="modal-welcome-container">
                <div className="modal-welcome-heading">
                    <img src={ Logo } className='welcome-logo' alt="welcome-logo" />
                    <div className ='modal-welcome-header-text'>Neighbors helping neighbors affected by COVID-19 in San Francisco.</div>
                </div>
                <div className="modal-welcome-body">
                        <div className="welcome-section-1">
                            <div className="modal-body-header">How to help your neighbor:</div>
                            <div className="modal-body-text">View and claim a delivery request nearby.</div>
                            <img src={HayesValley} className='sample-card' alt="hayes-card" />
                            <button className="continue-button" onClick={() => this.props.openModal("instruction2")}>Continue </button>
                        </div>
                        <div className="welcome-section-2 nomobile">
                            <img src={SocialDistancing} className="modal-splash" alt="social-distancing" />
                            <div className="prototype-note">Please note: COVID-415 is currently in prototype. All requests are for demonstration purposes only.</div>
                        </div>
                </div>
            </div>
        )
    }
};


const mDTP = dispatch => ({
    openModal: modal => dispatch(openModal(modal))
});

export default connect(null, mDTP)(InstructionModal);