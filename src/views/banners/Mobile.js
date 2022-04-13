import { useState, useEffect } from 'react'
import Uppy from '@uppy/core'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import { DragDrop } from '@uppy/react'
import '../../@core/scss/react/libs/file-uploader/file-uploader.scss'
import 'uppy/dist/uppy.css'
import Select from 'react-select'
import { MoreVertical, Edit, Trash } from 'react-feather'
import Action from '../../middleware/API'
import baseURL from '../../middleware/BaseURL'
//import toast types from components 
import { SuccessToast, ErrorToast } from '../components/toastify'
//import toasts from react
import { toast } from 'react-toastify'

import { Card, Spinner, Form, Row, Col, CardTitle, CardBody, Table, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap'

const langs = [
  {
    value: 'French',
    label: 'French'
  },
  {
    value: 'English',
    label: 'English'
  }


]

const DesktopBanner = () => {
  const [modal, setModal] = useState(null)
  const [modal2, setModal2] = useState(null)
  const [modal3, setModal3] = useState(null)
  const [banners, setBanners] = useState([])
  //previews
  const [preview, setPreview] = useState([])
  const [preview2, setPreview2] = useState([])
  const [lang, setLang] = useState('French')

  useEffect(() => {
    const getBanners = async () => {
      const { data } = await Action.get(`/banner/mobile?lang=${ lang }`)
      setBanners(data.data)
    }
    getBanners()
  }, [modal, modal2, modal3])

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
  const toggleAddNew = id => {
    if (modal3 !== id) {
      setModal3(id)
    } else {
      setModal3(null)
    }
  }
  //file uploader
  const [uploadImg, setUploadImg] = useState(null)
  const [editImg, setEditImg] = useState(null)

  const uppy = new Uppy({
    meta: { type: 'avatar' },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true
  })
  //file upload to add new banner
  uppy.use(thumbnailGenerator)

  uppy.on('thumbnail:generated', (file, preview) => {
    setUploadImg(file.data)
    setPreview2(preview)
  })
  const uppyEdit = new Uppy({
    meta: { type: 'avatar' },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true
  })

  // file upload to updated banner
  uppyEdit.use(thumbnailGenerator)

  uppyEdit.on('thumbnail:generated', (file, preview) => {
    setEditImg(file.data)
    setPreview(preview)
  })
  //post data 
  const uploadData = new FormData()
  uploadData.append('file', uploadImg)
  uploadData.append('lang', lang)

  //post api 
  const postBanner = async (e) => {
    e.preventDefault()
    const res = await Action.post(`/banner/mobile`, uploadData, {})
    if (res.data.success) {
      toast.success(<SuccessToast title="Success" text="Banner Uploaded Successfully!" />)
      setModal3(null)

    } else {
      toast.error(<ErrorToast title="error" text="Something went wrong, try again later" />)
    }
  }

  //delete banner 
  const deleteBanner = async (id) => {
    const res = await Action.delete(`/banner?id=${ id }`)
    if (res.data.success) {
      toast.success(<SuccessToast title="Success" text="Banner Deleted Successfully!" />)
      setModal(null)
    } else {
      toast.error(<ErrorToast title="error" text="Something went wrong, try again later" />)
    }
  }

  //Update api 
  const editFile = new FormData()
  editFile.append('file', editImg)

  const updateBanner = async (id) => {
    const res = await Action.put(`/banner/${ id }`, editFile, {})
    if (res.data.success) {
      toast.success(<SuccessToast title="Success" text="Banner Updated Successfully!" />)
      setModal2(null)
    } else {
      toast.error(<ErrorToast title="error" text="Something went wrong, try again later" />)
    }
  }
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>All Mobile Banners </CardTitle>
          <div className='d-flex'>
            <Select
              className='react-select w-25'
              defaultValue={ lang }
              options={ langs }
              style={ { width: "150px" } }
              onChange={ (e) => setLang(e.value) }
            />
            <div className="ml-auto mb-2">
              <Button color="primary" onClick={ () => toggleAddNew(0) }>
                Add new Banner
              </Button>
            </div>
          </div>
          <div className="float-right mb-2">
            <Modal
              isOpen={ modal3 === 0 }
              toggle={ () => toggleAddNew(0) }
              className='modal-dialog-centered'
              modalClassName="modal-primary"
              key={ 0 }>
              <ModalHeader toggle={ () => toggleAddNew(0) }>Upload</ModalHeader>
              <ModalBody>
                <Form>
                  <Row>
                    <Col sm='12' className="mt-2">
                      {/* basic image upload */ }

                      <h6> Upload Banners </h6>
                      <DragDrop uppy={ uppy } />
                      { uploadImg !== null ? <img className='rounded mt-2' src={ preview2 } alt='avatar' /> : null }
                    </Col>

                  </Row>
                </Form>
              </ModalBody>
              <ModalFooter>

                <Button color="primary" onClick={ (e) => postBanner(e) }>
                  Submit
                  {/* spinner */ }
                  {/* <Spinner color='light' /> */ }
                </Button>
              </ModalFooter>
            </Modal>
          </div>
          <Table responsive>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Banners</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                banners.map((value, index) => {
                  return (
                    <tr key={ index }>
                      <td>
                        { index + 1 }
                      </td>

                      <td> <img src={ baseURL + value.image } width="auto" height="200" alt="" /> </td>
                      <td>
                        <UncontrolledDropdown>
                          <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                            <MoreVertical size={ 15 } />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem href='/' onClick={ (e) => {
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
                        {/* update banner modal */ }
                        <Modal
                          isOpen={ modal2 === value._id }
                          toggle={ () => toggleModalPrimary(value.id) }
                          className='modal-dialog-centered'
                          modalClassName="modal-primary"
                          key={ value._id }>
                          <ModalHeader toggle={ () => toggleModalPrimary(value._id) }>Edit</ModalHeader>
                          <ModalBody>
                            <Form>
                              <Row>
                                <Col sm='12' className="mt-2">
                                  {/* basic image upload */ }

                                  <h6> edit Banner </h6>
                                  <DragDrop uppy={ uppyEdit } />
                                  { editImg !== null ? <img className='rounded mt-2' src={ preview } alt='avatar' /> : null }
                                </Col>

                              </Row>
                            </Form>
                          </ModalBody>
                          <ModalFooter>

                            <Button color="primary" onClick={ () => updateBanner(value._id) }>
                              Submit
                              {/* spinner */ }
                              {/* <Spinner color='light' /> */ }
                            </Button>
                          </ModalFooter>
                        </Modal>

                        {/* delete modal */ }
                        <Modal
                          isOpen={ modal === value._id }
                          toggle={ () => toggleModalDanger(value._id) }
                          className='modal-dialog-centered'
                          modalClassName="modal-danger"
                          key={ value.id }>
                          <ModalHeader toggle={ () => toggleModalDanger(value._id) }>Delete</ModalHeader>
                          <ModalBody>
                            Are you sure you want to delete this?
                          </ModalBody>
                          <ModalFooter>
                            <Button color="danger" onClick={ () => deleteBanner(value._id) }>
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
export default DesktopBanner
