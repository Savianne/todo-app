import './App.css';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import ClearAllIcon from '@mui/icons-material/ClearAll';

//Readux
import { useSelector, useDispatch } from 'react-redux';

//COmponents
import DATE_FRAME from './components/date-frame';
import DATA_COUNTERS_DISPLAY from './components/data-counters-display';
import TABS from './components/tabs';
import TODO_LIST from './components/todo-list';
import NEW_TODO_DATA_INPUT from './components/new-todo-data-entry';
import SNACKBAR from './components/snackbar';
import BACKDROP_LOADING_INDICATOR from './components/backdrop-loading-indicator';

//Controller
import getAllMyTodos from './Controller/get-all-my-todo';
import deleteCompleted from './Controller/delete-completed';

function App() {
  const snackbarState = useSelector((state) => state.snackbarReducer);
  const [backdropLoadingIndicatorState, setBackdropLoadingIndicator] = useState(false);
  const dispatcher = useDispatch();
  const newTaskRef = useRef(null);
  const [dataCounters, updateDataCounters] = useState({all: 0, completed: 0, todo: 0})
  const [list, updateList] = useState(null);
  const [onDisplayList, updateOnDisplayList] = useState(null);
  const [tab, switchTab] = useState(null);
  const [newTaskFormState, updataState] = useState('inactive');

  useEffect(() => {
    if(tab && list) {
      switch(tab) {
        case 'all':
          updateOnDisplayList(list);
        break;
        case 'completed':
          const completed = list.filter((item) => item.status === 'done');
          updateOnDisplayList(completed);
        break;
        case 'todo':
          const todo = list.filter((item) => item.status === 'todo');
          updateOnDisplayList(todo);
        break;
        default:
          updateOnDisplayList(list)
      }
    }
  }, [tab, list]);

  useEffect(() => {
    if(list) {
      updateDataCounters({
        all: list.length,
        completed: list.filter((item) => item.status === 'done').length,
        todo: list.filter((item) => item.status === 'todo').length
      })
    }
  }, [list]);

  useEffect(() => {
    newTaskFormState === 'active'? newTaskRef.current.style.height = '100%' : newTaskRef.current.style.height = '0';
  }, [newTaskFormState]);

  useEffect(() => {
    getAllMyTodos((list) => updateList(list), (err) => console.log(err));
  }, [])
  return <>
    <BACKDROP_LOADING_INDICATOR state={backdropLoadingIndicatorState} />
    <SNACKBAR 
    onclose={(state) => dispatcher({type: 'CLOSE_SNACKBAR'})}
    state={snackbarState.open} 
    severity={snackbarState.severity? snackbarState.severity : ''} 
    message={snackbarState.message? snackbarState.message :''} />
    <div className="main-container">
      <div className="middle-container">
        <div className="left-content">
          <DATE_FRAME />
          <Box sx={{ display: 'flex', flex: '1', flexWrap: 'wrap', height: 'fit-content', justifyContent: 'center'}}>
            <DATA_COUNTERS_DISPLAY dataCounters={dataCounters} />
            <Box sx={{ justifyContent: 'center', marginTop: '20px'}}>
              <Button size="small" variant="outlined" startIcon={<LogoutIcon />} onClick={() => window.location = '/logout.php'}>
                Logout
              </Button>
            </Box>
          </Box>
        </div>
        <div className="right-content">
          <div className="blur-bg-effect"></div>
          <Box sx={{ display: 'flex', flex: '0 1 94%', alignItems: 'center', padding: '10px 3%', height: '40px', backgroundColor: 'rgba(31, 78, 121, 0.600)', borderTopRightRadius: '5px'}}>
            <Box sx={{ paddingLeft: '7px', borderLeft: '4px solid rgb(143, 170, 220)'}}>
              <Typography sx={{ fontSize: '20px', fontWeight: 'bold', lineHeight: '1', color: 'white'}}>ToDos</Typography>
            </Box>
            <Button sx={{color: 'white', borderColor: 'rgba(255, 255, 255, 0)', marginLeft: 'auto'}} size="small" variant="outlined" startIcon={<AddIcon />}
            onClick={() => newTaskFormState === 'active'? updataState('inactive') : updataState('active')}>
              New Task
            </Button>
          </Box>
          <Box sx={{ display: 'flex', zIndex: '10', flex: '0 1 94%', flexWrap: 'wrap', height: 'fit-content', padding: '5px 3%', position: 'relative'}}>
            <div id='new-task-form-area' ref={newTaskRef}
            onClick={() => {
              newTaskFormState === 'active'? updataState('inactive') : updataState('active')
            }}>
              <NEW_TODO_DATA_INPUT dispatchAction={(list) => updateList(list)} />
            </div>
            <Box sx={{ display: 'flex', flex: '0 1 100%', alignItems: 'center', padding: '5px 3%', height: 'fit-content',}}>
              <TABS dispatch={(tab) => switchTab(tab)}/>
            </Box>
            
            <Box sx={{ display: 'flex', flex: '0 1 100%', height: '300px', padding: '5px 3%'}}>
              <div id="scrollarea">
                <TODO_LIST todolist={onDisplayList} dispatchStatusUpdate={(updatedlist) => updateList(updatedlist)} />
              </div>
            </Box>
            <Box sx={{ display: 'flex', flex: '0 100%', alignItems: 'center', justifyContent: 'center', height: '30px', padding: '5px 3%'}}>
              {
                list && list.filter((item) => item.status === 'done').length > 0? <>
                  <Button sx={{color: 'white', borderColor: 'rgba(255, 255, 255, 0)'}} size="small" variant="outlined" startIcon={<ClearAllIcon />} 
                  onClick={() => {
                    setBackdropLoadingIndicator(true);
                    deleteCompleted(() => {
                      getAllMyTodos((list) => {
                        updateList(list);
                        setBackdropLoadingIndicator(false);
                        dispatcher({
                          type: 'NEW_SNACKBAR',
                          payload: {
                            severity: 'success',
                            message: 'Deleted All Completed'
                          }
                        });
                      }, (err) => {
                        window.location.reload()
                      });
                    }, (err) => {
                      setBackdropLoadingIndicator(false);
                      dispatcher({type: 'NEW_SNACKBAR', payload: {severity: 'error', message: `Operation Failed ${err}`}})
                    })
                  }}>
                    Delete Completed
                  </Button>
                </> : <Button sx={{color: 'white', borderColor: 'rgba(255, 255, 255, 0)'}} size="small" variant="outlined" startIcon={<ClearAllIcon />} disabled> Delete Completed</Button>
              }
            </Box>
          </Box>
        </div>
      </div>
    </div>
  </>
}

export default App;
