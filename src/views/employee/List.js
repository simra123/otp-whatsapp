import { useState, useEffect } from 'react'
import Pagination from '@src/views/components/pagination/PaginationBasic'
import { Card, CardTitle, CardBody, Table, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import { MoreVertical, Edit, Trash } from 'react-feather'
import Action from '../../middleware/API'
import baseURL from '../../middleware/BaseURL'
//import toast types from components
import { SuccessToast, ErrorToast } from '../components/toastify'
//import toasts from react
import { toast } from 'react-toastify'

// table data
const EmployeeTable = () => {
  const [modal, setModal] = useState(null)
  const [allEmployee, setAllEmployee] = useState([])
  useEffect(() => {
    const getAllEmployee = async () => {
      const { data } = await Action.get('/auth/employee')
      setAllEmployee(data.data)
    }
    getAllEmployee()
  }, [modal])

  const toggleModal = id => {
    if (modal !== id) {
      setModal(id)
    } else {
      setModal(null)
    }
  }
  //delete api
  const deleteUser = async (id) => {
    const res = await Action.delete(`/auth/deleteuser?id=${ id }`)

    if (res.data.success) {
      toast.success(<SuccessToast title="Success" text="Customer Deleted Successfully!" />)
      setModal(null)
    } else {
      toast.error(<ErrorToast title="error" text="Something went wrong, try again later" />)
      setModal(null)

    }
  }
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage, setDataPerPage] = useState(5)
  //setting pages into the pagination
  const indexOfLastPage = currentPage * dataPerPage//5
  const indexOfFirstPage = indexOfLastPage - dataPerPage //0

  const currentData = allEmployee.slice(indexOfFirstPage, indexOfLastPage)
  const totalPages = allEmployee.length //15

  //change pages onclick 
  const Paginate = (pageNumber) => { setCurrentPage(pageNumber) }
  return (
    <Card>
      <CardBody>
        <CardTitle>All Employees</CardTitle>

        <Table responsive>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { allEmployee.length ? currentData.map((value, index) => {
              return (
                <tr key={ index }>
                  <td>
                    <img src={ baseURL + value.image } class="rounded-circle" height="40" width="40" alt="" />
                  </td>

                  <td>{ value.name }</td>

                  <td>{ value.email }</td>


                  <td>
                    <UncontrolledDropdown>
                      <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                        <MoreVertical size={ 15 } />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <Link to={ `/employee/edit/${ value._id }` }>
                          <DropdownItem href='/' >

                            <Edit className='mr-50' size={ 15 } />  <span className='align-middle'>Edit</span>

                          </DropdownItem>
                        </Link>
                        <DropdownItem href='/' onClick={ (e) => {
                          e.preventDefault()
                          toggleModal(value._id)
                        } }>
                          <Trash className='mr-50' size={ 15 } /> <span className='align-middle'>Delete</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    <Modal
                      isOpen={ modal === value._id }
                      toggle={ () => toggleModal(value._id) }
                      className='modal-dialog-centered'
                      modalClassName="modal-danger"
                      key={ value.id }>
                      <ModalHeader toggle={ () => toggleModal(value._id) }>Delete</ModalHeader>
                      <ModalBody>
                        Are you sure you want to delete this?
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" onClick={ () => deleteUser(value._id) }>
                          delete
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </td>
                </tr>
              )
            }) : null }
          </tbody>
        </Table>
        {
          totalPages > dataPerPage ? <Pagination dataPerPage={ dataPerPage } currentPage={ currentPage } Paginate={ Paginate } totalPages={ totalPages } /> : null
        }


      </CardBody>
    </Card>
  )
}

export default EmployeeTable
