import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import {useContext} from 'react';
import WeatherDash from './components/weather-app/WeatherDash';
import RestaurantDash from './components/restaurant-finder/RestaurantDash';
import LocationProvider from './contexts/locationContext';
import {ThemeContext} from './contexts/themeContext';
import Home from './components/Home';
import Error from './components/Error';
import NavBar from './components/NavBar';

function App() {
  const {darkTheme} = useContext(ThemeContext);
  return (
    <div style={darkTheme?{background: "#484c54"}:{}}>
      <LocationProvider>
        <NavBar/>
        <Switch>
            <Route path='/' render={() => (
                <Home/>)} exact/>
            <Route path='/weather' render={() => (
                <WeatherDash/>)}
            />
            <Route path='/restaurants' render={() => (
                <RestaurantDash/>)}
            />
            <Route component={Error} />
        </Switch>
      </LocationProvider>
    </div>
  );
}

export default App;
