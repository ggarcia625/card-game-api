import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Cards() {
    const [deckId, setDeckId] = useState('');
    const [cardsDrawn, setCardsDrawn] = useState([]);
    const [isShuffling, setShuffle] = useState(false)
    

    useEffect(function(){
        async function getDeck(){
            const response = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            setDeckId(response.data.deck_id);
        }
        getDeck()
    }, [])

    async function drawCard() {
        const response = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        let newCard = response.data.cards[0];
        setCardsDrawn([newCard, ...cardsDrawn])
    }

    function updateShuffle() {
        setShuffle(true);
    }

    useEffect(function() {
        async function shuffleDeck() {
            const response = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
            setCardsDrawn([]);
            setShuffle(false);
        }
        if(isShuffling) {
            shuffleDeck();
        }
    }, [isShuffling])
    
    let cardImages = cardsDrawn.map(card => <img key={card.code} src={card.image}/>)
    console.log(cardsDrawn)
    return (
        <div>
            <button onClick={updateShuffle} disabled={isShuffling}>Shuffle</button>
            <button onClick={drawCard}>Draw card</button>
            {cardImages}
        </div>
    )
}


