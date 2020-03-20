import React from 'react';
import { Link } from 'react-router-dom'

import Card from './card';

class ActiveSidebar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { 
            currentUserId, 
            history, 
            active, 
            openModal, 
            closeModal, 
            currentPosition, 
            receiveActiveTaskId,
            activeTask 
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
                                        currentPosition={currentPosition}/>
                                })
                            }
                        </div>
                    ) : (
                        <div className="card-container-demo">
                            <div className="card-demo-content">
                                Welcome! <br/>
                                You are currently not logged in. If you would like to be a volunteer 
                            </div>

                            <br/>

                            <div className="register-or-login">
                                <Link to="/signup">
                                    Sign up 
                                </Link>
                                <div className="middle-statement">
                                    or if you're already a volunteer
                                </div>
                                <Link to="/login">
                                    Log In
                                </Link> 
                            </div>
                        </div>
                    )
                }
            </div>
            
        )
    }
}

export default ActiveSidebar;