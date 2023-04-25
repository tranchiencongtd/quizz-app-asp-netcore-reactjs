import React from 'react';
import useStateContext from '../hooks/useStateContext';

export default function Quiz() {
  const [qns, setQns] = useState([]);
  const [qnIndex, setQnIndex] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const { context, setContext } = useStateContext();
  const navigate = useNavigate();

  let timer;

  const startTimer = () => {
      timer = setInterval(() => {
          setTimeTaken(prev => prev + 1)
      }, [1000])
  }

  useEffect(() => {
    setContext({
        timeTaken: 0,
        selectedOptions: []
    })
    createAPIEndpoint(ENDPOINTS.question)
        .fetch() 
        .then(res => {
            setQns(res.data)
            startTimer()
        })
        .catch(err => { console.log(err); })

    return () => { clearInterval(timer) }
}, [])

  return (
    <div>Question</div>
  )
}

