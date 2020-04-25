import React from 'react';
import * as turf from '@turf/turf'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    this.handleActiveToggle = this.handleActiveToggle.bind(this);
    this.handleContinueClick = this.handleContinueClick.bind(this);
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

  handleActiveToggle(e) {
    e.preventDefault();
    const { activeTask, task } = this.props;
    // const curActive = this.state.active;
    const curActive = this.isCurrentTask();
    if (!curActive && (!activeTask || activeTask.taskId !== task._id)) {

      // Set to active task bc getting clicked on for first time
      this.props.receiveActiveTaskId(task._id);
    } else if (curActive && activeTask.taskId === task._id) {

      // The task is open and is the current active task so make it not
      this.props.receiveActiveTaskId(null);
    }
    this.setState({ active: !curActive })
  }

  handleContinueClick(e) {
    e.stopPropagation();
    const {
      currentUserId, task, receiveActiveTaskId, history, openModal,
    } = this.props;
    if (currentUserId && task.status === 0) {
      openModal('status', task._id)
    } else if (currentUserId && task.status === 1) {
      openModal('details', task._id)
    } else {
      history.push('/login')
    }
    receiveActiveTaskId(null)
  }

  isCurrentTask() {
    const { task, activeTask } = this.props;
    if (this.myRef.current && activeTask && task._id === activeTask.taskId) {
      this.myRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      // this.setState({active: true})
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
    if (this.isCurrentTask()) {
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
          this.isCurrentTask()
            ?
            (
              <div className="card-box-active" onClick={this.handleActiveToggle}>
                <div className="card-header-container">
                  <FontAwesomeIcon className="fa-minus" icon={faMinus} />
                  <div className={"card-head-active"}>
                    {this.displayMilesAway()}
                  </div>
                </div>
                <div className="card-box-top-container">
                  <div className="card-box-type-of-prop">Deliver to:
                  </div>
                  <div className="card-box-type-of-prop neighborhood">{this.props.task.deliveryNeighborhood}
                    <br />
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
                  <button onClick={this.handleContinueClick} className="accept-button">I Can Help</button>
                  :
                  <button onClick={this.handleContinueClick} className="complete-button">Delivery Details</button>
                }
              </div>
            ) : (
              <div className="card-box" onClick={this.handleActiveToggle}>
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