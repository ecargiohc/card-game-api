import React, {Component} from 'react';
import Card from './Card';
import './Deck.css';
import axios from 'axios';
const API_BASE_URL = "https://www.deckofcardsapi.com/api/deck";

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: null,
            // we need to store what we got from api:
            drawn: []
        }
        this.getCard = this.getCard.bind(this)
    };

    async componentDidMount() {
        let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
        this.setState({deck: deck.data})
    };

    async getCard() {
        let deck_id = this.state.deck.deck_id;
        try {
            let cardURL = `${API_BASE_URL}/${deck_id}/draw/`;
            let cardResponse = await axios.get(cardURL);
            if (!cardResponse.data.success) {
                throw new Error("no card remaining :(")
            }
        console.log(cardResponse.data);
        let card = cardResponse.data.cards[0];
        this.setState(st => ({
            drawn: [
                ...st.drawn, 
            {id: card.code, 
            image: card.image,
            name: `${card.value} of ${card.suit}`}
                ]
            }));
        } catch (err) {
            alert(err);
        }
    };

    render() {
        const mapCards = this.state.drawn.map(c => (
            <Card 
            key={c.id}
            image={c.image}
            name={c.name}
            />
        ))
        return(
            <div className="Deck">
                 <button onClick={this.getCard}>Get Card!</button>
                <h1 className="Deck-title">Card Dealer</h1>
                <h2 className="Deck-title subtitle">demo made with react</h2>
                <div className="Deck-cardarea">{mapCards}</div>
            </div>
        )
    }
}
export default Deck;