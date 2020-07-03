import React from 'react';

import Logo from '../../public/COVID415.png';
import SocialDistancing from '../../public/social_distancing.svg'

const WelcomeModal = (props) => {
    const { openModal } = props;

    return (
        <div className='modal-welcome-container'>
            <div className='modal-welcome-heading'>
                <img src={Logo} className='welcome-logo' alt='welcome-logo' />
                <div className='modal-welcome-header-text'>Welcome, neighbor! Read below to learn how COVID-415 works.</div>
            </div>
            <div className='modal-welcome-body'>
                <div className='welcome-section-1'>
                    <div className='modal-body-header'>Self-isolating and need something?</div>
                    <div className='modal-body-text'>Request a delivery from a local volunteer.</div>
                    <div className='modal-body-header'>Want to help your neighbors?</div>
                    <div className='modal-body-text'>Sign up and deliver essential items to quarantined people nearby.</div>
                    <div className='modal-buttons'>
                        <button className='modal-button volunteer' onClick={() => openModal('instruction')}>Become a Volunteer</button>
                        <button className='modal-button delivery' onClick={() => openModal('instruction2')}>Request a Delivery</button>
                    </div>
                </div>
                <div className='welcome-section-2'>
                    <img src={SocialDistancing} className='modal-splash' alt='social-distancing' />
                    <div className='prototype-note'>Please note: COVID-415 is currently in prototype. All requests are for demonstration purposes only.</div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeModal;