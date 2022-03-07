import { useState, useEffect } from 'react'
import Uppy from '@uppy/core'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import { DragDrop } from '@uppy/react'
import '../../@core/scss/react/libs/file-uploader/file-uploader.scss'
import 'uppy/dist/uppy.css'
import { MoreVertical, Edit } from 'react-feather'
import Select from 'react-select'
//import toast types from components 
import { SuccessToast, ErrorToast } from '../components/toastify'
//import toasts from react
import { toast } from 'react-toastify'
import Action from '../../middleware/API'
import baseURL from '../../middleware/BaseURL'


import { Card, Spinner, Form, Row, CustomInput, Col, CardTitle, CardBody, Table, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap'


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
const Banner = () => {
  const [modal, setModal] = useState(null)
  //file uploader
  const [img, setImg] = useState(null)
  const [imgUpload, setImgUpload] = useState(null)
  const [lang, setLang] = useState('French')
  const [preview, setPreview] = useState(false)
  const [hitAPI, setHitAPI] = useState(false)
  const [id, setId] = useState('')


  const toggleModalPrimary = id => {
    if (modal !== id) {
      setModal(id)
    } else {
      setModal(null)
    }
  }

  useEffect(() => {
    const getBanner = async () => {
      const { data } = await Action.get(`/banner/market?lang=${ lang }`)
      setImg(data.data[0])
      setId(data.data[0]._id)
    }
    getBanner()
  }, [hitAPI])


  const uppy = new Uppy({
    meta: { type: 'avatar' },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true
  })

  uppy.use(thumbnailGenerator)

  uppy.on('thumbnail:generated', (file, preview) => {
    setImgUpload(file.data)
    setPreview(preview)
  })

  const newData = new FormData()
  newData.append('file', imgUpload)
  newData.append('lang', lang)
  //post
  const postBanner = async (e) => {
    e.preventDefault()
    setHitAPI(true)
    try {
      await Action.put(`/banner/${ id }`, newData, {})
      setHitAPI(false)
      setModal(null)
      toast.success(<SuccessToast title="Success" text="settings updated Successfully!" />)

    } catch (error) {
      toast.error(<ErrorToast title="error" text={ 'something went wrong, try again later' } />)
    }
  }
  const updateVisible = (boolean) => {
    try {
      Action.put(`/banner/${ id }`, { is_shown: boolean }, {})
      setHitAPI(false)
      toast.success(<SuccessToast title="Success" text="Visibility updated!!" />)

    } catch (error) {
      toast.error(<ErrorToast title="error" text={ 'something went wrong, try again later' } />)
    }
  }
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>Marketing Banner

          </CardTitle>
          <Select
            className='react-select my-2 w-25'
            defaultValue={ lang }
            options={ langs }
            style={ { width: "150px" } }
            onChange={ (e) => setLang(e.value) }
          />
          <Table responsive>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Banners</th>
                <th>Show</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { img !== null ? <tr>
                <td>  1</td> <td> <img src={ baseURL + img?.image } width="auto" height="230" alt="" /> </td>
                <td>
                  <CustomInput
                    className='custom-control-info'
                    type='switch'
                    id={ id }
                    name='info'
                    inline
                    onChange={ (e) => updateVisible(e.currentTarget.checked) }
                    defaultChecked={ img.is_shown }
                  />
                </td>
                <td>
                  <UncontrolledDropdown>
                    <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                      <MoreVertical size={ 15 } />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem href='/' onClick={ (e) => {
                        e.preventDefault()
                        toggleModalPrimary('jdITYDuwoi')
                      } }>
                        <Edit className='mr-50' size={ 15 } />  <span className='align-middle'>Edit</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <Modal
                    isOpen={ modal === 'jdITYDuwoi' }
                    toggle={ () => toggleModalPrimary('jdITYDuwoi') }
                    className='modal-dialog-centered'
                    modalClassName="modal-primary"
                    key={ 'jdITYDuwoi' }>
                    <ModalHeader toggle={ () => toggleModalPrimary('jdITYDuwoi') }>Edit</ModalHeader>
                    <ModalBody>
                      <Form>
                        <Row>
                          <Col sm='12' className="mt-2">
                            {/* basic image upload */ }

                            <h6> Upload Banner </h6>
                            <DragDrop uppy={ uppy } />
                            { img !== null ? <img className='rounded mt-2' height={ 150 } src={ preview ? preview : baseURL + img?.image } alt='avatar' /> : null }
                          </Col>

                        </Row>
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      <div className='d-flex'>
                        <Button color="primary" onClick={ (e) => postBanner(e) }>
                          Submit
                        </Button>
                        { hitAPI ? <Spinner color='primary' /> : null }
                      </div>
                    </ModalFooter>
                  </Modal>
                </td>
              </tr> : null
              }
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  )
}
export default Banner
