import React from "react";
import {PCard} from "@/data/Card";

interface Props {card: PCard}
function Card(props: Props) {
    const card = props.card;

    return(<div className={'game-card'} style={{backgroundImage: card.image}} >
        <h5 className={'bg-white'}>{card.id}</h5>
        <h5 className={'bg-white'}>{card.name}</h5>
        <img className={'w-100 h-100'} src={card.image} draggable={false} />
    </div>);
}
export default Card;
