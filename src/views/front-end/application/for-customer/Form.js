import { useState, useEffect } from 'react'
import Uppy from '@uppy/core'
import { useHistory } from 'react-router-dom'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import { DragDrop } from '@uppy/react'
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
import Action from '../../../../middleware/API'
import baseURL from '../../../../middleware/BaseURL'
import { FaTextWidth } from 'react-icons/fa'
import '../../../../@core/scss/react/libs/file-uploader/file-uploader.scss'
import 'uppy/dist/uppy.css'
//import toast types from components 
import { SuccessToast, ErrorToast } from '../../../components/toastify'
//import toasts from react
import { toast } from 'react-toastify'
const CustomerForm = () => {

  const [allData, setAllData] = useState({
    heading1: '',
    text1: '',
    heading2: '',
    text2: '',
    heading3: '',
    text3: '',
    heading4: '',
    text4: ''
  })
  //  file Uploader
  const [img, setImg] = useState(null)
  const [preview, setPreview] = useState(null)
  const [id, setId] = useState('')
  //for spin
  const [success, setSuccess] = useState(false)

  //for updating the route
  const history = useHistory()

  const uppy = new Uppy({
    meta: { type: 'avatar' },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true
  })

  uppy.use(thumbnailGenerator)

  uppy.on('thumbnail:generated', (file, preview) => {
    setImg(file.data)
    setPreview(preview)
  })
  //get api
  useEffect(() => {
    //using promise 
    const getData = async () => {
      //if else
      try {
        const { data } = await Action.get('/customer')
        const res = data.data[0]
        setId(res._id)
        //updating intial state
        setAllData({
          heading1: res.heading1,
          text1: res.text1,
          heading2: res.heading2,
          text2: res.text2,
          heading3: res.heading3,
          text3: res.text3,
          heading4: res.heading4,
          text4: res.text4
        })
        setImg(res.image)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])
  //onchange
  const eventChange = (e) => {
    const { name, value } = e.target
    setAllData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  //combinin all data
  const newData = new FormData()
  newData.append('heading1', allData.heading1)
  newData.append('heading2', allData.heading2)
  newData.append('heading3', allData.heading3)
  newData.append('heading4', allData.heading4)
  newData.append('text1', allData.text1)
  newData.append('text2', allData.text2)
  newData.append('text3', allData.text3)
  newData.append('text4', allData.text4)
  newData.append('file', img)

  //put api
  const updateData = async (e) => {
    e.preventDefault()
    const res = await Action.put(`/customer/${ id }`, newData)

    if (res.data.success) {
      toast.success(<SuccessToast title="Success" text="Section updated Successfully!" />)
      setSuccess(true)
      setTimeout(() => {
        history.push('/frontend/app/customer')
      }, 1000)

    } else {
      console.log(error)
      setSuccess(false)
      toast.error(<ErrorToast title="error" text="Something went wrong, try again later" />)
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Edit For Customer Section</CardTitle>
      </CardHeader>
      <CardBody>
        <Form>
          <Row>
            <Col sm='12' className="my-2">
              {/* basic image upload */ }

              <h6> Upload Application Image </h6>
              <DragDrop uppy={ uppy } />
              { img !== null ? <img className='rounded mt-2' height={ 200 } src={ preview ? preview : baseURL + img } alt='avatar' /> : null }
            </Col>

            <Col sm="12" md="6">
              {/* customer form */ }
              <Label for='icon-heading'>Heading</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FaTextWidth size={ 15 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name="heading1" value={ allData.heading1 } onChange={ eventChange } id='icon-heading' placeholder='Enter your Heading' />
              </InputGroup>
            </Col>


            <Col sm="12" md="6">
              {/* customer form */ }
              <Label for='icon-text'>Text</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FaTextWidth size={ 15 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name="text1" value={ allData.text1 } onChange={ eventChange } id='icon-text' placeholder='Enter your Text' />
              </InputGroup>
            </Col>
            <Col sm="12" md="6">
              {/* customer form */ }
              <Label for='icon-heading'>Heading</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FaTextWidth size={ 15 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name="heading2" value={ allData.heading2 } onChange={ eventChange } id='icon-heading' placeholder='Enter your Heading' />
              </InputGroup>
            </Col>


            <Col sm="12" md="6">
              {/* customer form */ }
              <Label for='icon-text'>Text</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FaTextWidth size={ 15 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name="text2" value={ allData.text2 } onChange={ eventChange } id='icon-text' placeholder='Enter your Text' />
              </InputGroup>
            </Col>
            <Col sm="12" md="6">
              {/* customer form */ }
              <Label for='icon-heading'>Heading</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FaTextWidth size={ 15 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name="heading3" value={ allData.heading3 } onChange={ eventChange } id='icon-heading' placeholder='Enter your Heading' />
              </InputGroup>
            </Col>


            <Col sm="12" md="6">
              {/* customer form */ }
              <Label for='icon-text'>Text</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FaTextWidth size={ 15 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name="text3" value={ allData.text3 } onChange={ eventChange } id='icon-text' placeholder='Enter your Text' />
              </InputGroup>
            </Col>


            <Col sm="12" md="6">
              {/* customer form */ }
              <Label for='icon-heading'>Heading</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FaTextWidth size={ 15 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name="heading4" value={ allData.heading4 } name="heading4" value={ allData.heading4 } onChange={ eventChange } id='icon-heading' placeholder='Enter your Heading' />
              </InputGroup>
            </Col>
            <Col sm="12" md="6">
              {/* customer form */ }
              <Label for='icon-text'>Text</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FaTextWidth size={ 15 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name="text4" value={ allData.text4 } onChange={ eventChange } id='icon-text' placeholder='Enter your Text' />
              </InputGroup>
            </Col>
            <Col sm="12" className="mt-2">
              <FormGroup className='d-flex mb-0'>
                <Button.Ripple className='mr-1' color='primary' type='submit' onClick={ e => updateData(e) }>
                  Submit
                </Button.Ripple>
                {/* spinner */ }
                { success ? <Spinner color='primary' /> : null }
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}
export default CustomerForm
