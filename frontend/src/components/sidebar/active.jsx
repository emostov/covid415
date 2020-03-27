import React from 'react';
import { Link } from 'react-router-dom'
import Card from './card';
import frontendUtil from '../../util/frontend_util'

class ActiveSidebar extends React.Component {

  render() {
    const {
      currentUserId,
      history,
      active,
      openModal,
      closeModal,
      currentPosition,
      receiveActiveTaskId,
      activeTask,
      receiveNewTask
    } = this.props

    

    let userTasksUnsorted = active.filter(task => currentUserId === task.volunteer)
    console.log('pre sort', userTasksUnsorted);
    let currentUserTasks = frontendUtil.sortDistances2(userTasksUnsorted);

    console.log('post sort', currentUserTasks);
    return (
      <div className="card-container">
        {
          this.props.session.isAuthenticated
            ?
            (
              <div className='card-container-2'>
                {
                  
                  currentUserTasks.map((task, i) => {
                    return <Card
                      key={`card-active-${i}`}
                      cardType={'active'}
                      task={task}
                      openModal={openModal}
                      closeModal={closeModal}
                      currentUserId={currentUserId}
                      history={history}
                      activeTask={activeTask}
                      receiveActiveTaskId={receiveActiveTaskId}
                      currentPosition={currentPosition}
                      receiveNewTask={receiveNewTask} />
                  })
                }
              </div>
            ) : (
              <div className="card-container-demo">
                <div className="card-demo-content">
                  <div className="head-demo">Hey Neighbor!</div>
                  <div className="card-demo-text">You must <Link to="/login">log in</Link> to view your deliveries.</div>
                  <br /><br />
                  <div className="head-demo">Want to be a volunteer?</div>
                  <div className="card-demo-text"><Link to="/signup">Sign up now</Link> and help keep the 415 alive.</div>
                </div>
              </div>
            )
        }
      </div>

    )
  }
}

export default ActiveSidebar;