import { useState, useEffect } from 'react'

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
  const [allEmployee, setAllEmployee] = useState([])
  useEffect(() => {
    const getAllEmployee = async () => {
      const { data } = await Action.get('/auth/employee')
      console.log(data.data)
      setAllEmployee(data.data)
    }
    getAllEmployee()
  }, [])
  const [modal, setModal] = useState(null)

  const toggleModal = id => {
    if (modal !== id) {
      setModal(id)
    } else {
      setModal(null)
    }
  }
  //delete employee
  const deleteEmployee = async (id) => {
    const res = await Action.delete(`/auth/employee?_id=${ id }`)
    console.log(res)
    if (res.data.success) {
      setTimeout(() => {
        toast.success(<SuccessToast title="Success" text="settings updated Successfully!" />)
        history.push('/employee/list')
      }, 2000)
    } else {
      toast.error(<ErrorToast title="error" text={ res.data.message } />)
    }
  }
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
            {
              allEmployee.map((value, index) => {
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
                          <Button color="danger" onClick={ () => deleteEmployee(value._id) }>
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
  )
}

export default EmployeeTable
