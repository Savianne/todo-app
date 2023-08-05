import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import AddCircleIcon from '@mui/icons-material/AddCircle';

//Components
import BACKDROP_LOADING_INDICATOR from './backdrop-loading-indicator';

//Controller
import addNewTodo from '../Controller/add-new-todo';
import getAllMyTodos from '../Controller/get-all-my-todo';

const NEW_TODO_DATA_INPUT = (dispatchAction) => {
    const dispatcher = useDispatch();
    const [backdropLoadingIndicatorState, setBackdropLoadingIndicator] = useState(false);
    const [input, handleInput] = useState('');
    return <>
        <BACKDROP_LOADING_INDICATOR state={backdropLoadingIndicatorState} />
        <div className="data-input-holder" onClick={(e) => e.stopPropagation()}>
            <input className='task-title' type='text' placeholder='Title' value={input}
            onChange={(e) => {
                handleInput(e.target.value);
            }} />
            <Divider orientation="vertical" variant="middle" flexItem />
            {
                input.length > 0 && input.length <= 100? <>
                    <IconButton sx={{ width: '45px', height: '45px', margin: '0 10px'}} color="primary" aria-label="add new todo" component="span"
                    onClick={() => {
                        setBackdropLoadingIndicator(true);
                        addNewTodo(input, () => {
                            getAllMyTodos((list) => {
                                dispatchAction(list);
                                setBackdropLoadingIndicator(false);
                                dispatcher({
                                  type: 'NEW_SNACKBAR',
                                  payload: {
                                    severity: 'success',
                                    message: 'Added New Todo'
                                  }
                                });
                              }, (err) => {
                                window.location.reload()
                              });
                        },
                        (err) => {
                            setBackdropLoadingIndicator(false);
                            dispatcher({type: 'NEW_SNACKBAR', payload: {severity: 'error', message: `Operation Failed ${err}`}})
                        })
                    }}>
                        <AddCircleIcon />
                    </IconButton>
                </> : <>
                    <IconButton sx={{ width: '45px', height: '45px', margin: '0 10px'}} aria-label="add new todo" component="span" disabled>
                        <AddCircleIcon />
                    </IconButton>
                </>
            }
        </div>
    </>
}

export default NEW_TODO_DATA_INPUT;