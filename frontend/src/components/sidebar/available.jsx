import React from 'react';
import Card from './card'

class AvailableSidebar extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        const { 
            currentUserId, 
            history, 
            available, 
            openModal, 
            closeModal, 
            currentPosition, 
            receiveActiveTaskId, 
            activeTask 
        } = this.props

        return (
            <div className='card-container-available'>
                {
                    available.map((task, i) => {
                        return <Card 
                                    key={`card-available-${i}`}
                                    cardType={'available'}
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
        )

    }
}

export default AvailableSidebar;