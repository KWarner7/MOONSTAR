import React, { createContext, useState, useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SnackbarContext = createContext();

export const useSnackbar = () => {
	return useContext(SnackbarContext);
};

function SnackbarComponent({ message, onClose }) {
	return (
		<Snackbar open={Boolean(message)} autoHideDuration={8000} onClose={onClose}>
			<Alert onClose={onClose} severity='success' sx={{ width: '100%' }}>
				{message}
			</Alert>
		</Snackbar>
	);
}

export const SnackbarProvider = ({ children }) => {
	const [message, setMessage] = useState(null);

	const showSnackbar = (msg) => {
		setMessage(msg);
	};

	const clearSnackbar = () => {
		setMessage(null);
	};

	return (
		<SnackbarContext.Provider value={{ message, showSnackbar, clearSnackbar }}>
			{children}
			{message && (
				<SnackbarComponent message={message} onClose={clearSnackbar} />
			)}
		</SnackbarContext.Provider>
	);
};
