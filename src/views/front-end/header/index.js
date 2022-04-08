
import { useEffect, useState } from 'react'
import { MoreVertical, Edit, User } from 'react-feather'
import { BsFillMenuButtonFill } from 'react-icons/bs'
import { FaTextWidth } from 'react-icons/fa'
import { Card, CustomInput, Spinner, Form, Row, Col, Label, InputGroup, FormGroup, InputGroupAddon, InputGroupText, Input, CardTitle, CardBody, Table, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap'
import Action from '../../../middleware/API'
import baseURL from '../../../middleware/BaseURL'
//import toast types from components 
import { SuccessToast, ErrorToast } from '../../components/toastify'
//import toasts from react
import { toast } from 'react-toastify'

const Header = () => {
  const [modal2, setModal2] = useState(null)
  const [loading, setloading] = useState(false)
  const [body, setBody] = useState({
    text: "",
    file: {},
    button_text: "",
    link: ""
  })
  const toggleModalPrimary = id => {
    if (modal2 !== id) {
      setModal2(id)
    } else {
      setModal2(null)
    }
  }

  //API INTEGRATION
  //GET DATA
  const [topHeader, setTopHeader] = useState([])
  async function fetchTopHeaderData() {
    const { data } = await Action.get("/topheader", {})
    if (data.success === true) {
      setTopHeader(data.data)
      console.log(data.data)
      setBody({
        text: data.data[0].text,
        file: data.data[0].image,
        button_text: data.data[0].button_text,
        link: data.data[0].link
      })
      // console.log(topHeader)
    } else {
      setTopHeader([])
    }
  }

  useEffect(async () => {
    fetchTopHeaderData()
  }, [modal2])

  //UPDATE DATA 
  const data = new FormData()
  data.append('text', body.text)
  data.append('button_text', body.button_text)
  data.append('file', body.file)
  async function updateHeader() {
    setloading(true)
    const res = await Action.put(`/topheader/${ topHeader[0]._id }`, data, {})
    if (res.data.success === true) {
      toast.success(<SuccessToast title="Success" text="Top Header updated Successfully!" />)
      setModal2(null)
      setloading(false)
    } else {
      toast.error(<ErrorToast title="error" text={ res.data.message } />)
      setloading(false)


    }
  }
  return (
    <>

      <Card>
        <CardBody>
          <CardTitle>Header</CardTitle>
          <Table responsive>
            <thead>
              <tr>
                <th>Text</th>
                <th>Image</th>
                <th>Button Text</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                topHeader.map((value, index) => {
                  return (
                    <tr key={ index }>
                      <td>
                        { value.text }
                      </td>

                      <td> <img src={ baseURL + value.image } height="40" width="40" /></td>
                      <td>{ value.button_text }</td>
                      <td>
                        <UncontrolledDropdown>
                          <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                            <MoreVertical size={ 15 } />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem href='/' onClick={ (e) => {
                              e.preventDefault()
                              toggleModalPrimary(value.id)
                            } }>
                              <Edit className='mr-50' size={ 15 } /> <span className='align-middle'>Edit</span>
                            </DropdownItem>

                          </DropdownMenu>
                        </UncontrolledDropdown>
                        <Modal
                          isOpen={ modal2 === value.id }
                          toggle={ () => toggleModalPrimary(value.id) }
                          className='modal-dialog-centered'
                          modalClassName="modal-primary"
                          key={ value.id }>
                          <ModalHeader toggle={ () => toggleModalPrimary(value.id) }>Edit</ModalHeader>
                          <ModalBody>
                            <Form>
                              <Row>
                                <Col sm='12' >
                                  {/* color form */ }
                                  <Label for='text'>Header Text</Label>
                                  <InputGroup className='input-group-merge' tag={ FormGroup }>
                                    <InputGroupAddon addonType='prepend'>
                                      <InputGroupText>
                                        <FaTextWidth size={ 15 } />
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type='text' value={ body.text } id='text' onChange={ (e) => {
                                      setBody({ ...body, text: e.target.value })
                                    }
                                    }
                                      placeholder='Enter your text' />
                                  </InputGroup>
                                </Col>
                                <Col sm='12'>
                                  <FormGroup>
                                    <Label for='icon'>Header Image</Label>
                                    <CustomInput type='file' id='icon' onChange={ (e) => {
                                      setBody({ ...body, file: e.target.files[0] })
                                    }
                                    }
                                      name='customFile' />
                                  </FormGroup>
                                </Col>
                                <Col sm='12' >
                                  {/* color form */ }
                                  <Label for='btn'>Button Text</Label>
                                  <InputGroup className='input-group-merge' tag={ FormGroup }>
                                    <InputGroupAddon addonType='prepend'>
                                      <InputGroupText>
                                        <BsFillMenuButtonFill size={ 15 } />
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type='text' id='btn' value={ body.button_text } onChange={ (e) => {
                                      setBody({ ...body, button_text: e.target.value })
                                    }
                                    }
                                      placeholder='Enter your button text' />
                                  </InputGroup>
                                </Col>
                                <Col sm='12' >
                                  {/* color form */ }
                                  <Label for='url'>Button Url</Label>
                                  <InputGroup className='input-group-merge' tag={ FormGroup }>
                                    <InputGroupAddon addonType='prepend'>
                                      <InputGroupText>
                                        <BsFillMenuButtonFill size={ 15 } />
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type='text' id='url' value={ body.link } onChange={ (e) => {
                                      setBody({ ...body, link: e.target.value })
                                    }
                                    }
                                      placeholder='Enter your button link' />
                                  </InputGroup>
                                </Col>

                              </Row>
                            </Form>
                          </ModalBody>
                          <ModalFooter>

                            <Button color="primary" className='d-flex' onClick={ () => updateHeader() }>
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
export default Header