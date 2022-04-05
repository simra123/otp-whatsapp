import { useState, useEffect } from 'react'
import { EditorState } from 'draft-js'
import { useParams, useHistory } from 'react-router-dom'
import { Editor } from 'react-draft-wysiwyg'
import '../../@core/scss/react/libs/editor/editor.scss'
import Action from '../../middleware/API'
import { stateFromHTML } from 'draft-js-import-html'
import { stateToHTML } from 'draft-js-export-html'
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
  Spinner
} from 'reactstrap'


const EditPage = () => {
  const { url } = useParams()
  const [pageData, setPageData] = useState([])
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState(EditorState.createEmpty())
  const history = useHistory()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await Action.get(`/${ url }`)
        setValue(EditorState.createWithContent(stateFromHTML(data.data.text)))
        setPageData(data.data)
      } catch (error) {
        console.log(error)
      }

    }
    getData()
  }, [])

  //conveting the text from editor into plain html
  const TextToHtml = stateToHTML(value.getCurrentContent())

  //update data
  const updateContent = async (id) => {
    setLoading(true)
    const res = await Action.put(`/${ url }/${ id }`, {
      text: TextToHtml
    })
    if (res.data.success) {
      toast.success(<SuccessToast title="Success" text="Content updated Successfully!" />)
      setLoading(false)
      history.push('/page-setting')
    } else {
      setLoading(false)
      toast.error(<ErrorToast title="error" text="Something went wrong, try again later" />)
    }

  }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Edit Page</CardTitle>
      </CardHeader>
      <CardBody>
        <Form>
          <Row>
            <Col sm='12'>
              {/* service form */ }
              <Label for='nameVerticalIcons'>Page Title</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <Input readOnly type='text' id='nameVerticalIcons' value={ pageData.title } placeholder='Enter your Page Title' />
              </InputGroup>
            </Col>

            <Col sm='12' className="mt-2">
              {/* text editor */ }
              <h6>Page Description </h6>
              <Editor editorState={ value } onEditorStateChange={ data => setValue(data) } />
            </Col>

            <Col sm='12' className="mt-4">
              <FormGroup className='d-flex mb-0'>
                <Button.Ripple onClick={ (e) => {
                  updateContent(pageData._id)
                  e.preventDefault()
                } } className='mr-1' color='primary' type='submit'>
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
export default EditPage
