import React from 'react';

import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';


import Logo from '../../public/COVID415.png';
import DeliveryForm from '../../public/delivery_form.png'

class InstructionModal2 extends React.Component {
    render() {
        return (
            <div className="modal-welcome-container">
                <div className="modal-welcome-heading">
                    <img src={ Logo } className='welcome-logo' alt="welcome-logo" />
                    <div className ='modal-welcome-header-text'>Neighbors helping neighbors affected by COVID-19 in San Francisco.</div>
                </div>
                <div className="modal-welcome-body">
                        <div className="welcome-section-1">
                            {/* <div className="modal-body-header">Self-isolating?</div>
                            <div className="modal-body-text">Request a delivery from a local volunteer.</div> */}
                            <div className="modal-body-header">How to request a delivery:</div>
                            <div className="modal-body-text">Log in, select 'Request a Delivery', and fill out the form.
                            <br /><br />
                                You'll be notified once a neighbor volunteers to deliver your items. </div>
                            
                            <button className="continue-button" onClick={() => this.props.closeModal()}>Continue </button>
                        </div>
                        <div className="welcome-section-2 nomobile">
                            <img src={DeliveryForm} className="modal-splash" alt="delivery-form" />
                        </div>    
                </div>
            </div>
        )
    }
};


const mDTP = dispatch => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(null, mDTP)(InstructionModal2);