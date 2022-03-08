import { useState, useEffect } from 'react'

import { Card, CardTitle, CardBody, Table, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap'
import avatar1 from '@src/assets/images/portrait/small/avatar-s-5.jpg'
import { Link } from 'react-router-dom'
import { MoreVertical, Edit, Trash } from 'react-feather'
import Action from '../../middleware/API'
import baseURL from '../../middleware/BaseURL'

// table data


const EmployeeTable = () => {
  const [allEmployee, setAllEmployee] = useState([])
  useEffect(() => {
    const getAllEmployee = async () => {
      const { data } = await Action.get('/auth/employees')
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
                      <img src={ value.image } class="rounded-circle" height="40" width="40" alt="" />
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
                        isOpen={ modal === value.id }
                        toggle={ () => toggleModal(value.id) }
                        className='modal-dialog-centered'
                        modalClassName="modal-danger"
                        key={ value.id }>
                        <ModalHeader toggle={ () => toggleModal(value.id) }>Delete</ModalHeader>
                        <ModalBody>
                          Are you sure you want to delete this?
                        </ModalBody>
                        <ModalFooter>
                          <Button color="danger" onClick={ () => toggleModal(value.id) }>
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
