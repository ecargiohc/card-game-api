import React, {Component} from 'react';
import './Card.css'

class Card extends Component {
    constructor(props) {
        super(props);
        // transform: translate(10px, 20px) rotate(20deg);
        let randomAngle = Math.random() * 90-45;
        let xPos = Math.random() * 40-20;
        let yPos = Math.random() * 40-20;
        // with the this.underscore, we're adding the variable to the component itself!
        this._transform = `translate(${xPos}px, ${yPos}px) rotate(${randomAngle}deg)`;
        // console.log(transform)
    }
    render() {
        return(
            <img className="Card"
            src={this.props.image} 
            alt={this.props.name}
            style={{transform: this._transform}}
            />
        )
    }
}
export default Card;