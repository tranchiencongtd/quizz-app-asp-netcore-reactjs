import React,{useState} from 'react'
import { RadioGroup, FormControlLabel, Radio, Accordion, AccordionDetails, AccordionSummary, CardMedia, Chip, List, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { BASE_URL } from '../api';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';


export default function Answer({qnAnswers}) {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const markCorrectOrNot = (qna, idx) => {
        if ([qna.answer, qna.selected].includes(idx)) {
            return { sx: { color: qna.answer === idx ? 'green' : 'red' } }
        }
    } 
    
  return (
    <Box sx={{ mt: 5, width: '100%', maxWidth: 640, mx: 'auto' }}>
            {
                qnAnswers.map((item, j) => (<Accordion
                    disableGutters
                    key={j}
                    expanded={expanded === j}
                    onChange={handleChange(j)}>
                    <AccordionSummary expandIcon={<ExpandCircleDownIcon
                        sx={{
                            color: item.answer === item.selected ? 'green' : 'red'
                        }}
                    />}>
                        <Typography
                            sx={{ width: '90%', flexShrink: 0 }}>
                            {item.qnInWords}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {item.imageName ?
                            <CardMedia
                                component="img"
                                image={BASE_URL + 'images/' + item.imageName}
                                sx={{ m: '10px auto', width: '200px' }}
                            /> : null}
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={item.selected}
                            >
                            {item.options.map((el, i) => (
                                <FormControlLabel
                                key={i}
                                control={<Radio />}
                                label={el}
                                value={i}
                                {...markCorrectOrNot(item, i)}
                                />
                            ))}
                            </RadioGroup>
                    </AccordionDetails>
                </Accordion>))
            }

        </Box >
  )
}