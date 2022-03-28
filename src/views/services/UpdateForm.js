import { useState, useEffect } from 'react'
import Uppy from '@uppy/core'
import { useHistory, useParams } from 'react-router-dom'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import { DragDrop } from '@uppy/react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { stateFromHTML } from 'draft-js-import-html'
import { stateToHTML } from 'draft-js-export-html'
import '../../@core/scss/react/libs/editor/editor.scss'
import '../../@core/scss/react/libs/file-uploader/file-uploader.scss'
import 'uppy/dist/uppy.css'
import Action from '../../middleware/API'
import baseURL from '../../middleware/BaseURL'
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
import { FaPencilAlt } from 'react-icons/fa'

const ServiceForm = () => {
    const { id } = useParams()


    console.log(id)
    //  file Uploader
    const [img, setImg] = useState(null)
    //image preview
    const [preview, setPreview] = useState('')

    //text editor
    const [value, setValue] = useState(EditorState.createEmpty())

    const [sName, setSName] = useState('')
    //getSingle service 
    useEffect(() => {
        const getService = async () => {
            try {
                const { data } = await Action.get(`/Service?_id=${ id }`)
                const res = data.data[0]
                setValue(EditorState.createWithContent(stateFromHTML(res.paragraph)))
                setSName(res.heading)
                setImg(res.image)
            } catch (error) {
                console.log(error)
            }

        }
        getService()
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
    console.log(img)
    //conveting the text from editor into plain html
    const paraToHtml = stateToHTML(value.getCurrentContent())
    //loading success 
    const [success, setSuccess] = useState(false)
    const data = new FormData()
    data.append('paragraph', paraToHtml)
    data.append('heading', sName)
    data.append('file', img)
    //redirect url 
    const history = useHistory()
    //post api
    const updateService = async (e) => {
        e.preventDefault()
        const res = await Action.put(`/Service/${ id }`, data, {})
        setSuccess(true)

        if (res.data.success) {
            toast.success(<SuccessToast title="Success" text="Service updated Successfully!" />)
            history.push('/services/list')
        } else {
            setSuccess(false)
            toast.error(<ErrorToast title="error" text="Something went wrong, try again later" />)
        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Edit The Service</CardTitle>
            </CardHeader>
            <CardBody>
                <Form>
                    <Row>
                        <Col sm='12'>
                            {/* service form */ }
                            <Label for='nameVerticalIcons'>Service Name</Label>
                            <InputGroup className='input-group-merge' tag={ FormGroup }>
                                <InputGroupAddon addonType='prepend'>
                                    <InputGroupText>
                                        <FaPencilAlt size={ 15 } />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input type='text' value={ sName } onChange={ (e) => setSName(e.target.value) } id='nameVerticalIcons' placeholder='Enter your service Name' />
                            </InputGroup>
                        </Col>
                        <Col sm='12' className="mt-2">
                            {/* basic image upload */ }

                            <h6> Service Image </h6>
                            <DragDrop uppy={ uppy } />
                            { img !== null ? <img className='rounded mt-2' height={ 200 } src={ preview ? preview : baseURL + img } alt='avatar' /> : null }


                        </Col>
                        <Col sm='12' className="mt-2">
                            {/* text editor */ }
                            <h6>service Text</h6>
                            <Editor editorState={ value } onEditorStateChange={ data => setValue(data) } />
                        </Col>

                        <Col sm='12' className="mt-4">
                            <FormGroup className='d-flex mb-0'>
                                <Button.Ripple className='mr-1' color='primary' type='submit' onClick={ (e) => updateService(e) }>
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
export default ServiceForm
