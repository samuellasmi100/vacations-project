import { createStore } from 'redux';
import { reducer } from '../redux/reducers/reducer';

export const store = createStore(reducer);

