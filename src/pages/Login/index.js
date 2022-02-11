import { Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import CustomInput from '../../components/CustomInput';
import loginService from '../../services/loginService';
import { ReactComponent as Logo } from '../../icons/LogoBlue.svg';
import parsedErrors from '../../utils/errorParser';
import StyledButton from '../../components/StyledButton';


const Login = () => {
  const history = useHistory();
  const initialValues = {
    username: "",
    password: "",
  }
  
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required()
  })

  const login = async (values, setErrors) => {
    try{
      const user = await loginService.login(values)
      window.localStorage.setItem(
        'blogappuser', JSON.stringify(user)
      )
      history.push('/posts')
    } catch(error) {
      await setErrors(parsedErrors(error.response.data.error))
    }
  };

  return(
    <div className="grid place-items-center"> {/* grid container */}
      <div className="flex flex-col items-center w-full sm:w-96 p-4"> {/* form container*/}
        <div className="mb-4 text-2xl font-semibold self-start">
            <Logo className="h-8 mb-8"/>  {/* svg */}
            Log in to twitter
        </div>
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, {setErrors}) => {
         await login(values,setErrors)
        }}
        > 
          {({isValid, dirty}) => (
            <Form className="flex-col w-full">
              <CustomInput label="Username" name="username" type="text" />
              <CustomInput label="Password" name="password" type="password" />
              <StyledButton filled type="submit" disabled={!isValid || !dirty}>Log in</StyledButton>
            </Form>
          )}
          
        </Formik>
        <Link className="mt-4 self-center text-primary text-sm" to='/signup'>Sign up</Link>
      </div>

    </div>
  )
}

export default Login