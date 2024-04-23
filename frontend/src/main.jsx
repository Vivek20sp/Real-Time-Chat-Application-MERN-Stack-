import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import ContextState from '../src/Context/ContextState.jsx'
import SocketState from './Context/SocketState.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ContextState>
        <SocketState>
          <App />
        </SocketState>
      </ContextState>
    </Router>
  </React.StrictMode>,
)
