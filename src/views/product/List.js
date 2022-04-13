import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../@core/scss/react/libs/file-uploader/file-uploader.scss'
import 'uppy/dist/uppy.css'
import Pagination from '@src/views/components/pagination/PaginationBasic'
import { MoreVertical, Edit, Trash, User } from 'react-feather'
import Action from '../../middleware/API'
import baseURL from '../../middleware/BaseURL'
//import toast types from components 
import { SuccessToast, ErrorToast } from '../components/toastify'
//import toasts from react
import { toast } from 'react-toastify'
import { Card, CardTitle, CardBody, Table, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap'

const Banner = () => {
  const [products, setProducts] = useState([])
  const [modal, setModal] = useState(null)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await Action.get(`/product`)
        setProducts(data.data)
      } catch (error) {
        console.log(error)
      }

    }
    getProducts()
  }, [modal])

  const toggleModalDanger = id => {
    if (modal !== id) {
      setModal(id)
    } else {
      setModal(null)
    }
  }

  //delete api
  const deleteProduct = async (id) => {
    const res = await Action.delete(`/product?id=${ id }`)
    if (res.data.success) {
      toast.success(<SuccessToast title="Success" text="Product Deleted Succesfully!" />)
      toggleModalDanger(id)
    } else {
      toast.error(<ErrorToast title="error" text={ res.data.message } />)
    }
  }
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage, setDataPerPage] = useState(3)
  //setting pages into the pagination
  const indexOfLastPage = currentPage * dataPerPage//5
  const indexOfFirstPage = indexOfLastPage - dataPerPage //0

  const currentData = products.slice(indexOfFirstPage, indexOfLastPage)
  const totalPages = products.length //15

  //change pages onclick 
  const Paginate = (pageNumber) => { setCurrentPage(pageNumber) }
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
                products.length ? currentData.map((value, index) => {
                  return (
                    <tr key={ value._id }>
                      <td>
                        { index + (indexOfFirstPage + 1) }
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
                            <Link to={ `/product/edit/${ value._id }` }>
                              <DropdownItem href='/' >
                                <Edit className='mr-50' size={ 15 } />  <span className='align-middle'>Edit</span>
                              </DropdownItem>
                            </Link>

                            <DropdownItem href='/' onClick={ (e) => {
                              e.preventDefault()
                              toggleModalDanger(value._id)
                            } }>
                              <Trash className='mr-50' size={ 15 } /> <span className='align-middle'>Delete</span>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>


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
                            <Button color="danger" onClick={ () => deleteProduct(value._id) }>
                              delete
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </td>
                    </tr>
                  )
                }) : null
              }

            </tbody>
          </Table>
          {
            totalPages > dataPerPage ? <Pagination dataPerPage={ dataPerPage } currentPage={ currentPage } Paginate={ Paginate } totalPages={ totalPages } /> : null
          }
        </CardBody>
      </Card>
    </>
  )
}
export default Banner
