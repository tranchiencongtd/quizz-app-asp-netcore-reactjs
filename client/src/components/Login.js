import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import Center from './Center';
import useForm from '../hooks/useForm';
import { createAPIEndpoint, ENDPOINTS } from '../api'

const getFreshModel = () => ({
  name: '',
  email: '',
});

export default function Login() {
  const { context, setContext, resetContext } = useStateContext();
  const navigate = useNavigate();

  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModel);

  const login = (e) => {
    e.preventDefault();
    if (validate())
      createAPIEndpoint(ENDPOINTS.participant)
        .post(values)
        .then((res) => {
          setContext({ participantId: res.data.participantId });
          navigate('/quiz');
        })
        .catch((err) => console.log(err));
      console.log(values);
  };

  const validate = () => {
    let temp = {};
    temp.email = /\S+@\S+\.\S+/.test(values.email) ? '' : 'Email không hợp lệ.';
    temp.name = values.name !== '' ? '' : 'Trường này không được để trống.';
    setErrors(temp);
    return Object.values(temp).every((x) => x === '');
  };

  return (
    <>
      <Center>
        <Card sx={{ width: 400 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ my: 3 }}>
              Quizz App
            </Typography>
            <Box
              sx={{
                '& .MuiTextField-root': {
                  m: 1, // margin: 1
                  width: '90%',
                },
              }}
            >
              <form onSubmit={login} noValidate autoComplete="off">
                <TextField
                  label="Email"
                  name="email"
                  variant="outlined"
                  value={values.email}
                  onChange={handleInputChange}
                  {...(errors.email && {
                    error: true,
                    helperText: errors.email,
                  })}
                />
                <TextField
                  label="Họ và tên"
                  name="name"
                  variant="outlined"
                  value={values.name}
                  onChange={handleInputChange}
                  {...(errors.name && { error: true, helperText: errors.name })}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ width: '90%' }}
                >
                  Start
                </Button>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Center>
    </>
  );
}
