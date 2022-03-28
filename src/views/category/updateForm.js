import { useState, useEffect } from 'react'
import Uppy from '@uppy/core'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import { DragDrop } from '@uppy/react'
import { useHistory, useLocation } from 'react-router-dom'
import '../../@core/scss/react/libs/editor/editor.scss'
import '../../@core/scss/react/libs/file-uploader/file-uploader.scss'
import 'uppy/dist/uppy.css'
//import toast types from components 
import { SuccessToast, ErrorToast } from '../components/toastify'
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
  Spinner
} from 'reactstrap'
import { FaPencilAlt, FaTextHeight } from 'react-icons/fa'
import Action from '../../middleware/API'
import BaseURL from '../../middleware/BaseURL'
const CategoryForm = () => {
  //  file Uploader
  const [img, setImg] = useState(null)
  const [success, setSuccess] = useState(false)
  const [preview, setPreview] = useState(null)
  //getting id from url
  const _id = new URLSearchParams(useLocation().search).get('_id')

  //for updating the route
  const history = useHistory()

  const [category, setCategory] = useState({
    heading: '',
    text: ''

  })

  useEffect(() => {
    //getting the selected category
    const getSingleCate = async () => {
      try {
        const { data } = await Action.get(`/category?_id=${ _id }`)
        const res = (data.data[0])
        // setting up the intial images and textes
        setImg(res.image)
        setCategory({
          heading: res.heading,
          text: res.text
        })

      } catch (error) {
        console.log(error)
      }
    }
    getSingleCate()
  }, [])

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
  const onChangeEvent = (e) => {
    const { name, value } = e.target
    setCategory(e => {
      return {
        ...e,
        [name]: value
      }
    })
  }
  //combinin all data
  const data = new FormData()
  data.append('heading', category.heading)
  data.append('text', category.text)
  data.append('file', img)
  //put api
  const updateCategory = async (e) => {
    e.preventDefault()
    setSuccess(true)

    const res = await Action.put(`/category/${ _id }`, data, {})
    if (res.data.success) {
      toast.success(<SuccessToast title="Success" text="Category updated Successfully!" />)
      history.push('/category/list')
    } else {
      console.log(res.data.message)
      setSuccess(false)
      toast.error(<ErrorToast title="error" text={ res.data.message } />)
    }

  }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Edit the Category</CardTitle>
      </CardHeader>
      <CardBody>
        <Form>
          <Row>
            <Col sm='12'>
              {/* category form */ }
              <Label for='name'>Category Name</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FaPencilAlt size={ 15 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name='heading' value={ category.heading } id='name'
                  onChange={ onChangeEvent }
                  placeholder='Enter Category Name' />
              </InputGroup>
            </Col>
            <Col sm='12' md="6">
              {/* category form */ }
              <Label for='descrip'>Category Description</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <FaTextHeight size={ 15 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' name='text' id='descrip' value={ category.text } placeholder='Enter Your Category description'
                  onChange={ onChangeEvent } />
              </InputGroup>
            </Col>

            {/* basic image upload */ }

            {/* <Col md='6' sm='12'>
              <FormGroup>
                <Label for='exampleCustomFileBrowser'>Category icon</Label>
                <CustomInput type='file' id='exampleCustomFileBrowser' onChange={ (e) => {
                  setIcon(e.target.files[0].name)
                } } name='customFile' />
              </FormGroup>
            </Col> */}

            <Col sm='12' className="mt-2">
              {/* basic image upload */ }

              <h6> Category Image </h6>
              <DragDrop uppy={ uppy } />
              { img !== null ? <img className='rounded mt-2' height={ 200 } width={ 'auto' } src={ preview ? preview : BaseURL + img } alt='avatar' /> : null }
            </Col>

            <Col sm='12' className="mt-4">
              <FormGroup className='d-flex mb-0'>
                <Button.Ripple className='mr-1' color='primary' type='submit' onClick={ (e) => updateCategory(e) }>
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
export default CategoryForm
