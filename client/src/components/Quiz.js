import React from 'react';
import useStateContext from '../hooks/useStateContext';
import { useState, useEffect } from 'react';
import { createAPIEndpoint, ENDPOINTS, BASE_URL } from '../api';
import { useNavigate } from 'react-router';

import {
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  CardMedia,
  Stack,
  Card,
  CardContent,
  Typography,
  CardHeader,
  LinearProgress,
  Box,
} from '@mui/material';

import { getFormatedTime } from '../helper';

export default function Quiz() {
  const [qns, setQns] = useState([]);
  const [qnIndex, setQnIndex] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const { context, setContext } = useStateContext();
  const navigate = useNavigate();
  const [selectedValue , setSelectedValue] = useState(0);

  let timer;

  const startTimer = () => {
    timer = setInterval(() => {
      setTimeTaken((prev) => prev + 1);
    }, [1000]);
  };

  useEffect(() => {
    setContext({
      timeTaken: 0,
      selectedOptions: [],
    });
    createAPIEndpoint(ENDPOINTS.question)
      .fetch()
      .then((res) => {
        setQns(res.data);
        startTimer();
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleAnswerChange = (e) => {
    const optionIdx = +e.target.value || 0;
    const qnId = qns[qnIndex].qnId;
    setSelectedValue(optionIdx);
    setContextOptions(qnId, optionIdx)
  };

  const setContextOptions = (qnId, optionIdx) => {
    const temp = [...context.selectedOptions];

    let selectedOption = temp.find(function(option) {
      return option.qnId === qnId;
    });

    if(!selectedOption) {
      temp.push({
        qnId,
        selected: optionIdx,
      });
    } else {
      selectedOption.selected = optionIdx;
    }
   
    setContext({ selectedOptions: [...temp] });
  };

  const hanldeSelectedValue = (index) => {
    let selectedOption = context.selectedOptions.find(function(option) {
      return option.qnId === qns[index].qnId;
    });

    let selectedValue = selectedOption ? +selectedOption.selected : 0;

    if(!selectedOption) {
      setContextOptions( qns[index].qnId, selectedValue );
    }

    setSelectedValue(selectedValue);
  }

  const handleNextClick = () => {
    const nextIndex = qnIndex + 1;
    setQnIndex(nextIndex);
    hanldeSelectedValue(nextIndex);  
  };

  const handlePrevClick = () => {
    const prevIndex = qnIndex !== 0 && qnIndex - 1;
    setQnIndex(prevIndex);
    hanldeSelectedValue(prevIndex);
  };

  const handleSubmit = () => {
    setContext({timeTaken});
    navigate('/result');
  };

  return (
    qns.length !== 0 && (
      <>
        <Card  sx={{
                    maxWidth: 640, mx: 'auto', mt: 5,
                    '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' }
                }}>
          <CardHeader
            title={'Câu hỏi số ' + (qnIndex + 1) + '/' + qns.length}
            action={<Typography>{getFormatedTime(timeTaken)}</Typography>}
          />
          <Box>
            <LinearProgress
              variant="determinate"
              value={((qnIndex + 1) * 100) / qns.length}
            />
          </Box>
          {qns[qnIndex].imageName != null ? (
            <CardMedia
              component="img"
              image={BASE_URL + 'images/' + qns[qnIndex].imageName}
              sx={{ width: '200px', m: '10px auto' }}
            />
          ) : null}
          <CardContent>
            <Typography variant="h6">{qns[qnIndex].qnInWords}</Typography>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              onChange={handleAnswerChange}
              value={selectedValue}
            >
              {qns[qnIndex].options.map((item, index) => (
                <FormControlLabel
                  key={index}
                  value={index}
                  control={<Radio />}
                  label={item}
                />
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Stack
          direction="row"
          mt={2}
          spacing={2}
          sx={{ justifyContent: 'center' }}
        >
          <Button
            onClick={handlePrevClick}
            disabled={qnIndex === 0}
            variant="outlined"
          >
            Trước
          </Button>

          {qnIndex > qns.length - 2 ? (
            <Button onClick={handleSubmit} variant="contained">
              Xong
            </Button>
          ) : (
            <Button onClick={handleNextClick} variant="outlined">
              Sau
            </Button>
          )}
        </Stack>
      </>
    )
  );
}
