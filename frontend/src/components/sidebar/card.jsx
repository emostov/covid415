import React from 'react'
import { Redirect } from 'react-router-dom'
import '../../styles/card.scss'

class Card extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            active: false
        }

        this.clickHandler = this.clickHandler.bind(this)
        this.handleModal = this.handleModal.bind(this)
    }

    clickHandler(e) {
        e.preventDefault();
        
        let curActive = this.state.active;
        this.setState( { active: !curActive} )
    }

    handleModal(e) {
        e.stopPropagation()
        if (this.props.currentUserId) {
            this.props.openModal('status', this.props.task._id)
        } else {
            this.props.history.push('/login')
        }
    }

    render() {
        const { openModal, closeModal } = this.props;

        return (
            <div>
                {
                    this.state.active 
                    ?
                    (
                        <div className={'card-box-active'} onClick={this.clickHandler}>
                            <div className=''>
                                <div className={'card-head-active'}>
                                    0.1 Miles Away
                                </div>
                            </div>
                            <div className='card-box-top-container'>
                                <div className='card-box-task-type'>
                                    <div className='card-box-type-of-prop'>
                                        Task type:
                                    </div>
                                    <div className='card-box-task-content'>
                                        {this.props.task.type}
                                    </div> 
                                </div>
                                <div className={'card-body-active'}>
                                    {this.props.task.details}
                                </div>
                                <div className='card-address-active'>
                                    {this.props.task.deliveryAddress}
                                </div>
                            </div>
                            <div className='card-box-bottom-container'>
                                <div className='card-box-instructions-container'>
                                    <div className='card-box-type-of-prop'>
                                        Delivery Instructions:
                                    </div>
                                    <div className='instructions-body'>
                                        {this.props.task.deliveryInstructions}
                                    </div>
                                </div>
                                <div className='accept-button-container'>
                                    <button onClick={this.handleModal} className='accept-button'>Accept</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={'card-box'} onClick={this.clickHandler}>
                            <div className={'card-head'}>
                                0.1 Miles Away
                        </div>
                            <div className={'card-body'}>
                                {this.props.task.details}
                            </div>
                        </div>
                    )
                }
            </div>
            
        )
    }
}

export default Card;