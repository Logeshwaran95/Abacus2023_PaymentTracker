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
          <Route path="/" element={<Home/>}/>
          {/* <Route path="/admin" 
           element={<Home/>}
          
          /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
