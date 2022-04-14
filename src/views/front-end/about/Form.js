import { useState, useEffect } from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import '../../../@core/scss/react/libs/editor/editor.scss'
import Action from '../../../middleware/API'
import { stateFromHTML } from 'draft-js-import-html'
import { stateToHTML } from 'draft-js-export-html'
import { useHistory } from 'react-router-dom'
//import toast types from components 
import { SuccessToast, ErrorToast } from '../../components/toastify'
//import toasts from react
import { toast } from 'react-toastify'

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
import { FaTextWidth } from 'react-icons/fa'
import { AiOutlineLink } from 'react-icons/ai'


const AboutForm = () => {
  //iocns 
  const [icon1, setIcon1] = useState(null)
  const [icon2, setIcon2] = useState(null)
  const [icon3, setIcon3] = useState(null)
  const [icon4, setIcon4] = useState(null)
  const [id, setId] = useState('')
  const [text, setText] = useState({
    text1: '',
    text2: '',
    text3: '',
    text4: '',
    video: ''
  })
  //text editor
  const [value, setValue] = useState(EditorState.createEmpty())
  const [loading, setLoading] = useState(false)

  //conveting the text from editor into plain html
  const paraToHtml = stateToHTML(value.getCurrentContent())
  //redirect url 
  const history = useHistory()

  //get about us
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const { data } = await Action.get('/about', {})
        const res = data.data[0]
        setId(res._id)

        //setting the intial value before update
        setValue(EditorState.createWithContent(stateFromHTML(res.text)))
        setText({
          text1: res.txt1,
          text2: res.txt2,
          text3: res.txt3,
          text4: res.txt4,
          video: res.video
        })
      } catch (error) {
        console.log(error)
      }

    }
    fetchAboutData()
  }, [])
  const onChangeDetails = (e) => {
    const { name, value } = e.target
    setText(e => {
      return {
        ...e,
        [name]: value
      }
    })
  }
  //update api 
  const updatedData = {
    txt1: text.text1,
    txt2: text.text2,
    txt3: text.text3,
    txt4: text.text4,
    video: text.video,
    text: paraToHtml
  }

  const updateAbout = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await Action.put(`/about/${ id }`, updatedData, {})
    if (res.data.success) {
      toast.success(<SuccessToast title="Success" text="Section updated Successfully!" />)
      history.push('/frontend/about')

    } else {
      setSuccess(false)
      toast.error(<ErrorToast title="error" text="Something went wrong, try again later" />)
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>About Form</CardTitle>
      </CardHeader>
      <CardBody>

        <Col sm='12' className="my-2 p-0">
          {/* text editor */ }
          <h6>About Content </h6>
          <Editor editorState={ value } onEditorStateChange={ data => setValue(data) } />
        </Col>
        <Form>
          <Row>

            <Col md="6" sm='12'>
              <FormGroup >
                <Label for='icon'>Upload Icon</Label>
                <CustomInput onChange={ (e) => setIcon1(e.target.files[0]) } name="icon1" type='file' id='icon' />
              </FormGroup>

            </Col>

            <Col md="6" sm="12">
              {/* about form */ }
              <Label for='icon-text'>Icon Text</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FaTextWidth size={ 15 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name='text1' value={ text.text1 } id='icon-text' placeholder='Enter your icon text' onChange={ onChangeDetails } />
              </InputGroup>
            </Col>

            <Col md="6" sm='12'>
              <FormGroup>
                <Label for='icon'>Upload Icon</Label>
                <CustomInput onChange={ (e) => setIcon2(e.target.files[0]) } type='file' id='icon' name='customFile' />
              </FormGroup>

            </Col>

            <Col md="6" sm="12">
              {/* about form */ }
              <Label for='icon-text'>Icon Text</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FaTextWidth size={ 15 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name='text2' value={ text.text2 } id='icon-text' placeholder='Enter your icon text' onChange={ onChangeDetails } />
              </InputGroup>
            </Col>


            <Col md="6" sm='12'>
              <FormGroup>
                <Label for='icon'>Upload Icon</Label>
                <CustomInput onChange={ (e) => setIcon3(e.target.files[0]) } type='file' id='icon' name='customFile' />
              </FormGroup>

            </Col>

            <Col md="6" sm="12">
              {/* about form */ }
              <Label for='icon-text'>Icon Text</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FaTextWidth size={ 15 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name='text3' value={ text.text3 } id='icon-text' placeholder='Enter your icon text' onChange={ onChangeDetails } />
              </InputGroup>
            </Col>

            <Col md="6" sm='12'>
              <FormGroup>
                <Label for='icon'>Upload Icon</Label>
                <CustomInput onChange={ (e) => setIcon4(e.target.files[0]) } type='file' id='icon' name='customFile' />
              </FormGroup>

            </Col>

            <Col md="6" sm="12">
              {/* about form */ }
              <Label for='icon-text'>Icon Text</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FaTextWidth size={ 15 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name='text4' value={ text.text4 } id='icon-text' placeholder='Enter your icon text' onChange={ onChangeDetails } />
              </InputGroup>
            </Col>

            <Col sm="12">
              {/* about form */ }
              <Label for='url'>Video Url</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <AiOutlineLink size={ 15 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name='video' value={ text.video } onChange={ onChangeDetails } placeholder='Enter your Video Url' />

              </InputGroup>
            </Col>


            <Col sm="12" className="mt-2">
              <FormGroup className='d-flex mb-0'>
                <Button.Ripple className='mr-1' color='primary' type='submit' onClick={ e => updateAbout(e) }>
                  Submit
                </Button.Ripple>
                { loading ? <Spinner color='primary' /> : null }

              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}
export default AboutForm