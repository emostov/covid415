import React from 'react';
import * as turf from '@turf/turf'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'react-bootstrap';

import frontendUtil from '../../util/frontend_util';
import { typeIcon } from '../../util/card_icon_util';

import '../../styles/card.scss'

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      distance: ''
    }
    this.myRef = React.createRef()
    this.clickHandler = this.clickHandler.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.distanceFromCurrentToTask = this.distanceFromCurrentToTask.bind(this)
  }

  componentDidMount() {
    this.distanceFromCurrentToTask();
    if (this.props.currentPosition !== null) {
      this.distanceFromCurrentToTask();
    }
  }

  componentDidUpdate(prevProps) {

    // Make sure to compare props to prevent infinit loop
    if (this.props.currentPosition !== prevProps.currentPosition) {

      // recalculate distance
      this.distanceFromCurrentToTask();
    }
  }

  clickHandler(e) {
    e.preventDefault();
    const { activeTask, task } = this.props;
    let curActive = this.state.active;
    if (!curActive && (!activeTask || activeTask.taskId !== task._id)){

      // Set to active task bc getting clicked on for first time
      this.props.receiveActiveTaskId(task._id);
    } else if (curActive && activeTask.taskId === task._id) {

      // The task is open and is the current active task so make it not
      this.props.receiveActiveTaskId(null);
    }
    this.setState({ active: !curActive })
  }

  handleModal(e) {
    e.stopPropagation();
    if (this.props.currentUserId && this.props.task.status === 0) {
      this.props.openModal('status', this.props.task._id)
    } else if (this.props.currentUserId && this.props.task.status === 1) {
      this.props.openModal('details', this.props.task._id)
    } else {
      this.props.history.push('/login')
    }
  }

  isCurrentTask() {
    const { task, activeTask } = this.props;
    if (activeTask && task._id === activeTask.taskId) {
      this.myRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return true;
    }
    return false;
  }

  handleDirectionsClick(e) {
    e.stopPropagation();
  }

  distanceFromCurrentToTask() {
    const { task, currentPosition } = this.props
    if (this.props.task === undefined) {
      return null
    }
    if (currentPosition.length === 0) {
      return null
    }
    const { latitude, longitude } = currentPosition.coords;

    let from = turf.point([longitude, latitude])
    let to = turf.point([task.deliveryLatLong[1], task.deliveryLatLong[0]])
    let options = { units: 'miles' }
    let distanceTo = turf.distance(from, to, options)
    const dist = frontendUtil.parseDistance(distanceTo)
    task['distance'] = dist
    this.props.receiveNewTask(task)
  }

  displayMilesAway() {
    const { task } = this.props
    if (task.distance === undefined) {
      return (<Spinner animation="grow" variant="light" />);
    }
    if (this.state.active) {
      return `${task.distance} miles away`;
    } else {
      return `| ${task.distance} miles away`;
    }
  }

  render() {
    const { task } = this.props
    return (
      <div 
        className="card-box-container"
        ref={this.myRef}
        id={task._id}
      >
        {
          this.state.active || this.isCurrentTask()
            ?
            (
              <div className="card-box-active" onClick={this.clickHandler}>
                <div className="card-header-container">
                  <FontAwesomeIcon className="fa-minus" icon={faMinus} />
                  <div className={"card-head-active"}>
                    {this.displayMilesAway()}
                  </div>
                </div>
                <div className="card-box-top-container">
                  <div className="card-box-type-of-prop">Deliver to:
                  </div>
                  <div className="card-box-type-of-prop">{this.props.task.deliveryNeighborhood}
                  </div>
                  <div className="instructions-body">
                    <a className="card-address-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.google.com/maps/dir/?api=1&destination=${this.props.task.deliveryAddress}`}
                      onClick={this.handleDirectionsClick}
                    >
                      {this.props.task.deliveryAddress}
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
                {this.props.cardType === 'available' ?
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
                    {this.props.task.deliveryNeighborhood} {this.displayMilesAway()}
                  </div>
                </div>
                <div className="card-footer-container">
                  <div className="card-task-type-text">{this.props.task.type}</div>
                  <div>{typeIcon(this.props.task.type.toLowerCase(), this.props.task.status)}</div>
                </div>
              </div>
            )
        }
      </div>

    )
  }
}

export default Card;