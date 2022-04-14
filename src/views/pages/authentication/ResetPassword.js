import { Link, useHistory } from 'react-router-dom'
import { useState, useContext } from 'react'
import { ChevronLeft } from 'react-feather'
import { EmailContext } from '@src/utility/context/Can'
import InputPassword from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Button, Spinner } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import Logo from '../../../../src/assets/images/logo/logo2.png'
import source from '@src/assets/images/pages/reset-password-v2-dark.svg'
import Action from '../../../middleware/API'

//import toast types from components 
import { SuccessToast, ErrorToast } from '../../components/toastify'
//import toasts from react
import { toast } from 'react-toastify'

const ResetPasswordV2 = () => {
  const history = useHistory()
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const [Email] = useContext(EmailContext)
  const [loading, setLoading] = useState(false)
  const Submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await Action.post(`auth/resetpassword`, {
      email: Email,
      password: passwords.newPassword,
      confirmpassword: passwords.confirmPassword
    })
    console.log(res)
    if (res.data.success) {
      toast.success(<SuccessToast title="Success" text={ res.data.message } />)
      history.push('/')

    } else {
      setLoading(false)
      toast.error(<ErrorToast title="error" text={ res.data.message } />)

    }

  }
  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={ e => e.preventDefault() }>
          <img src={ Logo } width="200" height="auto" alt="" />

        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={ source } alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Reset Password
            </CardTitle>
            <CardText className='mb-2'>Your new password must be different from previously used passwords</CardText>
            <Form className='auth-reset-password-form mt-2' onSubmit={ e => e.preventDefault() }>
              <FormGroup>
                <Label className='form-label' for='new-password'>
                  New Password
                </Label>
                <InputPassword className='input-group-merge' value={ passwords.newPassword } onChange={ (e) => setPasswords({ ...passwords, newPassword: e.target.value }) } id='new-password' autoFocus />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='confirm-password'>
                  Confirm Password
                </Label>
                <InputPassword className='input-group-merge' value={ passwords.confirmPassword } onChange={ (e) => setPasswords({ ...passwords, confirmPassword: e.target.value }) } id='confirm-password' />
              </FormGroup>
              <Button.Ripple color='primary' block onClick={ (e) => Submit(e) }>
                Set New Password
                {/* spinner */ }
                { loading ? <Spinner color='light' size="sm" className="mx-1" /> : null }

              </Button.Ripple>
            </Form>
            <p className='text-center mt-2'>
              <Link to='/otp'>
                <ChevronLeft className='mr-25' size={ 14 } />
                <span className='align-middle'>Back to Otp</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default ResetPasswordV2
