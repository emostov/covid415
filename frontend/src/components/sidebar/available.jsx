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
            activeTask,
            receiveTaskDistanceInfo 
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
                                    currentPosition={currentPosition}
                                    receiveTaskDistanceInfo={receiveTaskDistanceInfo}/>
                    })
                }
            </div>
        )

    }
}

export default AvailableSidebar;