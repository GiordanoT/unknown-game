import React, {CSSProperties} from "react";
import {Animate} from "react-simple-animate";
import {PGameCard} from "@/data/GameCard";
import {LAnimated} from "@/data/Animated";
import {U} from "@/utils/functions";
import {UCard} from "@/utils/functions/card";

interface Props {card: PGameCard, hidden?: boolean}
function Card(props: Props) {
    const card = props.card;
    const hidden = !!props.hidden;

    const animation = U.getAnimation(card.animation);
    const css: CSSProperties = {};
    if(card.faction.length === 1) css.background = card.faction[0];
    else {
        const color1 = card.faction[0];
        const color2 = card.faction[1];
        css.background = `linear-gradient(to right, ${color1} 0%, ${color1} 50%, ${color2} 50%, ${color2} 100%)`;
    }

    if(hidden) {
        return(<Animate play={true} duration={LAnimated.duration} start={animation.start} end={animation.end}>
            <div className={'game-card position-absolute'}>
                <img className={'h-100 w-100'} src={'https://cdn5.f-cdn.com/contestentries/342444/7309306/56b791c9efbd8_thumb900.jpg'} alt={'image'} draggable={false} />
            </div>
        </Animate>);
    } else {
        return(<Animate play={true} duration={LAnimated.duration} start={animation.start} end={animation.end}>
            <div className={'game-card'} style={css} onClick={() => UCard.converter(card).play}>
                <label className={'d-block text-center mb-1'}>{card.name}</label>
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
}
export default Card;
