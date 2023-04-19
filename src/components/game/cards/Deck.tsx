import React from "react";
import {PGameDeck} from "@/data/GameDeck";
import Card from "@/components/game/cards/Card";

interface Props {deck: PGameDeck}
function Deck(props: Props) {
    const deck = props.deck;


    return(<div className={'d-flex'}>
        {deck.gameCards.map((card, index) => {
            return(<div key={index} className={'ms-1'}>
                <Card card={card} />
            </div>);
        })}
    </div>);
}
export default Deck;
