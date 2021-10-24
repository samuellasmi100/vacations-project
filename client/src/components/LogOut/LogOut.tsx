import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ActionType } from '../../redux/action/action-type';
import axios from 'axios'


export const LogOut = (): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();
    
        sessionStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        useEffect(() => {
        dispatch({ type: ActionType.CLEAR_LOGIN_DETAILS})
        history.push('/')
        },[])
     return null
}
