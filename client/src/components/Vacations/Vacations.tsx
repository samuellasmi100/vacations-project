import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import { CardVactions } from '../CardVacation/CardVactions';
import './Vacations.css';
import { ActionType } from './../../redux/action/action-type'
import { AppState } from '../../redux/app-state';



export const Vacations = () => {
    const dispatch = useDispatch();
    const vacations = useSelector((state: AppState) => state.vacations);
    const [error, setError] = useState<string>()
    const history = useHistory()
    
  //get the data from server, and also get the data back when user refresh the page

    const getAllVacations = async() => {

      try {
        const token = sessionStorage.getItem('token');
        
          if(token){
            const response = await axios.get('http://localhost:5001/vacations', { headers: { "Authorization":token}});
        
            axios.defaults.headers.common['Authorization'] = token
    
            dispatch({ type: ActionType.ALL_VACATION, payload: response.data.vacations });
            dispatch({ type: ActionType.SAVE_LOGIN_DETAILS, payload: {token:token,admin:response.data.admin}})
        
        } else {
            const response = await axios.get('http://localhost:5001/vacations');
            dispatch({ type: ActionType.ALL_VACATION, payload: response.data.vacations });
        }
          
      } catch (error) {
        setError(error.response.message)   
      }

    }

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if (!token) {
            history.push('/login')
        }
    }, []);
    useEffect(() => {
            getAllVacations()
    }, [])

    return (
        <Fragment>
            {error ? <div className='alert alert-danger' role='alert'>{error}</div> : ''}
            <div className='container'>
                {vacations?.sort((a: any, b: any) => {
                    return b.userId - a.userId
                })
                    .map((vacation) => (
                        <CardVactions key={vacation.vacationId} vacation={vacation} />
                    ))}
            </div>
        </Fragment>
    )
}
