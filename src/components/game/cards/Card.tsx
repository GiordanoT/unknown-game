import React, {CSSProperties} from "react";
import {Animate} from "react-simple-animate";
import {PGameCard} from "@/data/GameCard";
import {LAnimated} from "@/data/Animated";

interface Props {card: PGameCard}
function Card(props: Props) {
    const card = props.card;

    const hide = card.animation !== 'BlurIn';
    const start: CSSProperties = (!hide) ? {opacity: 0, filter: 'blur(10px)'} : {opacity: 1, filter: 'blur(0px)'};
    const end: CSSProperties = (!hide) ? {opacity: 1, filter: 'blur(0px)'} : {opacity: 0, filter: 'blur(10px)'};

    const css: CSSProperties = {};
    if(card.faction.length === 1) css.background = card.faction[0];
    else {
        const color1 = card.faction[0];
        const color2 = card.faction[1];
        css.background = `linear-gradient(to right, ${color1} 0%, ${color1} 50%, ${color2} 50%, ${color2} 100%)`;
    }

    return(<Animate play={true} duration={LAnimated.duration} start={start} end={end}>
        <div className={'game-card'} style={css} >
            <label className={'d-block text-center mb-1'}>{card.name}{card.animation}</label>
            <hr className={'m-0'} />
            <div className={'w-100 h-50'}>
                <img className={'h-100 w-100'} src={card.image} alt={'image'} draggable={false} />
            </div>
            <hr className={'m-0'} />
            <label className={'d-block text-center mt-1'}>
                <b>{card.atk}/{card.speed}/{card.hp}</b>
            </label>
        </div>
    </Animate>);
}
export default Card;
