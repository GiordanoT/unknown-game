import React from "react";
import {PGameDeck} from "@/data/GameDeck";
import Card from "@/components/game/cards/Card";

interface Props {deck: PGameDeck}
function Deck(props: Props) {
    const deck = props.deck;


    return(<div className={'d-flex position-absolute bottom-o'}>
        {deck.gameCards.map((card, index) => {
            return(<div key={index} style={{marginLeft: '0.2rem'}}>
                <Card card={card} hidden={true} />
            </div>);
        })}
    </div>);
}
export default Deck;
