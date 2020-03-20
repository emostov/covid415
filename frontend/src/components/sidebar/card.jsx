import React from 'react';
import { Redirect } from 'react-router-dom';
import * as turf from '@turf/turf'
import { distance } from '@turf/distance'
import { point } from '@turf/distance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

import FoodRedCircle from '../../public/groceries_red_circle.png';
import MedicineRedCircle from '../../public/medicine_red_circle.png';
import OtherRedCircle from '../../public/other_red_circle.png';
import frontendUtil from '../../util/frontend_util';


import '../../styles/card.scss'

class Card extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: false,
      distance: ''
    }

    this.clickHandler = this.clickHandler.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleCardHover = this.handleCardHover.bind(this);
    this.handleCardMouseLeave = this.handleCardMouseLeave.bind(this);
    this.cardTypeIcon = this.cardTypeIcon.bind(this);
    this.distanceFromCurrentToTask = this.distanceFromCurrentToTask.bind(this)
  }

  componentDidMount() {
    this.distanceFromCurrentToTask();
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

  cardTypeIcon() {
    switch (this.props.task.type.toLowerCase()) {
      case 'medicine':
        return <img className='card-type-img' src={MedicineRedCircle} alt="medicine-pic"/>;
      case 'food':
        return <img className='card-type-img' src={FoodRedCircle} alt="medicine-pic"/>;
      case 'other':
        return <img className='card-type-img' src={OtherRedCircle} alt="medicine-pic"/>;
      default:
        return null;
  }}
      
  distanceFromCurrentToTask() {
    const { task, currentPosition } = this.props
    if (this.props.task.deliveryLatLong === undefined) {
      return null
    }
    if (currentPosition.length === 0) {
      return null
    }
    // debugger
    let from = turf.point([currentPosition[1], currentPosition[0]])
    let to = turf.point([task.deliveryLatLong[1], task.deliveryLatLong[0]])
    let options = { units: 'miles' }

    let distanceTo = turf.distance(from, to, options)
    const dist = frontendUtil.parseDistance(distanceTo)
    // debugger
    this.setState({distance: dist})
  }

  render() {
    const { openModal, closeModal } = this.props;
    // debugger
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
                    {`${this.state.distance} miles away`}
                  </div>
                </div>
                <div className="card-box-top-container">
                  <div className="card-box-type-of-prop">Deliver to:
                  </div>
                  <div className="card-box-type-of-prop">{ this.props.task.deliveryNeighborhood }
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
                  { this.props.cardType === 'available' ? 
                    <button onClick={this.handleModal} className="accept-button">I Can Help</button>
                    :
                    <button onClick={this.handleModal} className="complete-button">Delivery Details</button>
                  }
                  </div>
            ) : (
              <div className="card-box" onClick={this.clickHandler}>
                <div className="card-header-container">
                  <FontAwesomeIcon className="fa-plus" icon={faPlus} />
                  <div className={"card-head"}>
                  { this.props.task.deliveryNeighborhood } - {`${this.state.distance} miles away`}
                  </div>
                </div>
                <div className="card-footer-container">
                  <div className="card-task-type-text">{ this.props.task.type }</div>
                  <div>{ this.cardTypeIcon() }</div>
                </div>
              </div>
            )
        }
      </div>

    )
  }
}

export default Card;