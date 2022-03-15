import { useState, useEffect } from 'react'
import '../../@core/scss/react/libs/editor/editor.scss'
import '../../@core/scss/react/libs/file-uploader/file-uploader.scss'
import 'uppy/dist/uppy.css'
import { MoreVertical, Edit, Trash, User } from 'react-feather'
import { CgAttribution } from 'react-icons/cg'
import Action from "../../middleware/API"
import { Card, CardHeader, Form, Row, Col, Label, InputGroup, FormGroup, InputGroupAddon, InputGroupText, Input, CardTitle, CardBody, Table, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button, Spinner } from 'reactstrap'
//import toast types from components 
import { SuccessToast, ErrorToast } from '../components/toastify'
//import toasts from react
import { toast } from 'react-toastify'

const AttributeNames = () => {
  const [modal, setModal] = useState(null)
  const [modal2, setModal2] = useState(null)
  const [names, setNames] = useState([])
  const [postName, setPostName] = useState('')
  const [updateName, setUpdateName] = useState('')
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)

  //get att names
  useEffect(() => {
    const getAttNames = async () => {
      try {
        const { data } = await Action.get('/attribute')
        setNames(data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getAttNames()
  }, [loading])


  const toggleModalDanger = id => {
    if (modal !== id) {
      setModal(id)
    } else {
      setModal(null)
    }
  }
  const toggleModalPrimary = id => {
    if (modal2 !== id) {
      setModal2(id)
    } else {
      setModal2(null)
    }
  }
  //post Attribute
  const postAttribute = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await Action.post('/attribute', {
      Attribute: postName
    })
    if (res.data.success) {
      toast.success(<SuccessToast title="Success" text="Attribute Added Successfully!" />)
      setLoading(false)
      setPostName('')
    } else {
      setLoading(false)
      toast.error(<ErrorToast title="error" text={ res.data.message } />)
    }
  }
  //et single
  const getSingleAttribute = async (id) => {
    try {
      const { data } = await Action.get(`/attribute?_id=${ id }`)
      const res = data.data[0]
      updateName(res.attribute)
    } catch (error) {
      console.log(error)
    }
  }
  //delete api
  const deleteAttribute = async (id) => {
    const res = await Action.delete(`/attribute?id=${ id }`)
    if (res.data.success) {
      toast.success(<SuccessToast title="Success" text="Attribute Deleted Succesfully!" />)
      toggleModalDanger(did)
    } else {
      toast.error(<ErrorToast title="error" text={ res.data.message } />)
    }
  }
  //update Name
  const putAttName = async (id) => {
    setLoading2(true)
    const res = await Action.put(`/attribute/${ id }`, updateName)
    if (res.data.success) {
      toast.success(<SuccessToast title="Success" text="attribute Added Successfully!" />)
      setLoading2(false)
      toggleModalPrimary(id)
    } else {
      setLoading2(false)
      toast.error(<ErrorToast title="error" text={ res.data.message } />)
    }
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Add New Attribute Name</CardTitle>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col sm='12' >
                {/* color form */ }
                <Label for='att-name'>Attribute Name</Label>
                <InputGroup className='input-group-merge' tag={ FormGroup }>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <CgAttribution size={ 15 } />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input onChange={ (e) => setPostName(e.currentTarget.value) } value={ postName } type='text' placeholder='Enter your Attibute name' />
                </InputGroup>
              </Col>
              <Col sm='12' className="">
                <FormGroup className='d-flex mb-0'>
                  <Button.Ripple className='mr-1' color='primary' type='submit' onClick={ e => postAttribute(e) }>
                    Submit
                  </Button.Ripple>
                  { loading ? <Spinner color="primary" /> : null }
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle>All Attribute Names</CardTitle>

          <Table responsive>
            <thead>
              <tr>
                <th>Attribute Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                names.map((value, index) => {
                  return (
                    <tr key={ index + value._id }>
                      <td>
                        { value.attribute }
                      </td>

                      <td>
                        <UncontrolledDropdown>
                          <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                            <MoreVertical size={ 15 } />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem href='/' onClick={ (e) => {
                              getSingleAttribute(value._id)
                              e.preventDefault()
                              toggleModalPrimary(value._id)
                            } }>
                              <Edit className='mr-50' size={ 15 } />  <span className='align-middle'>Edit</span>
                            </DropdownItem>

                            <DropdownItem href='/' onClick={ (e) => {
                              e.preventDefault()
                              toggleModalDanger(value._id)
                            } }>
                              <Trash className='mr-50' size={ 15 } /> <span className='align-middle'>Delete</span>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                        <Modal
                          isOpen={ modal2 === value._id }
                          toggle={ () => toggleModalPrimary(value._id) }
                          className='modal-dialog-centered'
                          modalClassName="modal-primary"
                          key={ value._id }>
                          <ModalHeader toggle={ () => toggleModalPrimary(value._id) }>Edit</ModalHeader>
                          <ModalBody>
                            <Form>
                              <Row>
                                <Col sm='12' >
                                  {/* color form */ }
                                  <Label for='att-name'>Attribute Name</Label>
                                  <InputGroup className='input-group-merge' value={ updateName } onChange={ (e) => e.currentTarget.value } tag={ FormGroup }>
                                    <InputGroupAddon addonType='prepend'>
                                      <InputGroupText>
                                        <CgAttribution size={ 15 } />
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type='text' name='name' value={ postName } placeholder='Enter your Attibute name' />
                                  </InputGroup>
                                </Col>

                              </Row>
                            </Form>
                          </ModalBody>
                          <ModalFooter>

                            <Button color="primary" onClick={ () => putAttName(value._id) }>
                              Submit
                            </Button>
                            { loading2 ? <Spinner color="primary" /> : null }

                          </ModalFooter>
                        </Modal>

                        {/* delete modal */ }
                        <Modal
                          isOpen={ modal === value._id }
                          toggle={ () => toggleModalDanger(value._id) }
                          className='modal-dialog-centered'
                          modalClassName="modal-danger"
                          key={ value._id }>
                          <ModalHeader toggle={ () => toggleModalDanger(value._id) }>Delete</ModalHeader>
                          <ModalBody>
                            Are you sure you want to delete this?
                          </ModalBody>
                          <ModalFooter>
                            <Button color="danger" onClick={ () => deleteAttribute(value._id) }>
                              delete
                            </Button>
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
export default AttributeNames
