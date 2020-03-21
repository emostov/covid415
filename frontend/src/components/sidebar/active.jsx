import React from 'react';
import { Link } from 'react-router-dom'
import Card from './card';

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
            receiveTaskDistanceInfo 
        } = this.props

        const currentUserTasks = active.filter(task => currentUserId === task.volunteer)
        
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
                                        receiveTaskDistanceInfo={receiveTaskDistanceInfo}/>
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