import React from 'react';
import Card from './card'

class AvailableSidebar extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        const { available, openModal, closeModal } = this.props
        console.log(available)
        return (
            <div className='card-container'>
                {
                    available.map((task, i) => {
                        return <Card 
                                    key={`card-available-${i}`}
                                    task={task}
                                    openModal={openModal}
                                    closeModal={closeModal} />
                    })
                }
            </div>
        )
    }
}

export default AvailableSidebar;