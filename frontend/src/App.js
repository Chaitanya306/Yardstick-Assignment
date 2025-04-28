

import './App.css';
import React,{ useState,useEffect } from 'react';
import {Routes,Route,Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import Transactions from './components/Transactions';
import Categories from './components/Categories';
import Dashboard from './components/Dashboard';
function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to='/'>
              Transactions
            </Link>
          </li>
          <li>
            <Link to='/categories'>
              Categories
            </Link>
          </li>
          <li>
            <Link to='/dashboard'>
              Dashboard
            </Link>
          </li>
          
        </ul>
      </nav>
      <Routes>
        <Route exact path='/' Component={Transactions} />
        <Route exact path='/categories' Component={Categories} />
        <Route exact path='/dashboard' Component={Dashboard} />
      </Routes>
    </div>
  );
}

export default App;

