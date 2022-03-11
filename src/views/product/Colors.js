import { useState, useEffect } from 'react'
import '../../@core/scss/react/libs/editor/editor.scss'
import '../../@core/scss/react/libs/file-uploader/file-uploader.scss'
import 'uppy/dist/uppy.css'
import { MoreVertical, Edit, Trash, User } from 'react-feather'
import { VscSymbolColor } from 'react-icons/vsc'
import { IoColorWandOutline } from 'react-icons/io5'
import Action from "../../middleware/API"
//import toast types from components 
import { SuccessToast, ErrorToast } from '../components/toastify'
//import toasts from react
import { toast } from 'react-toastify'

import { Card, CardHeader, Form, Spinner, Row, Col, Label, InputGroup, FormGroup, InputGroupAddon, InputGroupText, Input, CardTitle, CardBody, Table, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap'

const Colors = () => {
  const [modal, setModal] = useState(null)
  const [modal2, setModal2] = useState(null)
  const [colors, setColors] = useState([])
  const [postColor, setPostColor] = useState({
    color: '',
    code: ''
  })
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getColors = async () => {
      try {
        const { data } = await Action.get('/color')
        console.log(data)
        setColors(data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getColors()
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
  const onChangeEvent = (e) => {
    const { name, value } = e.target
    setPostColor((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  const postColorAPI = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await Action.post('/color', postColor)
    if (res.data.success) {
      toast.success(<SuccessToast title="Success" text="Color Added Successfully!" />)
      setLoading(false)
    } else {
      setLoading(false)
      toast.error(<ErrorToast title="error" text={ res.data.message } />)
    }
  }
  const getSingleColor = async (id) => {
    try {
      const { data } = await Action.get(`/color?_id=${ id }`)
      const res = data.data[0]
      setPostColor({
        color: res.color,
        code: res.code
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Add New Colors</CardTitle>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col sm='12' md="6">
                {/* color form */ }
                <Label for='color'>Color Name</Label>
                <InputGroup className='input-group-merge' tag={ FormGroup }>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <VscSymbolColor size={ 15 } />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type='text' name='color' onChange={ (e) => onChangeEvent(e) } value={ postColor.color } id='color' placeholder='Enter your color name' />
                </InputGroup>
              </Col>
              <Col sm='12' md="6">
                {/* color form */ }
                <Label for='code'>Color Code</Label>
                <InputGroup className='input-group-merge' tag={ FormGroup }>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <IoColorWandOutline size={ 15 } />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type='text' value={ postColor.code } onChange={ (e) => onChangeEvent(e) } name='code' id='code' placeholder='Enter your color code' />
                </InputGroup>
              </Col>
              <Col sm='12' className="">
                <FormGroup className='d-flex mb-0'>
                  <Button.Ripple className='mr-1' color='primary' type='submit' onClick={ e => postColorAPI(e) }>
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
          <CardTitle>All Colors</CardTitle>

          <Table responsive>
            <thead>
              <tr>
                <th>Color Name</th>
                <th>Color Code</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                colors.map((value, index) => {
                  return (
                    <tr key={ index }>
                      <td>
                        { value.color }
                      </td>

                      <td>{ value.code }</td>
                      <td>
                        <UncontrolledDropdown>
                          <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                            <MoreVertical size={ 15 } />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem href='/' onClick={ (e) => {
                              getSingleColor(value._id)
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
                                <Col sm='12' md="6">
                                  {/* color form */ }
                                  <Label for='color'>Color Name</Label>
                                  <InputGroup className='input-group-merge' tag={ FormGroup }>
                                    <InputGroupAddon addonType='prepend'>
                                      <InputGroupText>
                                        <VscSymbolColor size={ 15 } />
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type='text' name='color' value={ postColor.color } onChange={ (e) => onChangeEvent(e) } id='color' placeholder='Enter your color name' />
                                  </InputGroup>
                                </Col>
                                <Col sm='12' md="6">
                                  {/* color form */ }
                                  <Label for='code'>Color Code</Label>
                                  <InputGroup className='input-group-merge' tag={ FormGroup }>
                                    <InputGroupAddon addonType='prepend'>
                                      <InputGroupText>
                                        <IoColorWandOutline size={ 15 } />
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type='text' value={ postColor.code } onChange={ (e) => onChangeEvent(e) } name='code' id='code' placeholder='Enter your color code' />
                                  </InputGroup>
                                </Col>

                              </Row>
                            </Form>
                          </ModalBody>
                          <ModalFooter>

                            <Button color="primary" onClick={ () => toggleModalPrimary(value._id) }>
                              Submit
                              {/* spinner */ }
                              {/* <Spinner color='light' /> */ }

                            </Button>
                          </ModalFooter>
                        </Modal>

                        {/* delete modal */ }
                        <Modal
                          isOpen={ modal === value.id }
                          toggle={ () => toggleModalDanger(value.id) }
                          className='modal-dialog-centered'
                          modalClassName="modal-danger"
                          key={ value.id }>
                          <ModalHeader toggle={ () => toggleModalDanger(value.id) }>Delete</ModalHeader>
                          <ModalBody>
                            Are you sure you want to delete this?
                          </ModalBody>
                          <ModalFooter>
                            <Button color="danger" onClick={ () => toggleModalDanger(value.id) }>
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
export default Colors
