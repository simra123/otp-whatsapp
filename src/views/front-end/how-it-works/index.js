import { useState, useEffect } from 'react'
import '../../../@core/scss/react/libs/editor/editor.scss'
import { MoreVertical, Edit, Trash, User } from 'react-feather'
import { FaTextWidth } from 'react-icons/fa'
import Action from '../../../middleware/API'
import baseURL from '../../../middleware/BaseURL'
//import toast types from components 
import { SuccessToast, ErrorToast } from '../../components/toastify'
//import toasts from react
import { toast } from 'react-toastify'
import { Card, CustomInput, Spinner, Form, Row, Col, Label, InputGroup, FormGroup, InputGroupAddon, InputGroupText, Input, CardTitle, CardBody, Table, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap'

const WorkList = () => {

  //GET DATA
  const [work, setWork] = useState([])
  //update data
  const [putText, setPutText] = useState({
    heading: '',
    text: ''
  })
  const [icon, setIcon] = useState(null)
  const [loading, setLoading] = useState(false)

  //get api
  useEffect(async () => {

    async function fetchAboutData() {
      try {
        const { data } = await Action.get('/work', {})
        setWork(data.data)
      } catch (error) {
        console.log(error)
      }

    }
    fetchAboutData()
  }, [work])

  const [modal, setModal] = useState(null)
  const toggleModalPrimary = id => {
    if (modal !== id) {
      setModal(id)
    } else {
      setModal(null)
    }
  }
  //event onChange 
  const evenOnChange = (e) => {
    const { name, value } = e.target
    setPutText((prev) => {
      return ({
        ...prev,
        [name]: value
      })
    })
  }
  //get single data 
  const getSingleData = async (id) => {
    try {
      const { data } = await Action.get(`/work?_id=${ id }`)
      const res = data.data[0]
      setPutText({
        heading: res.heading,
        text: res.text
      })
      setIcon(res.icon)

    } catch (error) {
      console.log(error)
    }

  }

  //upadte api
  const newData = new FormData()
  newData.append('heading', putText.heading)
  newData.append('text', putText.text)
  newData.append('file', icon)

  const updateData = async (id) => {
    const res = await Action.put(`/work/${ id }`, newData, {})
    if (res.data.success) {
      setLoading(true)
      toast.success(<SuccessToast title="Success" text="Section updated Successfully!" />)
      setTimeout(() => {
        setModal(null)
        setLoading(null)
      }, 1000)

    } else {
      setLoading(false)
      toast.error(<ErrorToast title="error" text="Something went wrong, try again later" />)
    }

  }
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>All List</CardTitle>

          <Table responsive>
            <thead>
              <tr>
                <th>Icon</th>
                <th>Heading</th>
                <th>Text</th>
              </tr>
            </thead>
            <tbody>
              {
                work.map((value, index) => {
                  return (
                    <tr key={ index }>
                      <td>
                        <img src={ baseURL + value.icon } alt="" height="50" width="50" />
                      </td>
                      <td> { value.heading } </td>
                      <td>
                        <UncontrolledDropdown>
                          <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                            <MoreVertical size={ 15 } />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem href="/" onClick={ (e) => {
                              e.preventDefault()
                              getSingleData(value._id)
                              toggleModalPrimary(value._id)
                            } }>
                              <Edit className='mr-50' size={ 15 } /> <span className='align-middle'>Edit</span>
                            </DropdownItem>

                          </DropdownMenu>
                        </UncontrolledDropdown>
                        {/* edit modal */ }
                        <Modal
                          isOpen={ modal === value._id }
                          toggle={ () => toggleModalPrimary(value._id) }
                          className='modal-dialog-centered'
                          modalClassName="modal-primary"
                          key={ value._id }>
                          <ModalHeader toggle={ () => toggleModalPrimary(value._id) }>Edit</ModalHeader>
                          <ModalBody>
                            <Form>
                              <Row>
                                <Col sm='12'>
                                  <FormGroup>
                                    <Label for='icon'>Upload Icon</Label>
                                    <CustomInput type='file' id='icon' onChange={ (e) => setIcon(e.target.files[0]) } name='customFile' />
                                  </FormGroup>

                                </Col>

                                <Col sm="12">
                                  {/* how it works form */ }
                                  <Label for='icon-heading'>Icon Heading</Label>
                                  <InputGroup className='input-group-merge' tag={ FormGroup }>
                                    <InputGroupAddon addonType='prepend'>
                                      <InputGroupText>
                                        <FaTextWidth size={ 15 } />
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type='text' onChange={ evenOnChange } name="heading" value={ putText.heading } id='icon-heading' placeholder='Enter your Heading'
                                    />
                                  </InputGroup>
                                </Col>

                                <Col sm="12">
                                  {/* how it works form */ }
                                  <Label for='icon-text'>Icon Text</Label>
                                  <InputGroup className='input-group-merge' tag={ FormGroup }>
                                    <InputGroupAddon addonType='prepend'>
                                      <InputGroupText>
                                        <FaTextWidth size={ 15 } />
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type='text' onChange={ evenOnChange } name="text" value={ putText.text } id='icon-text' placeholder='Enter your Text' />
                                  </InputGroup>
                                </Col>
                              </Row>
                            </Form>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="primary" onClick={ () => updateData(value._id) }>
                              Submit
                            </Button>
                            { loading ? <Spinner color='primary' /> : null }
                          </ModalFooter>
                        </Modal>

                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  )
}
export default WorkList