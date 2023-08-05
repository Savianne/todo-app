//This module will combine our reducers all together
import { combineReducers } from "redux";

//REDUCERS
import snackbarReducer from "./reducers/snackbar-reducer";

const combined_reducers = combineReducers({
    snackbarReducer
});

export default combined_reducers;