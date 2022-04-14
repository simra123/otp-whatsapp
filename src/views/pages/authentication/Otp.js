import { Link, useHistory } from 'react-router-dom'
import { useState, useContext } from 'react'
import { EmailContext } from '@src/utility/context/Can'
import { ChevronLeft } from 'react-feather'
import { Row, Col, CardTitle, CardText, Form, Spinner, FormGroup, Label, Input, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import Logo from '../../../../src/assets/images/logo/logo2.png'
import source from '@src/assets/images/pages/forgot-password-v2.svg'
import Action from '../../../middleware/API'

//import toast types from components 
import { SuccessToast, ErrorToast } from '../../components/toastify'
//import toasts from react
import { toast } from 'react-toastify'
const ForgotPasswordV2 = () => {
  const history = useHistory()
  const [otpUser, setOtp] = useState("")
  const [Email] = useContext(EmailContext)
  const [loading, setLoading] = useState(false)


  const Submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await Action.post(`auth/otpverify`, {
      email: Email,
      otp: otpUser
    })
    console.log(res)
    if (res.data.success) {
      toast.success(<SuccessToast title="Success" text={ res.data.message } />)
      history.push('/reset-password')

    } else {
      setLoading(false)
      toast.error(<ErrorToast title="error" text={ res.data.message } />)

    }

  }
  console.log(otpUser)
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
              OTP Code
            </CardTitle>
            <CardText className='mb-2'>
              Enter your otp code we have sent to your email
            </CardText>
            <Form className='auth-forgot-password-form mt-2' onSubmit={ e => e.preventDefault() }>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Otp
                </Label>
                <Row>
                  <Col xs="3">
                    <input
                      className="otp-input text-center"
                      type="text"
                      id="first"
                      maxlength="1"
                      onChange={ (e) => {
                        if (e.target.value === "") {
                          document.querySelector('#first').focus()
                          setOtp(otpUser.substring(0, otpUser.length - 1))
                        } else if (e.target.value) {
                          document.querySelector("#second").focus()
                          setOtp(otpUser + e.target.value)
                        }
                      } }
                    />

                  </Col>
                  <Col xs="3">
                    <input
                      className="otp-input text-center"
                      type="text"
                      id="second"
                      maxlength="1"
                      onChange={ (e) => {
                        if (e.target.value === "") {
                          document.querySelector('#first').focus()
                          setOtp(otpUser.substring(0, otpUser.length - 1))
                        } else if (e.target.value) {
                          document.querySelector("#third").focus()
                          setOtp(otpUser + e.target.value)
                        }
                      } }
                    />
                  </Col>
                  <Col xs="3">
                    <input
                      className="otp-input text-center"
                      type="text"
                      id="third"
                      maxlength="1"
                      onChange={ (e) => {
                        if (e.target.value === "") {
                          document.querySelector('#second').focus()
                          setOtp(otpUser.substring(0, otpUser.length - 1))
                        } else if (e.target.value) {
                          document.querySelector("#fourth").focus()
                          setOtp(otpUser + e.target.value)
                        }
                      } }
                    />
                  </Col>
                  <Col xs="3">
                    <input
                      className="otp-input text-center"
                      type="text"
                      id="fourth"
                      maxlength="1"
                      onChange={ (e) => {
                        if (e.target.value === "") {
                          document.querySelector('#third').focus()
                          setOtp(otpUser.substring(0, otpUser.length - 1))
                        } else if (e.target.value) {
                          setOtp(otpUser + e.target.value)
                        }
                      } }
                    />
                  </Col>
                </Row>
              </FormGroup>

              <Button color='primary' block onClick={ (e) => Submit(e) }>
                Change Password
                { loading ? <Spinner color='light' size="sm" className="mx-1" /> : null }

              </Button>
              {/* spinner */ }

            </Form>
            <p className='text-center mt-2'>
              <Link to='/forgot-password'>
                <ChevronLeft className='mr-25' size={ 14 } />
                <span className='align-middle'>Back to Forgot password</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default ForgotPasswordV2
