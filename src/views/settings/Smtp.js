import { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
  Spinner
} from 'reactstrap'
import Action from '../../middleware/API'
//import toast types from components 
import { SuccessToast, ErrorToast } from '../components/toastify'
//import toasts from react
import { toast } from 'react-toastify'

const GeneralSettings = () => {
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState('')
  const [smtp, setSmtp] = useState({
    Host: "",
    port: null,
    username: "",
    pasword: "",
    mail_address: "",
    mail_name: ""
  })
  console.log(smtp)
  useEffect(() => {
    //using promise 
    const getSmtp = async () => {
      //if else
      try {
        const { data } = await Action.get('/smtp')
        const res = data.data[0]
        setSmtp({
          Host: res.Host,
          port: res.port,
          username: res.username,
          pasword: res.pasword,
          mail_address: res.mail_address,
          mail_name: res.mail_name
        })
        setId(res._id)
        console.log(data.data[0])
      } catch (error) {
        console.log(error)
      }
    }
    getSmtp()
  }, [])
  const eventOnChange = (e) => {
    const { name, value } = e.target
    setSmtp((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  console.log(id)
  //put api 
  const UpdateSmpt = async (e) => {
    e.preventDefault()
    const res = await Action.put(`/smtp/${ id }`, smtp, {})
    setLoading(true)
    if (res.data.data.acknowledged) {
      setTimeout(() => {
        toast.success(<SuccessToast title="Success" text="Smtp settings updated Successfully!" />)
        setLoading(false)
      }, 1000)

    } else {
      setLoading(false)
      toast.error(<ErrorToast title="error" text="Something went wrong, try again later" />)
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>SMTP Configuration</CardTitle>
      </CardHeader>
      <CardBody>
        <Form>
          <Row>
            <Col className='mb-1' md='6' sm='12'>
              <FormGroup>
                <Label for='MAIL-HOST'>MAIL HOST</Label>
                <Input onChange={ eventOnChange } name="Host" value={ smtp.Host } type='text' id='MAIL-HOST' placeholder='Enter Your MAIL HOST' />
              </FormGroup>
            </Col>
            <Col className='mb-1' md='6' sm='12'>
              <FormGroup>
                <Label for='MAIL-PORT'>MAIL PORT</Label>
                <Input onChange={ eventOnChange } name="port" value={ smtp.port } type='text' id='MAIL-PORT' placeholder='Enter Your MAIL PORT' />
              </FormGroup>
            </Col>
            <Col className='mb-1' md='6' sm='12'>
              <FormGroup>
                <Label for='MAIL-USERNAME'>MAIL USERNAME</Label>
                <Input onChange={ eventOnChange } name="username" value={ smtp.username } type='text' id='MAIL-USERNAME' placeholder='Enter Your MAIL USERNAME' />
              </FormGroup>
            </Col>
            <Col className='mb-1' md='6' sm='12'>
              <FormGroup>
                <Label for='MAIL-PASSWORD'>MAIL PASSWORD</Label>
                <Input onChange={ eventOnChange } name="pasword" value={ smtp.pasword } type='password' id='MAIL-PASSWORD' placeholder='Enter Your MAIL PASSWORD' />
              </FormGroup>
            </Col>
            <Col className='' md='6' sm='12'>
              <FormGroup>
                <Label for='MAIL-ADDRESS'>MAIL FROM ADDRESS</Label>
                <Input onChange={ eventOnChange } name="mail_address" value={ smtp.mail_address } type='email' id='MAIL-ADDRESS' placeholder='Enter Your MAIL FROM ADDRESS' />
              </FormGroup>
            </Col>
            <Col className='' md='6' sm='12'>
              <FormGroup>
                <Label for='MAIL-NAME'>MAIL FROM NAME</Label>
                <Input onChange={ eventOnChange } name="mail_name" value={ smtp.mail_name } type='email' id='MAIL-NAME' placeholder='Enter Your MAIL FROM NAME' />
              </FormGroup>
            </Col>

            <Col sm='12' className="mt-2">
              <FormGroup className='d-flex mb-0'>
                <Button.Ripple className='mr-1' color='primary' type='submit' onClick={ e => UpdateSmpt(e) }>
                  Submit
                </Button.Ripple>
                {/* spinner */ }
                { loading ? <Spinner color='primary' /> : null }
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}
export default GeneralSettings