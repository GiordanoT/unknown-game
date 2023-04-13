import React, {useState} from "react";
import Auth from "@/components/auth";
import Loading from "@/components/common/Loading";
import {RootState} from "@/redux";
import {useSelector} from "react-redux";
import {useEffectOnce} from "usehooks-ts";
import {U} from "@/utils/functions";
import Profile from "@/components/profile";

export default function AuthPage() {
    const isLoading= useSelector((state: RootState) => state.utility).loading;
    const [loading, setLoading] = useState(true);
    const userID = useSelector((state: RootState) => state.user).pointer;

    useEffectOnce(() => {U.sleep(1).then(() => setLoading(false))});

    return(<>
        {
            (isLoading || loading) ? <Loading /> :
                (userID) ? <Profile userID={userID} /> :
                    <Auth />
        }
    </>);

}

