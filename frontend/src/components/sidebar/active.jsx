import React from 'react';
import Card from './card'

class ActiveSidebar extends React.Component {
    constructor(props) {
        super(props)

        this.handleReRoute = this.handleReRoute.bind(this);
    }

    handleReRoute(field) {

    }

    render() {
        const { currentUserId, history, active, openModal, closeModal } = this.props

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
                                        task={task}
                                        openModal={openModal}
                                        closeModal={closeModal}
                                        currentUserId={currentUserId}
                                        history={history} />
                                })
                            }
                        </div>
                    ) : (
                        <div className="card-container-demo">
                            <div className="card-demo-content">
                                You are currently not logged in. If you would like to be a volunteer 
                            </div>

                            <br/>

                            <div className="register-or-login">
                                <div onClick={this.handleReRoute}>
                                    Register 
                                </div>
                                    or
                                <div>
                                    Log In
                                </div> 
                            </div>
                        </div>
                    )
                }
            </div>
            
        )
    }
}

export default ActiveSidebar;