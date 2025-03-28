// from react_root.js
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import TopLevelApp from '../src/samples/TopLevelApp';
import { ThemeProvider, theme } from './theme'; // Import the ThemeProvider and theme
import './common.css';

const outletElement = document.getElementById('outlet');

if (outletElement) {
  render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {' '}
        {/* Pass the theme here */}
        <TopLevelApp />
      </ThemeProvider>
    </BrowserRouter>,
    document.getElementById('outlet')
  );
}
