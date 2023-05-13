import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Layout from './components/Layout';
import Authenticate from './components/Authenticate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Authenticate />}> 
          <Route element={<Layout />} >
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
          </Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
