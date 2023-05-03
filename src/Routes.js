import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from './LoginForm';
import Home from './Home';

//make routes protected and cannot use url

const App = () => {
  return (
    <Router>
      <div>
        <Routes 
        >
          <Route path="/" element={<LoginForm/>}/>
          <Route path="/314159265358979" 
           element={<Home/>}
          
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
