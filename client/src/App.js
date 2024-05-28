import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';

import Home from './pages/Home';
import Message from './pages/Message/Message';
import Manager from './pages/Manager/Manager';
import Map from './pages/Map/Map';
import Archive from './pages/Archive/Archive';
import Calendar from './pages/Calendar/Calendar';
import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/view" element={<Home />} />
                    <Route path="/manager" element={<Manager />} />
                    <Route path="/message" element={<Message />} />
                    <Route path="/map" element={<Map />} />
                    <Route path="/archive" element={<Archive />} />
                    <Route path="/calendar" element={<Calendar />} />
                </Routes>
            </Router>
        );
    }
}

export default App;
