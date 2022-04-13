import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import '../../@core/scss/react/libs/editor/editor.scss'
import { AiFillQuestionCircle } from 'react-icons/ai'
import { stateToHTML } from 'draft-js-export-html'
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
import Action from '../../middleware/API'
//import toast types from components 
import { SuccessToast, ErrorToast } from '../components/toastify'
//import toasts from react
import { toast } from 'react-toastify'

const FAQForm = () => {
  const history = useHistory()
  //GET DATA
  const [addQuestion, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)

  //text editor
  const [value, setValue] = useState(EditorState.createEmpty())
  //conveting the text from editor into plain html
  const answerToHtml = stateToHTML(value.getCurrentContent())
  const data = {
    question: addQuestion,
    answer: answerToHtml
  }
  console.log(data)

  //post faq 
  const postFAQ = async (e) => {
    setLoading(true)
    e.preventDefault()
    const res = await Action.post('/faq', data, {})
    if (res.data.success) {
      toast.success(<SuccessToast title="Success" text="Faq updated Successfully!" />)
      history.push('/faq/list')

    } else {
      setSuccess(false)
      toast.error(<ErrorToast title="error" text={ res.data.msg } />)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Add New FAQ</CardTitle>
      </CardHeader>
      <CardBody>
        <Form>
          <Row>
            <Col sm='12'>
              {/* service form */ }
              <Label for='ques'>Question</Label>
              <InputGroup className='input-group-merge' tag={ FormGroup }>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <AiFillQuestionCircle size={ 15 } />
                  </InputGroupText>
                </InputGroupAddon>
                <Input type='text' value={ addQuestion }
                  onChange={ (e) => {
                    setQuestion(e.target.value)
                  }
                  }
                  placeholder='Enter your Question' />
              </InputGroup>
            </Col>
            <Col sm='12' className="mt-2">
              {/* text editor */ }
              <h6>Answer</h6>
              <Editor editorState={ value } onEditorStateChange={ data => setValue(data) } />
            </Col>
            <Col sm='12' className="mt-4">
              <FormGroup className='d-flex mb-0'>
                <Button.Ripple className='mr-1' color='primary' type='submit' onClick={ e => postFAQ(e) }>
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
export default FAQForm
