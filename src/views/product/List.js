import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../@core/scss/react/libs/file-uploader/file-uploader.scss'
import 'uppy/dist/uppy.css'
import { MoreVertical, Edit, Trash, User } from 'react-feather'
import Action from '../../middleware/API'
import baseURL from '../../middleware/BaseURL'

import { Card, Spinner, CardTitle, CardBody, Table, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap'

const Banner = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await Action.get(`/product`)
        setProducts(data.data)
        console.log(data.data)
      } catch (error) {
        console.log(error)
      }

    }
    getProducts()
  }, [])
  const [modal, setModal] = useState(null)

  const toggleModalDanger = id => {
    if (modal !== id) {
      setModal(id)
      setModal(null)
    }
  }


  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>All Product List</CardTitle>

          <Table responsive>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Product Name</th>
                <th>Product Image</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                products.map((value, index) => {
                  return (
                    <tr key={ index }>
                      <td>
                        { index + 1 }
                      </td>
                      <td>{ value.name }</td>
                      <td> <img className="rounded-circle" src={ baseURL + value?.image[0] } width="80" height="80" alt="" /> </td>
                      <td>{ value.price }</td>

                      <td>
                        <UncontrolledDropdown>
                          <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                            <MoreVertical size={ 15 } />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <Link to="/product/form">
                              <DropdownItem href='/' >
                                <Edit className='mr-50' size={ 15 } />  <span className='align-middle'>Edit</span>
                              </DropdownItem>
                            </Link>

                            <DropdownItem href='/' onClick={ (e) => {
                              e.preventDefault()
                              toggleModalDanger(value.id)
                            } }>
                              <Trash className='mr-50' size={ 15 } /> <span className='align-middle'>Delete</span>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>


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
export default Banner
