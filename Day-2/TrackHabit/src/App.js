import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Athletics from './pages/athletics';
import Explore from './pages/explore';
import School from './pages/school';
import Health from './pages/health';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import Family from './pages/family';
function App() {
    return (

        <Router>
            <Navbar />
            <Routes>
                <Route path='/' exact element={
                    <Home />
                } />
                <Route path='/athletics' exact element={
                    <Athletics />

                } />
                <Route path='/explore' exact element={
                    <Explore />

                } />
                <Route path='/family' exact element={
                    <Family />

                } />
                <Route path='/school' exact element={
                    <School />

                } />
                <Route path='/health' exact element={
                    <Health/>

                } />
                <Route path='/sign-up' exact element={
                    <SignUp />
                } />
                <Route path='/signin' exact element={
                    <SignIn />
                } />
                

            </Routes >
        </Router>
    );
}

export default App;
