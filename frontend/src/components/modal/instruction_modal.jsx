import React from 'react';

import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';


import Logo from '../../public/COVID415.png';
import SocialDistancing from '../../public/social_distancing.svg'
import HayesValley from '../../public/hayes_valley.png';
import Potrero from '../../public/potrero.png';
import TaskList from '../../public/tasklist.png'

class InstructionModal extends React.Component {
    render() {
        return (
            <div className="modal-welcome-container">
                <div className="modal-welcome-heading">
                    <img src={ Logo } className='welcome-logo' alt="welcome-logo" />
                    <div className ='modal-welcome-header-text'>Welcome, neighbor! Read below to learn how COVID-415 works.</div>
                </div>
                <div className="modal-welcome-body">
                        <div className="welcome-section-1">
                            <div className="modal-body-header">How to volunteer:</div>
                            <div className="modal-body-text">Sign up and browse delivery requests from neighbors nearby.</div>
                            <br />
                            <div className="modal-body-text">Once you've claimed a delivery, we'll share your neighbor's contact information so you can get in touch.</div>
                            <button className="continue-button" onClick={this.props.closeModal}>Continue </button>
                        </div>
                        <div className="welcome-section-2 nomobile">
                            <img src={TaskList} className="modal-splash" alt="task-map" />
                            <div className="prototype-note">Please note: COVID-415 is currently in prototype. All requests are for demonstration purposes only.</div>
                        </div>
                </div>
            </div>
        )
    }
};


const mDTP = dispatch => ({
    // openModal: modal => dispatch(openModal(modal))
    closeModal: () => dispatch(closeModal())
});

export default connect(null, mDTP)(InstructionModal);