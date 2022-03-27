import { useState, useContext, Fragment } from 'react'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee } from 'react-feather'
import Logo from '../../../../src/assets/images/logo/logo2.png'
import LoginBg from '@src/assets/images/backgrounds/Marketing.png'
import {
  Alert,
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Button,
  Spinner
} from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import Action from '../../../middleware/API'
const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title font-weight-bold'>Welcome, {name}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>You have successfully logged in as an {role} user to Vuexy. Now you can start to explore. Enjoy!</span>
    </div>
  </Fragment>
)

const Login = props => {
  const [skin, setSkin] = useSkin()
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const history = useHistory()
  // const [email, setEmail] = useState('dfsdf@mail.com')
  // const [password, setPassword] = useState('dfdfdf')
  const [email, setEmail] = useState('admin@demo.com')
  const [password, setPassword] = useState('admin')
  // const [email, setEmail] = useState('khatri123@mail.com')
  // const [password, setPassword] = useState('dfdfdf')

  const { register, errors, handleSubmit } = useForm()
  // const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
  //   source = require(`@src/assets/images/pages/${illustration}`).default
  // const onSubmit = () => {

  //   Action
  //   .post("/auth/login", { email, password })
  //   .then(res => {
  //     console.log(res) 
  //   })
  //   }
  const Submit = () => {
    if (isObjEmpty(errors)) {
        useJwt
          .login({ email, password })
          .then(res => {
            const data = { ...res.data.userData, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken }
            console.log(data)
            dispatch(handleLogin(data))
            ability.update(res.data.userData.ability)
            history.push(getHomeRouteForLoggedInUser(1))
            toast.success(
              <ToastContent name={data.fullName || data.username || 'John Doe'} role={data.role || 'admin'} />,
              { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )

          })
          .catch(err => console.log(err))
      }

    //   Action
    //     .post("/auth/login", { email, password })
    //     .then(res => {
    //       console.log(res)
    //       const data = { ...res.data.data, accessToken: res.data.token, refreshToken: res.data.refreshToken }
    //       if (res.data.success === true) {
    //         const data = { ...res.data.data, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken }
    //         dispatch(handleLogin(data))
    //         ability.update([{ action: "manage", subject: "all" }])
    //         history.push(getHomeRouteForLoggedInUser(res.data.data.usetype))
    //         toast.success(
    //           <ToastContent name={res.data.data.name} role={res.data.data.usertype === 1 ? 'admin' : "client"} />,

    //           { transition: Slide, hideProgressBar: true, autoClose: 2000 }
    //         )
    //       } else {

    //         toast.error(
    //           <ToastContent name={res.data.data.name} role={res.data.data.usertype === 1 ? 'admin' : "client"} />,
    //           { transition: Slide, hideProgressBar: true, autoClose: 2000 }
    //         )
    //       }
    //     })
    //     .catch(err => console.log(err))
    // }   
  }
    return (
      <div className='auth-wrapper auth-v2'>
        <Row className='auth-inner m-0'>
          {/* <Link className='brand-logo lg:hidden' to='/' onClick={e => e.preventDefault()}>
      <img src={Logo} width="100" height="120" alt=""/>
    </Link> */}
          <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
            <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
              <img className='img-fluid' src={Logo} alt='Login' width="400" height="400" />
            </div>
          </Col>
          <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
            <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
              <CardTitle tag='h2' className='font-weight-bold mb-1'>
                Welcome to Admin!
              </CardTitle>
              <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
              <Form className='auth-login-form mt-2'>
                <FormGroup>
                  <Label className='form-label' for='login-email'>
                    Email
                  </Label>
                  <Input
                    autoFocus
                    type='email'
                    value={email}
                    id='login-email'
                    name='login-email'
                    placeholder='john@example.com'
                    onChange={e => setEmail(e.target.value)}
                    className={classnames({ 'is-invalid': errors['login-email'] })}
                    innerRef={register({ required: true, validate: value => value !== '' })}
                  />
                </FormGroup>
                <FormGroup>
                  <div className='d-flex justify-content-between'>
                    <Label className='form-label' for='login-password'>
                      Password
                    </Label>
                  </div>
                  <InputPasswordToggle
                    value={password}
                    id='login-password'
                    name='login-password'
                    className='input-group-merge'
                    onChange={e => setPassword(e.target.value)}
                    // className={classnames({ 'is-invalid': errors['login-password'] })}
                    innerRef={register({ required: true, validate: value => value !== '' })}
                  />
                </FormGroup>

                <FormGroup className="d-flex">
                  <CustomInput type='checkbox' className='custom-control-Primary mr-80' id='remember-me' label='Remember Me' />
                  <div className="ml-auto">
                    <Link to='/forgot-password'>
                      <small className="text-right">Forgot Password?</small>
                    </Link>
                  </div>
                </FormGroup>

                <Button.Ripple type='submit' color='primary' block onClick={(e) => {
                  e.preventDefault()
                  Submit()
                }}>
                  Sign in
                  {/* <Spinner color='light' />  */}
                </Button.Ripple>
              </Form>
            </Col>
          </Col>
        </Row>
      </div>
    )
  }


  export default Login
