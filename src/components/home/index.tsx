import React from 'react';
import {RootState} from '@/redux';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import Navbar from "@/components/common/Navbar";

function HomeComponent(props: AllProps) {

    return(<div>
        <Navbar />
        {JSON.stringify(props.objects)}
    </div>);
}

interface OwnProps {}
interface StateProps {objects: any}
interface DispatchProps {}
type AllProps = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
    return {objects: state.objects};
}

function mapDispatchToProps(dispatch: Dispatch<any>): DispatchProps {
    const ret: DispatchProps = {};
    return ret;
}


const Home = connect<StateProps, DispatchProps, OwnProps, RootState>(mapStateToProps, mapDispatchToProps)(HomeComponent);
export default Home;
