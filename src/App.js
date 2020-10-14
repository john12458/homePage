import React from 'react';
import {Nav} from "./component";
import Home from "./pages/Home";
import Components from "./pages/Components";
import Games from "./pages/games/Games";
import PikaBall from './pages/pikaBall_old'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
  Link,
} from "react-router-dom";
import './App.css';
import styled from 'styled-components';
const Bound = styled.div`
    min-height: 100vh;
`;
const Site = styled.div`
    background-image: linear-gradient(45deg, #57838a, #ffffff38);
    background-color: #99e2b8;
    min-height: 100vh;
    font-size: calc(10px + 2vmin);
    color: white;
`;
const WebSite = ()=>{
  return (
    <Site>
      <Nav />
      <Switch>
        <Route path="/games" component={Games}/>  
        <Route path="/" component={Home}/>  
      </Switch>
    </Site>  
)}
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      // <Router>
      <HashRouter>
          <Bound>
            <Switch>
                  <Route path="/pikaBall" component={PikaBall}/>
                  <Route path="/Components" component={Components} />
                <WebSite/>
            </Switch>
          </Bound >
      </HashRouter>
    );
  }
}

export default App;
