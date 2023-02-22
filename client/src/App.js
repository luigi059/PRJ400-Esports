import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components';
// import * as ROUTES from './constants/routes';
// import { DataProvider } from './GlobalState';
import { Dashboard } from './pages';

export default function App() {
	const colours = {
		grey: {
			0: '#ffffff',
			10: '#f6f6f6',
			50: '#f0f0f0',
			100: '#e0e0e0',
			200: '#c2c2c2',
			300: '#a3a3a3',
			400: '#858585',
			500: '#666666',
			600: '#525252',
			700: '#3d3d3d',
			800: '#292929',
			900: '#141414',
			1000: '#000000',
		},
		primary: {
			// blue
			100: '#d3d4de',
			200: '#a6a9be',
			300: '#7a7f9d',
			400: '#4d547d',
			500: '#21295c',
			600: '#191F45',
			700: '#141937',
			800: '#0d1025',
			900: '#070812',
		},
		secondary: {
			// purple
			100: '#edd1f5',
			200: '#daa3ea',
			300: '#c876e0',
			400: '#b548d5',
			500: '#a31acb',
			600: '#8215a2',
			700: '#62107a',
			800: '#410a51',
			900: '#210529',
		},
	};
	const theme = createTheme({
		palette: {
			primary: {
				...colours.primary,
				main: colours.primary[400],
				light: colours.primary[400],
			},
			secondary: {
				...colours.secondary,
				main: colours.secondary[300],
			},
			neutral: {
				...colours.grey,
				main: colours.grey[500],
			},
			background: {
				default: colours.primary[600],
				alt: colours.primary[500],
			},
		},
		typography: {
			fontFamily: ['Inter', 'sans-serif'].join(','),
			fontSize: 12,
			h1: {
				fontFamily: ['Inter', 'sans-serif'].join(','),
				fontSize: 40,
			},
			h2: {
				fontFamily: ['Inter', 'sans-serif'].join(','),
				fontSize: 32,
			},
			h3: {
				fontFamily: ['Inter', 'sans-serif'].join(','),
				fontSize: 24,
			},
			h4: {
				fontFamily: ['Inter', 'sans-serif'].join(','),
				fontSize: 20,
			},
			h5: {
				fontFamily: ['Inter', 'sans-serif'].join(','),
				fontSize: 16,
			},
			h6: {
				fontFamily: ['Inter', 'sans-serif'].join(','),
				fontSize: 14,
			},
		},
	});
	return (
		<div className="App">
			{/* <DataProvider> */}
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Routes>
						<Route element={<Layout />}>
							<Route path="/" element={<Navigate to="/profile" replace />} />
							<Route path="/profile" element={<Dashboard />} />
						</Route>
					</Routes>
				</ThemeProvider>
			</BrowserRouter>
			{/* 			</DataProvider> */}
		</div>
	);
}
