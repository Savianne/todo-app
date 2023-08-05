import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckIcon from '@mui/icons-material/Check';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Divider from '@mui/material/Divider';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

//Redux
import { useDispatch } from 'react-redux';

//Components
import BACKDROP_LOADING_INDICATOR from './backdrop-loading-indicator';

//utils
import SNACKBAR from './snackbar';

//Controllers
import todoItemStatusSwitcher from '../Controller/todo-status-marker';
import getAllMyTodos from '../Controller/get-all-my-todo';
import deleteSingleTodo from '../Controller/delete-single-todo';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
        vertical: 'center',
        horizontal: 'left',
    }}
    transformOrigin={{
        vertical: 'center',
        horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function ITEM_MENU({item, position, endoflist, dispatchStatusUpdate, dispatchOnEditState, moveUp, moveDown}) {
  const dispatcher = useDispatch();
  const [backdropLoading, updateBackdropLoadingState] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateTodoStatus = (todo, cb) => {
      handleClose();
      updateBackdropLoadingState(true);
      todoItemStatusSwitcher({id: todo.id, status: todo.status}, 
        () => {
          getAllMyTodos((list) => {
            cb(list);
            updateBackdropLoadingState(false);
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
          updateBackdropLoadingState(false);
          dispatcher({
            type: 'NEW_SNACKBAR',
            payload: {
              severity: 'error',
              message: `Update Status error : ${err}`
            }
          });
        });
  }

  

  return (
    <div>
      <BACKDROP_LOADING_INDICATOR state={backdropLoading} />
      <IconButton
        size='small'
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
      >
        <MoreHorizIcon sx={{color: 'whitesmoke'}} /> 
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
          {
              item.status === 'todo'? <>
                <MenuItem onClick={() => handleUpdateTodoStatus(item, (newlist) => dispatchStatusUpdate(newlist))} disableRipple>
                    <CheckIcon sx={{ color: '#41ff00' }}/>
                    Mark as Done
                </MenuItem>
              </> : <>
                <MenuItem onClick={() => handleUpdateTodoStatus(item, (newlist) => dispatchStatusUpdate(newlist))} disableRipple>
                    <RadioButtonUncheckedIcon sx={{ color: '#f5f4f45c' }}/>
                    Mark as To-do
                </MenuItem>
              </>
          }
          <Divider sx={{ my: 0.5 }} />
          {
              item.status === 'todo'? <>
                <MenuItem onClick={() => {
                  handleClose()
                  dispatchOnEditState()
                }} disableRipple>
                    <EditIcon />
                    Edit Title
                </MenuItem>
              </> : ''
          }
        <MenuItem 
        onClick={() => {
          handleClose();
          updateBackdropLoadingState(true);
          deleteSingleTodo(item.id, () => {
            getAllMyTodos((list) => {
              dispatchStatusUpdate(list);
              updateBackdropLoadingState(false);
              dispatcher({
                type: 'NEW_SNACKBAR',
                payload: {
                  severity: 'success',
                  message: 'Deleted Successfully'
                }
              });
            }, (err) => {
              window.location.reload()
            });
          }, (err) => {
            updateBackdropLoadingState(false);
            dispatcher({
              type: 'NEW_SNACKBAR',
              payload: {
                severity: 'error',
                message: `Deleting failed : Error ${err}`
              }
            });
          })
        }} disableRipple>
          <DeleteIcon />
          Delete
        </MenuItem>
        {
            +position > 0? <>
              <MenuItem onClick={() => {
                handleClose();
                moveUp(position);
              }} 
              disableRipple>
                <ArrowDropUpIcon />
                Move Up
              </MenuItem>
            </> : ''
        }
        {
            !endoflist? <>
              <MenuItem onClick={() => {
                handleClose();
                moveDown(position);
              }} disableRipple>
                <ArrowDropDownIcon />
                Move Down
              </MenuItem>
            </> : ''
        }
      </StyledMenu>
    </div>
  );
}
