import { Routes, Route } from 'react-router-dom';
import './styles/app.scss';

import Navbar from './components/Navbar';
import Directions from './pages/Directions';
import Charge from './pages/Charge';
import SpotInfo from './pages/SpotInfo';
import News from './pages/News';
import Activity from './pages/Activity';
import NoMatch from './pages/NoMatch';


function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path={'/'} element={<SpotInfo />}></Route>
        <Route path={'/directions'} element={<Directions />}></Route>
        <Route path={'/charge'} element={<Charge />}></Route>
        <Route path={'/news'} element={<News />}></Route>
        <Route path={'/activity'} element={<Activity />}></Route>
        <Route path={'*'} element={<NoMatch />}></Route>
      </Routes>
    </div>
  );
}

export default App;
