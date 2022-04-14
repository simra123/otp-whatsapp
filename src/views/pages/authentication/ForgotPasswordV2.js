import { Link, useHistory } from 'react-router-dom'
import { useState, useContext } from 'react'
import { ChevronLeft } from 'react-feather'
import { EmailContext } from '@src/utility/context/Can'
import { Row, Col, CardTitle, CardText, Form, Spinner, FormGroup, Label, Input, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import Logo from '../../../../src/assets/images/logo/logo2.png'
import Action from '../../../middleware/API'
import source from '@src/assets/images/pages/reset-password-v2-dark.svg'

//import toast types from components
import { SuccessToast, ErrorToast } from '../../components/toastify'
//import toasts from react
import { toast } from 'react-toastify'

const ForgotPasswordV2 = () => {
  const history = useHistory()
  const [mail, setMail] = useState('')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useContext(EmailContext)

  const Submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await Action.post(`auth/otpsend`, {
      email: mail
    })
    console.log(res)
    if (res.data.success) {
      toast.success(<SuccessToast title="Success" text={ `${ res.data.message } to ${ mail }` } />)
      history.push('/otp')
      setEmail(mail)

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
              Forgot Password?
            </CardTitle>
            <CardText className='mb-2'>
              Enter your email and we'll send you instructions to reset your password
            </CardText>
            <Form className='auth-forgot-password-form mt-2' onSubmit={ e => e.preventDefault() }>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input type='email' id='login-email' placeholder='john@example.com' value={ mail } autoFocus onChange={ (e) => setMail(e.target.value) } />
              </FormGroup>
              <Button color='primary' onClick={ (e) => Submit(e) }>
                Send reset link
                {/* spinner */ }
                { loading ? <Spinner color='light' size="sm" className="mx-1" /> : null }
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <Link to='/login'>
                <ChevronLeft className='mr-25' size={ 14 } />
                <span className='align-middle'>Back to login</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div >
  )
}

export default ForgotPasswordV2
