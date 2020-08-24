import React, { createContext, Dispatch, useContext, useEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert';
import { SnackAction, SnackType, SnackState, SnackMessage, SnackSeverity } from '../interfaces';

/*
    How To Snackbar:
    Make sure the <SnackbarWrapper/> component has been called somewhere in your app
    Use <Snack snack={snackbarMessage} /> to create snacks
    Use snack(dispatch, snackMessage) to create snacks
    dispatch comes from using useContext(SnackContext) in a component
*/


// Context
export const SnackContext = createContext<Dispatch<SnackAction> | null>(null)


// Reducer
const PUSH: SnackType = 'push'
const POP: SnackType = 'pop'
const CLOSE: SnackType = 'close'
const SET_MESSAGE: SnackType = 'set_message'

export function SnackbarReducer(state: SnackState, action: SnackAction): SnackState {
	switch (action.type) {
		case PUSH:
			action.payload.snack.key = Date.now()
			return {...state, snackPack: [...state.snackPack, action.payload.snack]}
		case POP:
            const key = action.payload.key ?? state.snackPack[0]?.key
            return {
                ...state,
                open: true,
                messageInfo: state.snackPack.find((snack: SnackMessage) => key === snack.key),
                snackPack: state.snackPack.filter((snack: SnackMessage) => key !== snack.key)
            }
		case CLOSE:
			return {...state, open: false, messageInfo: undefined}
		case SET_MESSAGE:
            return action.payload.key && action.payload.key !== state.messageInfo?.key ? state : {...state, messageInfo: action.payload.messageInfo}
		default:
			return state
	}
}

function addSnack(snack: SnackMessage): SnackAction {
	return {
		type: PUSH,
		payload: { snack } 
	}
}
function popSnack(key?: number): SnackAction {
	return {
		type: POP,
		payload: { key }
	}
}
function closeSnack(): SnackAction {
	return {
		type: CLOSE,
	}
}
function clearSnack(key?: number): SnackAction {
	return {
        type: SET_MESSAGE,
        payload: { key }
	}
}

// Utilty Component
export function Snack(props: SnackMessage): void {
    const dispatch = useContext(SnackContext)
    if (!dispatch) return
	useEffect(() => {
        snack(dispatch, props.message, props.type)
	}, [])
}

// Utility Function
export function snack(dispatch: Dispatch<SnackAction> | null, message: string, type: SnackSeverity='info'): void {
    const snack: SnackMessage = {message, type}
    if (!dispatch) return
    dispatch(addSnack(snack))
	setTimeout(
		() => {
			dispatch(clearSnack(snack.key))
		},
		snack.type === 'success' ? 5000 : 30000,
	)
}


// Top-Level Wrapper
const useStyles = makeStyles((theme: Theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));


export function SnackbarWrapper(props: { snackState: SnackState }) {
    const {snackPack, messageInfo, open} = props.snackState
    const dispatch = useContext(SnackContext)

    React.useEffect(() => {
        if (snackPack.length && !messageInfo) {
            // Set a new snack when we don't have an active one
            if (dispatch) dispatch(popSnack())
        }
      }, [snackPack, messageInfo, open])
    
    const handleClose = (_event: React.SyntheticEvent | MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        if (dispatch) dispatch(closeSnack())
    }

    const handleExited = () => {
        if (dispatch) clearSnack()
    }

    const classes = useStyles();
    return (
        <div
            className={classes.root}
            aria-live='polite'
            aria-atomic='true'>
            {messageInfo?.message && (
                <Snackbar
                    key={messageInfo?.key}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={open}
                    autoHideDuration={messageInfo?.type === 'success' ? 3000 : 10000}
                    onClose={handleClose}
                    onExited={handleExited}>
                    <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={messageInfo?.type ?? 'info'}>
                        {messageInfo?.message}
                    </MuiAlert>
                </Snackbar>
            )}
        </div>
    )
}
