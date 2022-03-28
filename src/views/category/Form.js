import { useState } from 'react'
import Uppy from '@uppy/core'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import { DragDrop } from '@uppy/react'
import { useHistory } from 'react-router-dom'
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
    CustomInput,
    Spinner
} from 'reactstrap'
import { FaPencilAlt, FaTextHeight } from 'react-icons/fa'
import Action from '../../middleware/API'
const CategoryForm = () => {
    //  file Uploader
    const [img, setImg] = useState(null)
    //image preview
    const [preview, setPreview] = useState('')
    //for spin
    const [success, setSuccess] = useState(false)

    // data to post 
    const [category, setCategory] = useState({
        heading: '',
        text: ''

    })
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
    //post api
    console.log(data)
    const postCategory = async (e) => {
        e.preventDefault()
        const res = await Action.post("/category", data)
        
        if (res.data.success) {
            toast.success(<SuccessToast title="Success" text="Category added Successfully!" />)
            history.push('/category/list')
            setSuccess(true)

        } else {
            console.log(error)
            setSuccess(false)
            toast.error(<ErrorToast title="error" text="Something went wrong, try again later" />)
        }

    }

    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Add New Category</CardTitle>
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


                        <Col sm='12' className="mt-2">
                            {/* basic image upload */ }

                            <h6> Category Image </h6>
                            <DragDrop uppy={ uppy } onChange={ (e) => console.log('kjdheuidh') } />
                            { img !== null ? <img className='rounded mt-2' src={ preview } alt='avatar' /> : null }
                        </Col>

                        <Col sm='12' className="mt-4">
                            <FormGroup className='d-flex mb-0'>
                                <Button.Ripple className='mr-1' color='primary' type='submit' onClick={ (e) => postCategory(e) }>
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
