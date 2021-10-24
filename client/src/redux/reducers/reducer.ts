import { AppState } from '../app-state'
import { ActionType } from '../action/action-type'
const initialState = {
    auth: [],
    vacations: []
};

export const reducer = (state: AppState = initialState, action) => {
    const newState = { ...state };
    const { type, payload } = action;
 
    switch (type) {
        case ActionType.SAVE_LOGIN_DETAILS:    
            newState.auth = payload
            
            break
        case ActionType.CLEAR_LOGIN_DETAILS:
            newState.auth = [];
            newState.vacations = [];
            break
        case ActionType.ALL_VACATION:{
            newState.vacations = payload
        }
            break
        case ActionType.DELET_VACATION:{
            newState.vacations = payload
        }
            break
        case ActionType.UPDATE_VACATION:
            newState.vacations = payload
            break
        case ActionType.FOLLOW_VACATION:
            newState.vacations = payload
            break
       case ActionType.DELET_VACATION:
                newState.vacations = []
            break    
    }
    return newState
}