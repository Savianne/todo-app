import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckIcon from '@mui/icons-material/Check';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ITEM_MENU from './list-item-menu';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Skeleton from '@mui/material/Skeleton';

import BACKDROP_LOADING_INDICATOR from './backdrop-loading-indicator';

//Redux
import { useDispatch } from 'react-redux';

//Controller
import updateTodoTitle from '../Controller/update-todo-title';
import getAllMyTodos from '../Controller/get-all-my-todo';
import todoItemStatusSwitcher from '../Controller/todo-status-marker';

const TODO_LIST = ({todolist, dispatchStatusUpdate}) => {
    const [list, updateList] = useState(todolist);

    const handleMoveUp = (list, currentPos) => {
        const cut = list.splice(currentPos, 1)[0];
        list.splice(currentPos - 1, 0, cut);
        return list;
      }
    
      const handleMoveDown = (list, currentPos) => {
        const cut = list.splice(currentPos, 1)[0];
        list.splice(currentPos + 1, 0, cut);
        return list;
      }

    useEffect(() => {
        updateList(todolist);
    }, [todolist])
    return <>
        <Box sx={{ display: 'flex', flex: '0 1 100%', flexWrap: 'wrap', height: 'fit-content', justifyContent: 'center'}}>
            {
                list? <>
                    {
                        list.map((item, index) => {
                            return <>
                                <LIST_ITEM item={item} position={index} endoflist={index + 1 == +list.length} dispatchStatusUpdate={(updatedlist) => dispatchStatusUpdate(updatedlist)} moveUp={(position) => updateList([...handleMoveUp(list, position)])} moveDown={(position) => updateList([...handleMoveDown(list, position)])} key={item.id} />
                            </>
                        })
                        
                    }
                </> : <>
                    <Box sx={{display: 'flex', flexWrap: 'wrap', width: '96%'}}>
                        <LIST_ITEM_SKELETON />
                        <LIST_ITEM_SKELETON />
                        <LIST_ITEM_SKELETON />
                        <LIST_ITEM_SKELETON />
                        <LIST_ITEM_SKELETON />
                    </Box>
                </>
            }
        </Box>
    </>
}

const LIST_ITEM_SKELETON = () => {
    return <>
        <Skeleton variant="rectangular" width={'100%'} height={50} sx={{margin: '3px', borderRadius: '5px'}} />
    </>
}

const LIST_ITEM = ({item, position, endoflist, dispatchStatusUpdate, moveDown, moveUp}) => {
    const dispatcher = useDispatch();
    const [onUpdateLoading, setOnUpdateLoadingState] = useState(false);
    const [onEditState, setOnEditState] = useState(false);
    const [onEditInput, handleInput] = useState(item.title);
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        if(!open) handleInput(item.title);
    }, [open]);

    const handleUpdateTodoStatus = (todo, cb) => {
        setOnUpdateLoadingState(true);
        todoItemStatusSwitcher({id: todo.id, status: todo.status}, 
          () => {
            getAllMyTodos((list) => {
              cb(list);
              setOnUpdateLoadingState(false);
              dispatcher({
                type: 'NEW_SNACKBAR',
                payload: {
                  severity: 'success',
                  message: 'Updated Successfully'
                }
              });
            }, (err) => {
              window.location.reload()
            });
          }, 
          (err) => {
            setOnUpdateLoadingState(false);
            dispatcher({
              type: 'NEW_SNACKBAR',
              payload: {
                severity: 'error',
                message: `Update Status error : ${err}`
              }
            });
          });
    }
    return <>
        <BACKDROP_LOADING_INDICATOR state={onUpdateLoading} />
        <Box sx={{ display: 'flex', flex: '0 1 95%', padding: '5px 10px', marginBottom: '3px', alignItems: 'center', height: 'fit-content', color: 'white', borderRadius: '5px', backgroundColor: '#06198714'}}>
            {
                item.status === 'todo'? <>
                    <Tooltip title="Mark as done">
                        <RadioButtonUncheckedIcon sx={{color: 'white', cursor: 'pointer'}} onClick={() => handleUpdateTodoStatus(item, (newlist) => dispatchStatusUpdate(newlist))} />
                    </Tooltip>
                </> : <>
                    <Tooltip title="Mark as To-do">
                        <CheckCircleOutlineIcon sx={{color: 'white', cursor: 'pointer'}} onClick={() => handleUpdateTodoStatus(item, (newlist) => dispatchStatusUpdate(newlist))} />
                    </Tooltip>
                </>
            }
            {
                onEditState? <>
                <ClickAwayListener onClickAway={() => {
                    if(!open) setOnEditState(false);
                    setOpen(false)
                }}>
                    <Box sx={{display: 'flex', height: 'fit-content', alignItems: 'center', flex: '0 1 100%'}} >
                        <input 
                        id='onedit-title-input' 
                        placeholder='Edit Title' 
                        value={onEditInput} 
                        onChange={(e) => handleInput(e.target.value)} />
                        <IconButton sx={{marginLeft: '10px'}} aria-label="save-edit" component="span">
                            {
                                onEditInput === item.title || onEditInput.length <= 0 || onEditInput.length >= 100? <>
                                    <CheckIcon sx={{color: 'gray'}} />
                                </> : 
                                    <CheckIcon sx={{color: '#41ff00'}} onClick={() => {
                                    setOnUpdateLoadingState(true);
                                    updateTodoTitle({id: item.id, title: onEditInput}, () => {
                                        getAllMyTodos((list) => {
                                            dispatchStatusUpdate(list);
                                            setOnUpdateLoadingState(false);
                                            dispatcher({
                                              type: 'NEW_SNACKBAR',
                                              payload: {
                                                severity: 'success',
                                                message: 'Edit Title Success'
                                              }
                                            });
                                            if(!open) setOnEditState(false);
                                            setOpen(false)
                                          }, (err) => {
                                            window.location.reload()
                                          });
                                    },
                                    (err) => {
                                        setOnUpdateLoadingState(false);
                                        dispatcher({type: 'NEW_SNACKBAR', payload: {severity: 'error', message: `Edit Title Failed ${err}`}})
                                        if(!open) setOnEditState(false);
                                        setOpen(false)
                                    })
                                }} />
                            }  
                        </IconButton>
                    </Box>
                </ClickAwayListener>
                </> : <>
                    {
                        item.status === 'done'? <Box sx={{display: 'flex', alignItems: 'center', width: 'fit-content', height: 'fit-content', position: 'relative'}}>
                            <Typography sx={{marginLeft: '10px', color: '#e4dede99'}}>{item.title}</Typography>
                            <span style={{display: 'flex', marginLeft: '10px', width: '95%', borderBottom: '1px solid rgb(239 239 239)', position: 'absolute', left: 0}}></span>
                        </Box> : <Typography sx={{marginLeft: '10px', color: 'white'}}>{item.title}</Typography>
                    }
                    
                </> 
            }
            {
                !(onEditState)? <>
                    <Box sx={{marginLeft: 'auto'}}>
                        <ITEM_MENU 
                        item={item} 
                        position={position} 
                        endoflist={endoflist} 
                        dispatchStatusUpdate={(updatedlist) => dispatchStatusUpdate((updatedlist))} 
                        dispatchOnEditState={() => {
                            setOnEditState(true);     
                        }}
                        moveUp={(position) => moveUp(position)} 
                        moveDown={(position) => moveDown(position)} />
                    </Box>
                </> : ''
            }
        </Box>
    </>
}
export default TODO_LIST;