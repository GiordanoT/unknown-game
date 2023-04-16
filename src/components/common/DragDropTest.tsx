import React from 'react';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {useDrag, useDrop} from "react-dnd";
import {DUser, LUser} from "@/data/User";
import {FirebaseAction} from "@/firebase/actions";
import {DCard, LCard} from "@/data/Card";


export function TestComponent(props: AllProps) {

    const [{isDragging}, drag] = useDrag(() => ({
        type: 'card',
        item: LUser.new({name: 'pippo'} as DUser),
        collect: (monitor) => ({isDragging: monitor.isDragging()})
    }));

    const [{isOver1}, drop1] = useDrop(() => ({
        accept: 'card',
        collect: (monitor) => ({isOver1: monitor.isOver()}),
        drop: (user: LUser) => {
            console.log(user.name)
        },
    }));
    const [{isOver2}, drop2] = useDrop(() => ({
        accept: 'card',
        collect: (monitor) => ({isOver2: monitor.isOver()}),
        drop: (user: LUser) => {
            console.log(user.name)
        },
    }));

    let css1 = 'bg-primary'; let css2 = 'bg-primary';
    if(isDragging) {
        if(isOver1) css1 = 'bg-success';
        else css1 = 'bg-danger';
        if(isOver2) css2 = 'bg-success';
        else css2 = 'bg-danger';
    }

    const add = async() => {
        const dCard: DCard = {
            name: 'Centauro Guaritore',
            image: '',
            class: 'Beast',
            faction: ['White', 'Green'],
            level: 2,
            atk: 3,
            hp: 3,
            speed: 2
        };
        const card = LCard.new(dCard);
        await FirebaseAction.add(card.raw);

    }

    return(<div className={'d-flex mt-3 mx-5'}>
        <button onClick={add}>add</button>
        <div ref={drop1} style={{width: '500px', height: '500px'}} className={css1}></div>
        <div ref={drop2} style={{width: '500px', height: '500px'}} className={'mx-3 ' + css2}></div>
        {!isDragging && <div ref={drag} style={{width: '200px', height: '200px'}} className={'bg-warning'}></div>}
    </div>);


}

interface OwnProps {}
interface StateProps {}
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
    return {}
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


const Test = connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(TestComponent);
export default Test;
