import React from 'react';
import Card from './card'

class ActiveSidebar extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        const { active } = this.props
        return (
            <div className='card-container'>
                {
                    active.map((task, i) => {
                        return <Card 
                                    key={`card-active-${i}`}
                                    task={task}/>
                    })
                }
            </div>
        )
    }
}

export default ActiveSidebar;