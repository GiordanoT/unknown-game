import React, {useState} from "react";
import {RootState} from "@/redux";
import Profile from "@/components/profile";
import Loading from "@/components/common/Loading";
import {useSelector} from "react-redux";
import Auth from "@/components/auth";
import {useEffectOnce} from "usehooks-ts";
import {U} from "@/utils/functions";

export default function HomePage() {
    const isLoading= useSelector((state: RootState) => state.utility).loading;
    const [loading, setLoading] = useState(true);
    const userID = useSelector((state: RootState) => state.user).pointer;

    useEffectOnce(() => {U.sleep(1).then(() => setLoading(false))});

    return (<>
        {
            (isLoading || loading) ? <Loading /> :
                (!userID) ? <Auth /> :
                    <Profile userID={userID} />
        }
    </>);
}
