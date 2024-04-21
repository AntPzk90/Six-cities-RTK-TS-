import React from 'react';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Layout from '../layout/layout';
import MainPage from '../../pages/main/main';
import InnerPage from '../../pages/inner/inner';
import AuthPage from '../../pages/auth/auth';
import ErrorPage from '../../pages/error/error';
import FavoritesPage from '../../pages/favorite/favorite';

function App(): JSX.Element {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage/>}>
            <Route path=":city" element={<MainPage/>}/>
          </Route>
          <Route path="/inner" element={<InnerPage/>}>
            <Route path=":id" element={<InnerPage/>}/>
          </Route>
          <Route path="/auth" element={<AuthPage/>}/>
          <Route path="/favorite" element={<FavoritesPage/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
