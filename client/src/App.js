import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
          
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
         
        
      </Routes>
    </BrowserRouter >
  );
}

export default App;
