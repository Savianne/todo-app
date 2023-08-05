const snackbarReducer = (state = {open: false}, action) => {
    switch(action.type) {
        case 'CLOSE_SNACKBAR':
            state = {open: false};
            return state;
        break;
        case 'NEW_SNACKBAR':
            state = {
                open: true,
                ...action.payload
            }
            return state;
        break;
        default:
            return state;
    }
}

export default snackbarReducer;