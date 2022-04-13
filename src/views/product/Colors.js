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
  const [updateColor, setUpdateColor] = useState({
    color: '',
    code: ''
  })
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [did, setDid] = useState('')
  useEffect(() => {
    const getColors = async () => {
      try {
        const { data } = await Action.get('/color')
        setColors(data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getColors()
  }, [loading, loading2, modal])


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
  const onChangeEvent2 = (e) => {
    const { name, value } = e.target

    setUpdateColor((prev) => {
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
      setPostColor({
        color: '',
        code: ''
      })
    } else {
      setLoading(false)
      toast.error(<ErrorToast title="error" text={ res.data.message } />)
    }
  }
  const getSingleColor = async (id) => {
    try {
      const { data } = await Action.get(`/color?_id=${ id }`)
      const res = data.data[0]
      setUpdateColor({
        color: res.color,
        code: res.code
      })
    } catch (error) {
      console.log(error)
    }
  }
  //update color
  const putColor = async (id) => {
    setLoading2(true)
    const res = await Action.put(`/color/${ id }`, updateColor)
    if (res.data.success) {
      toast.success(<SuccessToast title="Success" text="Color Added Successfully!" />)
      setLoading2(false)
      toggleModalPrimary(id)
    } else {
      setLoading2(false)
      toast.error(<ErrorToast title="error" text={ res.data.message } />)
    }
  }
  //delete color
  const deleteColor = async () => {
    const res = await Action.delete(`/color?id=${ did }`)
    if (res.data.success) {
      toast.success(<SuccessToast title="Success" text="Color Deleted Succesfully!" />)
      toggleModalDanger(did)
    } else {
      toast.error(<ErrorToast title="error" text={ res.data.message } />)
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
                  <Button.Ripple className='mx-1' color='primary' type='submit' onClick={ e => postColorAPI(e) }>
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
                              setDid(value._id)
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
                                    <Input type='text' name='color' value={ updateColor.color } onChange={ (e) => onChangeEvent2(e) } id='color' placeholder='Enter your color name' />
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
                                    <Input type='text' value={ updateColor.code } onChange={ (e) => onChangeEvent2(e) } name='code' id='code' placeholder='Enter your color code' />
                                  </InputGroup>
                                </Col>

                              </Row>
                            </Form>
                          </ModalBody>
                          <ModalFooter>
                            <FormGroup className='d-flex mb-0'>
                              <Button color="primary" onClick={ () => putColor(value._id) }>
                                Submit
                              </Button>
                              { loading2 ? <Spinner color="primary" /> : null }
                            </FormGroup>

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
                            <Button color="danger" onClick={ () => deleteColor(value._id) }>
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
