import React from 'react';

import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';


import Logo from '../../public/COVID415.png';
import DeliveryForm from '../../public/delivery_form.png';

const InstructionModal2 = (props) => {
    
    const { closeModal } = props;

    return (
        <div className='modal-welcome-container'>
            <div className='modal-welcome-heading'>
                <img src={Logo} className='welcome-logo' alt='welcome-logo' />
                <div className='modal-welcome-header-text'>Welcome, neighbor! Read below to learn how COVID-415 works.</div>
            </div>
            <div className='modal-welcome-body'>
                <div className='welcome-section-1'>
                    <div className='modal-body-header'>How to request a delivery:</div>
                    <div className='modal-body-text'>Log in, select 'Request a Delivery', and fill out the form.
                            <br /><br />
                                You'll be notified once a neighbor volunteers to deliver your items. </div>
                    <button className='continue-button' onClick={() => closeModal()}>Continue </button>
                </div>
                <div className='welcome-section-2 nomobile'>
                    <img src={DeliveryForm} className='modal-splash' alt='delivery-form' />
                    <div className='prototype-note'>Please note: COVID-415 is currently in prototype. All requests are for demonstration purposes only.</div>
                </div>
            </div>
        </div>
    )
}


const mDTP = dispatch => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(null, mDTP)(InstructionModal2);