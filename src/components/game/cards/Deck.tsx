import React from "react";
import {PGameDeck} from "@/data/GameDeck";

interface Props {deck: PGameDeck}
function Deck(props: Props) {
    const deck = props.deck;

    return(<div className={'game-card'}>
        {deck.gameCards.length}
    </div>);
}
export default Deck;
