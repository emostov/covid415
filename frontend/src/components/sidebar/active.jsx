import React from 'react';
import Card from './card'

class ActiveSidebar extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        const { currentUserId, history, active, openModal, closeModal } = this.props
        return (
            <div className='card-container'>
                {
                    active.map((task, i) => {
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
        )
    }
}

export default ActiveSidebar;