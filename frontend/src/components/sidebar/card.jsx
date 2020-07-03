import React, { useState, useEffect, useRef } from 'react';
import * as turf from '@turf/turf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'react-bootstrap';

import frontendUtil from '../../util/frontend_util';
import { typeIcon } from '../../util/card_icon_util';

import '../../styles/card.scss';

const Card = props => {
  const [active, setActive] = useState(false);
  const [distance, setDistance] = useState('');

  const myRef = useRef();

  const {
    currentPosition,
    activeTask,
    currentUserId,
    task,
    receiveActiveTaskId,
    history,
    openModal,
    receiveNewTask,
    cardType
  } = props;

  const isCurrentTask = () => {
    if (myRef.current && activeTask && task._id === activeTask.taskId) {
      myRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

      return true;
    }
    return false
  };

  const handleActiveToggle = () => {

    const curActive = isCurrentTask();

    if (!curActive && (!activeTask || activeTask.taskId !== task._id)) {

      // Set to active task bc getting clicked on for first time
      receiveActiveTaskId(task._id);
    } else if (curActive && activeTask.taskId === task._id) {

      // The task is open and is the current active task so make it not
      receiveActiveTaskId(null);
    }

    //might be meaningless code and we can get rid of the state in this component
    setActive(!curActive);
  }

  const handleContinueClick = () => {

    if (currentUserId && task.status === 0) {
      openModal('status', task._id);
    } else if (currentUserId && task.status === 1) {
      openModal('details', task._id);
    } else {
      history.push('/login');
    }

    receiveActiveTaskId(null)
  };

  const distanceFromCurrentToTask = () => {
    if (task === undefined) return null;
    if (currentPosition.length === 0) return null;

    const { latitude, longitude } = currentPosition.coords;

    let from = turf.point([longitude, latitude]);
    let to = turf.point([task.deliveryLatLong[1], task.deliveryLatLong[0]]);
    let options = { units: 'miles' };
    let distanceTo = turf.distance(from, to, options);
    const dist = frontendUtil.parseDistance(distanceTo);
    task['distance'] = dist;
    receiveNewTask(task);
  };

  const displayMilesAway = () => {
    if (task.distance === undefined) {
      return (<Spinner animation="grow" variant="light" />);
    }

    if (isCurrentTask()) {
      return `${task.distance} miles away`;
    } else {
      return `| ${task.distance} miles away`;
    }
  };

  // Equivalent to ComponentDidMount
  useEffect(() => {
    // distanceFromCurrentToTask();
    if (currentPosition !== null) {
      distanceFromCurrentToTask();
    }
  }, []);

  // Equivalent to ComponentDidupdate
  useEffect(() => {
    distanceFromCurrentToTask();
  }, [currentPosition]);

  return (
    <div
      className="card-box-container"
      ref={myRef}
      id={task._id}
    >
      {
        isCurrentTask()
          ?
          (
            <div className="card-box-active" onClick={() => handleActiveToggle()}>
              <div className="card-header-container">
                <FontAwesomeIcon className="fa-minus" icon={faMinus} />
                <div className={"card-head-active"}>
                  {displayMilesAway()}
                </div>
              </div>
              <div className="card-box-top-container">
                <div className="card-box-type-of-prop">
                  Deliver to:
                </div>
                <div className="card-box-type-of-prop neighborhood">{task.deliveryNeighborhood}
                  <br />
                </div>
                <div className="card-box-type-of-prop">
                  Type:
                </div>
                <div className="instructions-body">
                  {task.type}
                </div>
                <div className="card-box-type-of-prop">
                  Details:
                </div>
                <div className="instructions-body">
                  {task.details}
                </div>
              </div>
              {cardType === 'available' ?
                <button onClick={() => handleContinueClick()} className="accept-button">I Can Help</button>
                :
                <button onClick={() => handleContinueClick()} className="complete-button">Delivery Details</button>
              }
            </div>
          ) : (
            <div className="card-box" onClick={() => handleActiveToggle()}>
              <div className="card-header-container">
                <FontAwesomeIcon className="fa-plus" icon={faPlus} />
                <div className={"card-head"}>
                  {task.deliveryNeighborhood} {displayMilesAway()}
                </div>
              </div>
              <div className="card-footer-container">
                <div className="card-task-type-text">{task.type}</div>
                <div>{typeIcon(task.type.toLowerCase(), task.status)}</div>
              </div>
            </div>
          )
      }
    </div>

  )
}

export default Card;