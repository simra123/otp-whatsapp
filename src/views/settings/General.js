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
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  CustomInput,
  Spinner
} from 'reactstrap'
import { GrAndroid } from 'react-icons/gr'
import { AiOutlineMail, AiOutlinePhone, AiOutlineApple } from 'react-icons/ai'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import Action from '../../middleware/API'
import { FaPencilAlt, FaFacebook, FaTwitter, FaLinkedinIn, FaGooglePlus } from 'react-icons/fa'
//import toast types from components 
import { SuccessToast, ErrorToast } from '../components/toastify'
//import toasts from react
import { toast } from 'react-toastify'
const GeneralSettings = () => {

  const [generalData, setGeneralData] = useState({
    mobile: null,
    email: '',
    address: '',
    website: '',
    facebook: '',
    googlePlus: '',
    twitter: '',
    linkedin: '',
    androidUrl: '',
    iosUrl: ''
  })
  console.log(generalData)
  const [header, setHeader] = useState(null)
  const [footer, setFooter] = useState(null)
  console.log(header)
  const [id, setId] = useState(null)

  useEffect(() => {
    //using promise 
    const getSettings = async () => {
      try {
        const { data } = await Action.get('/setting')
        const res = data.data[0]
        setGeneralData({
          mobile: res.Phone,
          email: res.Email,
          address: res.Address,
          website: res.website_name,
          facebook: res.facebook,
          googlePlus: res.google,
          twitter: res.twitter,
          linkedin: res.linkedin,
          androidUrl: res.android_url,
          iosUrl: res.ios_url
        })
        setHeader(res.header_image)
        setFooter(res.footer_image)
        setId(res._id)
      } catch (error) {
        console.log(error)
      }
    }
    getSettings()
  }, [])
  const [success, setSuccess] = useState(false)

  //asigning all values thru on change 
  const eventOnChange = (e) => {
    const { name, value } = e.target
    setGeneralData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  const newData = new FormData()
  newData.append('website_name', generalData.website)
  newData.append('android_url', generalData.androidUrl)
  newData.append('ios_url', generalData.iosUrl)
  newData.append('facebook', generalData.facebook)
  newData.append('google', generalData.googlePlus)
  newData.append('twitter', generalData.twitter)
  newData.append('linkedin', generalData.linkedin)
  newData.append('Address', generalData.address)
  newData.append('Phone', Number(generalData.mobile))
  newData.append('Email', generalData.email)
  newData.append('file', header)
  newData.append('file', footer)

  const updateSettings = async (e) => {
    e.preventDefault()
    setSuccess(true)
    const res = await Action.put(`/setting/${ id }`, newData, {})
    console.log(res)
    if (res.data.success) {
      setTimeout(() => {
        toast.success(<SuccessToast title="Success" text="settings updated Successfully!" />)
        setSuccess(false)
      }, 1000)
    } else {
      setSuccess(false)
      toast.error(<ErrorToast title="error" text={ res.data.message } />)
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>General Settings</CardTitle>
      </CardHeader>
      <CardBody>
        <Form>
          <Row>
            <Col sm='12'>
              {/* category form */ }
              <Label for='name'>Website name</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FaPencilAlt size={ 18 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name="website" value={ generalData.website } onChange={ eventOnChange } placeholder='Enter Your Website name' />
              </InputGroup>
            </Col>

            {/* basic image upload */ }
            <Col md='6' sm='12'>
              <FormGroup>
                <Label for='header'>Header Logo</Label>
                <CustomInput onChange={ (e) => setHeader(e.target.files[0]) } type='file' id='header' name='customFile' />
              </FormGroup>
            </Col>
            {/* basic image upload */ }
            <Col md='6' sm='12'>
              <FormGroup>
                <Label for='footer'>Footer Logo</Label>
                <CustomInput onChange={ (e) => setFooter(e.target.files[0]) } type='file' id='footer' name='customFile' />
              </FormGroup>
            </Col>
            <Col sm='12' md="6">
              {/* category form */ }
              <Label for='android'>Android App Url</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <GrAndroid size={ 18 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name="androidUrl" value={ generalData.androidUrl } onChange={ eventOnChange } placeholder='Enter Your Android App Url' />
              </InputGroup>
            </Col>
            <Col sm='12' md="6">
              {/* category form */ }
              <Label for='ios'>Ios App Url</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <AiOutlineApple size={ 18 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name="iosUrl" value={ generalData.iosUrl } onChange={ eventOnChange } placeholder='Enter Your Ios App Url' />
              </InputGroup>
            </Col>
            <Col sm='12' md="12" className="my-2">
              <h4>Social Media Links</h4>
            </Col>
            <Col sm='12' md="6">
              {/* category form */ }
              <Label for='facebook'>Facebook</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FaFacebook size={ 18 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name="facebook" value={ generalData.facebook } onChange={ eventOnChange } placeholder='Enter Your  Facebook Link' />
              </InputGroup>
            </Col>
            <Col sm='12' md="6">
              {/* category form */ }
              <Label for='google'>Google</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FaGooglePlus size={ 18 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name="googlePlus" value={ generalData.googlePlus } onChange={ eventOnChange } placeholder='Enter Your  google Link' />
              </InputGroup>
            </Col>
            <Col sm='12' md="6">
              {/* category form */ }
              <Label for='twitter'>Twitter</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FaTwitter size={ 18 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name="twitter" value={ generalData.twitter } onChange={ eventOnChange } placeholder='Enter Your Twitter Link' />
              </InputGroup>
            </Col>
            <Col sm='12' md="6">
              {/* category form */ }
              <Label for='LinkedIn'>LinkedIn</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FaLinkedinIn size={ 18 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name="linkedin" value={ generalData.linkedin } onChange={ eventOnChange } placeholder='Enter Your LinkedIn Link' />
              </InputGroup>
            </Col>
            <Col sm='12' md="12" className="my-2">
              <h4>Personal Info</h4>
            </Col>
            <Col sm='12' md="6">
              {/* category form */ }
              <Label for='address'> Address</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <HiOutlineLocationMarker size={ 18 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name="address" value={ generalData.address } onChange={ eventOnChange } placeholder='Enter Your  Address Link' />
              </InputGroup>
            </Col>
            <Col sm='12' md="6">
              {/* category form */ }
              <Label for='phone-number'>Phone Number</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <AiOutlinePhone size={ 18 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='number' name="mobile" value={ generalData.mobile } onChange={ eventOnChange } placeholder='Enter Your Phone Number' />
              </InputGroup>
            </Col>
            <Col sm='12' md="12">
              {/* category form */ }
              <Label for='email'>Email</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <AiOutlineMail size={ 18 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='email' name="email" value={ generalData.email } onChange={ eventOnChange } placeholder='Enter Your Email' />
              </InputGroup>
            </Col>
            <Col sm='12' className="mt-2">
              <FormGroup className='d-flex mb-0'>
                <Button.Ripple className='mr-1' color='primary' type='submit' onClick={ e => updateSettings(e) }>
                  Submit
                </Button.Ripple>
                { success ? <Spinner color='primary' /> : null }
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}
export default GeneralSettings