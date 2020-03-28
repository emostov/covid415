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

    


    const idSet = {}
    const u3 = []
    active.forEach((task) => {
      if(idSet[task._id] === undefined && task.volunteer === currentUserId){
        idSet[task._id] = true;
        u3.push(task)
      }
    })

    // let userTasksUnsorted = u3.filter(task => {
    //   if (currentUserId === task.volunteer){
    //     return true;
    //   }
    //   return false;
    // })
    let currentUserTasks = frontendUtil.sortDistances2(u3);
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
                      receiveNewTask={receiveNewTask}
                      activeTask={activeTask} />
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