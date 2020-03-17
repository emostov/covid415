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
        console.log(this.props)
        return (
            <div>
                {
                    this.state.active 
                    ?
                    (
                        <div className={"card-box-active"} onClick={this.clickHandler}>
                            <div className="card-box-top-container">
                                <div className={"card-head-active"}>
                                    0.1 Miles Away
                                </div>
                                <div className={"card-body-active"}>
                                    {this.props.task.details}
                                </div>
                                <div className="card-address-active">
                                    {this.props.task.deliveryAddress}
                                </div>
                            </div>
                            <div>
                                
                            </div>
                        </div>
                    ) : (
                        <div className={"card-box"} onClick={this.clickHandler}>
                            <div className={"card-head"}>
                                0.1 Miles Away
                        </div>
                            <div className={"card-body"}>
                                {this.props.task.details}
                            </div>
                        </div>
                    )
                }
            </div>
            
        )
    }
}

export default Card;