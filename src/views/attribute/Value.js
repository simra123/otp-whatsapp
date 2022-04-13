import { useState, useEffect } from 'react'
import '../../@core/scss/react/libs/editor/editor.scss'
import '../../@core/scss/react/libs/file-uploader/file-uploader.scss'
import 'uppy/dist/uppy.css'
import { MoreVertical, Edit, Trash, User } from 'react-feather'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import Action from "../../middleware/API"
import { CgAttribution } from 'react-icons/cg'
import { Card, CardHeader, Form, Row, Col, Label, InputGroup, FormGroup, InputGroupAddon, InputGroupText, Input, CardTitle, CardBody, Table, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button, Spinner } from 'reactstrap'
//import toast types from components 
import { SuccessToast, ErrorToast } from '../components/toastify'
//import toasts from react
import { toast } from 'react-toastify'


const ServiceForm = () => {
  const [modal, setModal] = useState(null)
  const [modal2, setModal2] = useState(null)
  const [attValues, setAttValues] = useState([])
  const [attNames, setAttNames] = useState([])
  const [loading, setLoading] = useState(false)

  const [postAtts, setpostAtts] = useState([
    {
      value: '',
      attribute: ''
    }
  ])
  //get att names
  useEffect(() => {
    const getAttValues = async () => {
      try {
        const { data } = await Action.get('/attribute/value')
        setAttValues(data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getAttValues()

    const getAttNames = async () => {
      try {
        const { data } = await Action.get('/attribute')
        setAttNames(data.data)
        data.data.map((item, index) => {
          data.data[index].value = item._id
          data.data[index].label = item.attribute
        })
      } catch (error) {
        console.log(error)
      }
    }
    getAttNames()
    const getAttNbyIdf = async () => {
      try {
        const { data } = await Action.get('/attribute')
        setAttNames(data.data)
        data.data.map((item, index) => {
          data.data[index].value = item._id
          data.data[index].label = item.attribute
        })
      } catch (error) {
        console.log(error)
      }
    }
    getAttNbyIdf()
  }, [loading, modal])

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
  const postAttributes = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await Action.post('/attribute/value',
      {
        value: postAtts.attribute,
        attribute: [postAtts.value]
      }
    )
    if (res.data.success) {
      toast.success(<SuccessToast title="Success" text="Attribute Added Successfully!" />)
      setLoading(false)
    } else {
      setLoading(false)
      toast.error(<ErrorToast title="error" text={ res.data.message } />)
    }
  }
  //delete api
  const deleteAttribute = async (id) => {
    const res = await Action.delete(`/attribute/value?id=${ id }`)
    if (res.data.success) {
      toast.success(<SuccessToast title="Success" text="Attribute Deleted Succesfully!" />)
      toggleModalDanger(id)
    } else {
      toast.error(<ErrorToast title="error" text={ res.data.message } />)
    }
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Add New Attribute Value</CardTitle>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col sm='12' md="6">
                {/* value form */ }
                <Label for='att-name'>Attribute Value</Label>
                <InputGroup className='input-group-merge' tag={ FormGroup }>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>
                      <CgAttribution size={ 15 } />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input type='text' onChange={ (e) => setpostAtts({ ...postAtts, attribute: e.target.value }) } value={ postAtts.attribute } name='name' id='att-name' placeholder='Enter your Attibute name' />
                </InputGroup>
              </Col>
              <Col className='mb-1' md='6' sm='12'>
                <Label>Attribute Name</Label>
                <Select
                  theme={ selectThemeColors }
                  className='react-select'
                  classNamePrefix='select'
                  defaultValue={ postAtts.value }
                  options={ attNames }
                  isClearable={ false }
                  onChange={ (e) => setpostAtts({ ...postAtts, value: e.value }) }

                />
              </Col>
              <Col sm='12' className="">
                <FormGroup className='d-flex mb-0'>
                  <Button.Ripple className='mr-1' color='primary' type='submit' onClick={ e => postAttributes(e) }>
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
          <CardTitle>All Attribute Values</CardTitle>

          <Table responsive>
            <thead>
              <tr>
                <th>Attribute Value</th>
                <th>Attribute Id</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                attValues.map((value, index) => {
                  return (
                    <tr key={ index }>
                      <td>
                        { value.value }
                      </td>

                      <td>{ value.attribute[0] }</td>
                      <td>
                        <UncontrolledDropdown>
                          <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                            <MoreVertical size={ 15 } />
                          </DropdownToggle>
                          <DropdownMenu right>
                            {/* <DropdownItem href='/' onClick={ (e) => {
                              e.preventDefault()
                              toggleModalPrimary(value._id)
                            } }>
                              <Edit className='mr-50' size={ 15 } />  <span className='align-middle'>Edit</span>
                            </DropdownItem> */}

                            <DropdownItem href='/' onClick={ (e) => {
                              e.preventDefault()
                              toggleModalDanger(value._id)

                            } }>
                              <Trash className='mr-50' size={ 15 } /> <span className='align-middle'>Delete</span>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                        {/* <Modal
                          isOpen={ modal2 === value._id }
                          toggle={ () => toggleModalPrimary(value._id) }
                          className='modal-dialog-centered'
                          modalClassName="modal-primary"
                          key={ value._id }>
                          <ModalHeader toggle={ () => toggleModalPrimary(value._id) }>Edit</ModalHeader>
                          <ModalBody>
                            <Form>
                              <Row>

                                <Col className='mb-1' md='6' sm='12'>
                                  <Label>Attribute Name</Label>
                                  <Select
                                    theme={ selectThemeColors }
                                    className='react-select'
                                    classNamePrefix='select'
                                    defaultValue={ attributeNames[0] }
                                    options={ attributeNames }
                                    isClearable={ false }
                                  />
                                </Col>
                                <Col sm='12' md="6">
                                  <Label for='att-name'>Attribute Value</Label>
                                  <InputGroup className='input-group-merge' tag={ FormGroup }>
                                    <InputGroupAddon addonType='prepend'>
                                      <InputGroupText>
                                        <CgAttribution size={ 15 } />
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type='text' name='name' id='att-name' placeholder='Enter your Attibute name' />
                                  </InputGroup>
                                </Col>

                              </Row>
                            </Form>
                          </ModalBody>
                          <ModalFooter>

                            <Button color="primary" onClick={ () => toggleModalPrimary(value._id) }>
                              Submit
                            </Button>
                          </ModalFooter>
                        </Modal> */}

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
export default ServiceForm
