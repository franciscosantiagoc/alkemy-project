import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'
import { Login } from './components/views/auth/Login/Login';
import { Register } from './components/views/auth/Register/Register';
import { Tasks } from './components/views/Tasks/Tasks'
import './App.css';

const Error404 = lazy(() => import('./components/views/Error404/Error404'));

const RequireAuth = ({children}) => {
  if(!localStorage.getItem('logged')) {
    return <Navigate to='/login' replace={true} />
  }
  return children;
}

const pageTransition = {
  in: {
    opasity: 1,    
  },
  out: {
    opasity: 0,
  }
}

export const App = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
        <Routes location ={location} key={location.pathname}>
          <Route 
            path='/' 
            element={
              <RequireAuth>
                <motion.div 
                  className='page' 
                  initial='out' 
                  animate='in' 
                  exit='out' 
                  variants={pageTransition}>
                  <Tasks />
                  </motion.div>
              </RequireAuth>
            } 
          />
          <Route 
            path='/login' 
            element={
              <motion.div 
                className='page' 
                initial='out' 
                animate='in' 
                exit='out' 
                variants={pageTransition}>
                  <Login/>
              </motion.div>
            } 
          />
          <Route 
            path='/register' 
            element={
              <motion.div 
                className='page' 
                initial='out' 
                animate='in' 
                exit='out' 
                variants={pageTransition}>
                  <Register/>
              </motion.div>
            } 
          />
          <Route 
            path='*' 
            element={
              <motion.div 
              className='page' 
              initial='out' 
              animate='in' 
              exit='out' 
              variants={pageTransition}>
                <Suspense fallback={false}>
                <Error404/>
                </Suspense>
              </motion.div>
            } />
        </Routes>
      </AnimatePresence>
  )
}