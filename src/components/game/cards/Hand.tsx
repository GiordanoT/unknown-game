import React from "react";
import {PGameHand} from "@/data/GameHand";
import Card from "@/components/game/cards/Card";

interface Props {hand: PGameHand}
function Hand(props: Props) {
    const hand = props.hand;

    return(<div className={'d-flex'}>
        {hand.gameCards.map((card, index) => {
            return(<div key={index} className={'ms-1'}>
                <Card card={card} />
            </div>);
        })}
    </div>);
}
export default Hand;
