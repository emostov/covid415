import React from 'react'

class Card extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            active: false
        }

        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler(e) {
        e.preventDefault();
        console.log("the dolphin has landed")
        
        let curActive = this.state.active;
        this.setState( { active: !curActive} )
    }

    render() {
        console.log(this.state.active)
        return (
            <div className={this.state.active ? "card-box-active" : "card-box"} onClick={this.clickHandler}>
                <div className="card-head">
                    0.1 Miles Away
                </div>
                <div className="card-body">
                    {this.props.task.description}
                </div>
            </div>
        )
    }
}

export default Card;