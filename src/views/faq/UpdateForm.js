import { useState, useEffect } from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { stateFromHTML } from 'draft-js-import-html'
import { useHistory, useParams } from 'react-router-dom'
import '../../@core/scss/react/libs/editor/editor.scss'
import { AiFillQuestionCircle } from 'react-icons/ai'
import { stateToHTML } from 'draft-js-export-html'
import Action from '../../middleware/API'
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


const FAQForm = () => {
    //question
    const [quest, setQuest] = useState('')
    //answer value
    const [value, setValue] = useState(EditorState.createEmpty())

    //get id from url
    const { id } = useParams()

    useEffect(() => {
        //get single faq
        const getSingleFAQ = async () => {
            try {
                const { data } = await Action.get(`/faq?_id=${ id }`)
                setQuest(data.data[0].question)
                setValue(EditorState.createWithContent(stateFromHTML(data.data[0].answer)))
            } catch (error) {
                console.log(error)
            }

        }
        getSingleFAQ()
    }, [])

    //conveting the text from editor into plain html
    const answerToHtml = stateToHTML(value.getCurrentContent())
    //loading success 
    const [success, setSuccess] = useState(false)

    //redirect url 
    const history = useHistory()
    //post api
    const updateFAQ = async (e) => {
        e.preventDefault()
        setSuccess(true)

        const res = await Action.put(`/faq/${ id }`, {
            question: quest,
            answer: answerToHtml
        })
        if (res.data.success) {
            toast.success(<SuccessToast title="Success" text="FAQ updated Successfully!" />)
            setTimeout(() => {
                history.push('/faq/list')
            }, 1000)
        } else {
            setSuccess(false)
            toast.error(<ErrorToast title="error" text="Something went wrong, try again later" />)
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
                                <Input onChange={ (e) => setQuest(e.target.value) } value={ quest } type='text' placeholder='Enter your Question' />
                            </InputGroup>
                        </Col>

                        <Col sm='12' className="mt-2">
                            {/* text editor */ }
                            <h6>Answer</h6>
                            <Editor editorState={ value } onEditorStateChange={ (data) => setValue(data) } />
                        </Col>

                        <Col sm='12' className="mt-4">
                            <FormGroup className='d-flex mb-0'>
                                <Button.Ripple className='mr-1' color='primary' type='submit' onClick={ (e) => updateFAQ(e) }>
                                    Submit
                                    {/* */ }
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
export default FAQForm
