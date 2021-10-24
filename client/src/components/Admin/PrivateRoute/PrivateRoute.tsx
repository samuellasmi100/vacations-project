import { Route, Redirect } from  "react-router-dom";
import { useSelector } from 'react-redux';
import { AppState } from "../../../redux/app-state";


export const PrivateRoute = (props) => {
        const isLoggedIn = useSelector((state: AppState) => state.auth)
        const isAdmin = isLoggedIn.admin;
        
    const condition = isAdmin === 1;

    return  condition ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) : 
        (<Redirect  to="/login"  />);
};

