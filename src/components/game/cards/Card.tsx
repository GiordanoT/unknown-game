import React, {CSSProperties} from "react";
import {PCard} from "@/data/Card";

interface Props {card: PCard}
function Card(props: Props) {
    const card = props.card;

    const css: CSSProperties = {};
    if(card.faction.length === 1) css.background = card.faction[0];
    else {
        const color1 = card.faction[0];
        const color2 = card.faction[1];
        css.background = `linear-gradient(to right, ${color1} 0%, ${color1} 50%, ${color2} 50%, ${color2} 100%)`;
    }

    return(<div className={'game-card'} style={css} >
        <label className={'d-block text-center mb-1'}>{card.name}</label>
        <hr className={'m-0'} />
        <div className={'w-100 h-50'}>
            <img className={'h-100 w-100'} src={card.image} alt={'image'} draggable={false} />
        </div>
        <hr className={'m-0'} />
        <label className={'d-block text-center mt-1'}>
            <b>{card.atk}/{card.speed}/{card.hp}</b>
        </label>
    </div>);
}
export default Card;
