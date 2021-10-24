import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Fragment, useEffect,useState } from 'react'
import { ActionType } from '../../redux/action/action-type';
import { AppState } from '../../redux/app-state';
import { Vacation } from '../models/Vacation';
import axios from 'axios';
import './CardVactions.css';


export const CardVactions = ({vacation}) => {
  const [error,setError] = useState();
  
  const history = useHistory();
  const dispatch = useDispatch();
  
  const auth = useSelector((state: AppState) => state.auth);
  const isAdmin = auth.admin;
  const vacations = useSelector((state: AppState) => state.vacations);

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (!token) {
      history.push('/login')
    }
  });

  const followedVacation = async (e: any) => {
    const copyArrayToUpdateFollow = [...vacations];
    const char = e.target.innerText
    try {
      if (char === 'Unfollow') {
        await axios.delete(`http://localhost:5001/followed/unfollow/${e.target.id}`)

        const vacationFollow = copyArrayToUpdateFollow.find((vacation:Vacation) => vacation.vacationId === +e.target.id);
        vacationFollow.userId = null
        vacationFollow.numOfFollowers -= 1
        dispatch({ type: ActionType.FOLLOW_VACATION, payload: copyArrayToUpdateFollow })

      } else if (char === 'Follow') {
        await axios.put(`http://localhost:5001/followed/follow/${e.target.id}`)

        const vacationFollow = copyArrayToUpdateFollow.find((vacation:Vacation) => vacation.vacationId === +e.target.id);
        vacationFollow.userId = true
        vacationFollow.numOfFollowers += 1
        dispatch({ type: ActionType.FOLLOW_VACATION, payload: copyArrayToUpdateFollow })
      }
    }
    catch (err) {
      setError(err.response);
    }
  }

  const deletVacation = async (e: any) => {
    const copyArrayToDeleteVacations = [...vacations]

    try {
        await axios.delete(`http://localhost:5001/vacations/${e.target.id}`);
      const deleteVacationId = copyArrayToDeleteVacations.findIndex((vacation:Vacation) => vacation.vacationId === +e.target.id);
      copyArrayToDeleteVacations.splice(deleteVacationId, 1);
      dispatch({ type: ActionType.DELET_VACATION, payload: copyArrayToDeleteVacations })
    } catch (err) {
      setError(err.response);
    }
  };

  const edidVacation = () => {
    history.push('/edit')
  };

  return (
   <Fragment>
     <div>
     {error ? <div className='alert alert-danger' role='alert'>{error}</div> : ''}
     </div>
        <div className="vacation">
            <div className="vacation-img">
              <img src={vacation.image} alt={'vacation.image'}/>
              <h1 className="destination">Travale To {vacation.destination}</h1>
            </div>
            <div className="vacation-details">
              {isAdmin === 0 && <button type='button'
                onClick={followedVacation}
                id={vacation.vacationId}> {vacation.userId ? 'Unfollow' : 'Follow'}</button>}
              <div className='description'>
              <p>{vacation.description}</p>
              </div>
              <p>Price: {vacation.price}$</p>
              <div className='date'>
                <div> Check-in date: {vacation.startDate}</div>
                <div> Check-out date: {vacation.endDate}</div>
              </div>
              {isAdmin === 1 &&
                <ul className="icons">
                  <li>
                    <a href='#'>
                      <i className="fa fa-trash" id={vacation.vacationId} onClick={deletVacation}></i>
                    </a>
                  </li>
                  <li>
                    <Link to={`/edit/${vacation.vacationId}`}>
                     <i className="fas fa-edit" onClick={edidVacation}></i>
                  </Link>
                  </li>
               </ul> }
               <p>Followes: {vacation.numOfFollowers}</p>
          </div>
        </div>
</Fragment>
)}