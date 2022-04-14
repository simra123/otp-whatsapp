import { useState, useContext, Fragment } from 'react'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { getHomeRouteForLoggedInUser } from '@utils'
import { Coffee } from 'react-feather'
import Logo from '../../../../src/assets/images/logo/logo2.png'
import LoginBg from '@src/assets/images/register.jpg'

import {
  Row,
  Col,
  CardTitle,
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
        <Avatar size='sm' color='success' icon={ <Coffee size={ 12 } /> } />
        <h6 className='toast-title font-weight-bold'>Welcome, { name }</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>You have successfully logged in as { role } user to CareInc. Enjoy!</span>
    </div>
  </Fragment>
)

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState('')
  const ability = useContext(AbilityContext)

  const { register, errors } = useForm()

  const Submit = async () => {
    setLoading(true)
    const res = await Action.post(`auth/login`, {
      email: Email,
      password: Password
    })
    if (res.data.success) {
      const userdata = res.data.data
      res.data.ability = [{ action: "manage", subject: "all" }]
      if (userdata.usertype === 1) {
        userdata.usertype = 'admin'
      } else if (userdata.usertype === 2) {
        userdata.usertype = "employee"
      } else {
        userdata.usertype = "customer"
      }
      console.log(userdata)

      dispatch(handleLogin(res.data))
      ability.update([{ action: "manage", subject: "all" }])
      history.push(getHomeRouteForLoggedInUser(1))
      toast.success(
        <ToastContent name={ userdata.name } role={ userdata.usertype } />,
        { transition: Slide, hideProgressBar: true, autoClose: 2500 }
      )

    } else {
      setLoading(false)
      setShowError(res.data.message)
    }

  }
  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo lg:hidden' to='/' onClick={ e => e.preventDefault() }>
          <img src={ Logo } width="200" height="auto" alt="" />
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={ LoginBg } alt='Login' width="auto" height="500" />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Welcome to Admin!
            </CardTitle>
            <Form className='auth-login-form mt-2'>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input
                  autoFocus
                  type='email'
                  value={ Email }
                  id='login-email'
                  name='login-email'
                  placeholder='john@example.com'
                  onChange={ e => setEmail(e.target.value) }
                  className={ classnames({ 'is-invalid': errors['login-email'] }) }
                  innerRef={ register({ required: true, validate: value => value !== '' }) }
                />
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                </div>
                <InputPasswordToggle
                  value={ Password }
                  id='login-password'
                  name='login-password'
                  className='input-group-merge'
                  onChange={ e => setPassword(e.target.value) }
                  // className={classnames({ 'is-invalid': errors['login-password'] })}
                  innerRef={ register({ required: true, validate: value => value !== '' }) }
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

              <Button.Ripple type='submit' color='primary' block onClick={ (e) => {
                e.preventDefault()
                Submit()
              } }>
                Sign in
                { loading ? <Spinner color='light' size="sm" className="mx-1" /> : null }
              </Button.Ripple>
              <span className='text-danger mt-2'>{ showError }</span>

            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  )
}


export default Login
