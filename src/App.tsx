import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Main';
import Form from './pages/Form';
import Footer from './components/Footer';
import './assets/styles/app.scss';

export default function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/form" component={Form} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
