import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />} >
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
