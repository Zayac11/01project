import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
    };
}

type MapPropsType = {
    isAuth: boolean
}

export function withAuthRedirect<WCP> (WrappedComponent: ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapPropsType> = (props) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to='/login' />

        return (
            <WrappedComponent {...restProps as WCP} />
        )
    }

    let ConnectedAuthRedirectComponent = connect<MapPropsType, {}, WCP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}
