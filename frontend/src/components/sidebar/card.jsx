import React from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

import '../../styles/card.scss'

class Card extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false
    }

    this.clickHandler = this.clickHandler.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleCardHover = this.handleCardHover.bind(this);
    this.handleCardMouseLeave = this.handleCardMouseLeave.bind(this);
  }

  clickHandler(e) {
    e.preventDefault();
    let curActive = this.state.active;
    this.setState({ active: !curActive })
  }

  handleModal(e) {
    e.stopPropagation();
    if (this.props.currentUserId) {
      this.props.openModal('status', this.props.task._id)
    } else {
      this.props.history.push('/login')
    }
  }

  handleDirectionsClick(e) {
    e.stopPropagation();
  }

  handleCardHover(e) {
    e.stopPropagation();
    const { activeTask, task } = this.props;
    if (!activeTask || activeTask.taskId !== task._id) {
      this.props.receiveActiveTaskId(task._id);
    }
  }

  // On mouse leave set activeTask to null
  handleCardMouseLeave(e) {
    e.stopPropagation();
    const { activeTask, task } = this.props;
    if (activeTask && activeTask.taskId === task._id) {
      this.props.receiveActiveTaskId(null);
    }
  }

  render() {
    const { openModal, closeModal } = this.props;
    return (
      <div onMouseEnter={this.handleCardHover}
        onMouseLeave={this.handleCardMouseLeave}
      >
        {
          this.state.active
            ?
            (
              <div className="card-box-active" onClick={this.clickHandler}>
                <div className="card-header-container">
                    <FontAwesomeIcon className="fa-minus" icon={faMinus} />
                  <div className={"card-head-active"}>
                    0.1 Miles Away
                  </div>
                </div>
                <div className="card-box-top-container">
                  <div className="card-box-type-of-prop">Deliver to:
                    </div>
                    <div className="instructions-body">
                    <a className="card-address-link"
                      target="_blank"
                      href={`https://www.google.com/maps/dir/?api=1&destination=${this.props.task.deliveryAddress}`}
                      onClick={this.handleDirectionsClick}
                      >
                        { this.props.task.deliveryAddress }
                        <FontAwesomeIcon className="directions-external-link" icon={faExternalLinkAlt} />
                    </a>
                    </div>
                    <div className="card-box-type-of-prop">
                        Type:
                    </div>
                    <div className="instructions-body">
                      {this.props.task.type}
                    </div>
                    <div className="card-box-type-of-prop">
                        Details:
                    </div>
                    <div className="instructions-body">
                      {this.props.task.details}
                    </div>
                </div>
                <div className="card-box-bottom-container">
                  <div className="accept-button-container">
                    { this.props.cardType === 'available' ? 
                      <button onClick={this.handleModal} className="accept-button">I Can Help</button>
                      :
                      <button onClick={this.handleModal} className="complete-button">Delivery Details</button>
                    }
                  </div>
                </div>
              </div>
            ) : (
              <div className="card-box" onClick={this.clickHandler}>
                <div className="card-header-container">
                  <FontAwesomeIcon className="fa-plus" icon={faPlus} />
                <div className={"card-head"}>
                  0.1 Miles Away
                </div>
                </div>
                <div className={"card-body"}>
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