import React from "react";
import {PCard} from "@/data/Card";

interface Props {card: PCard}
function Card(props: Props) {
    const card = props.card;

    return(<div className={'game-card'} style={{backgroundImage: card.image}} >
        <img className={'w-100 h-100'} src={card.image} draggable={false} />
    </div>);
}
export default Card;
