import React from 'react';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';


export function TestComponent(props: AllProps) {

    return(<div className={'background'}>
        <div className={'field mx-auto shadow p-1'}>
            <img width={100} className={'d-block shadow'} src={'https://cdn5.f-cdn.com/contestentries/342444/7309306/56b791c9efbd8_thumb900.jpg'} alt={'image'} draggable={false} />
            <img width={100} className={'mt-1 d-block shadow'} src={'https://cdn5.f-cdn.com/contestentries/342444/7309306/56b791c9efbd8_thumb900.jpg'} alt={'image'} draggable={false} />
            <img width={100} className={'mt-1 d-block shadow'} src={'https://cdn5.f-cdn.com/contestentries/342444/7309306/56b791c9efbd8_thumb900.jpg'} alt={'image'} draggable={false} />
            <img width={100} className={'mt-1 d-block shadow'} src={'https://cdn5.f-cdn.com/contestentries/342444/7309306/56b791c9efbd8_thumb900.jpg'} alt={'image'} draggable={false} />
        </div>
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
