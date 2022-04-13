import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Card, CardTitle, CardBody, Table, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button, Spinner } from 'reactstrap'
import Action from '../../middleware/API'
import baseURL from '../../middleware/BaseURL'
//import toast types from components 
import { SuccessToast, ErrorToast } from '../components/toastify'
//import toasts from react
import { toast } from 'react-toastify'
import axios from 'axios'
// table data

const CategoryTable = () => {
  const [modal, setModal] = useState(false)
  const [allCategories, setAllCategories] = useState([])

  useEffect(() => {
    //using promise 
    const getCategories = async () => {
      //if else
      try {
        const { data } = await Action.get('/category')
        setAllCategories(data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getCategories()
  }, [modal])
  const toggleModal = id => {
    if (modal !== id) {
      setModal(id)
    } else {
      setModal(null)
    }
  }
  //delete api
  const deleteCategory = async (id) => {
    try {
      await Action.delete(`category?id=${ id }`)
      toast.success(<SuccessToast title="Success!" text="item deleted successfully!" />)
      setModal(null)

    } catch (error) {
      console.log(error)
      toast.error(<ErrorToast title="error" text="Something went wrong, try again later" />)
    }
  }
  return (
    <Card>
      <CardBody>
        <CardTitle>All Categories</CardTitle>

        <Table responsive>
          <thead>
            <tr>
              <th>Image</th>
              <th>Heading</th>
              <th>Text</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { allCategories.length > 0 ? allCategories.map((value, index) => {
              return (
                <tr key={ index }>
                  <td>
                    <img src={ baseURL + value.image } class="rounded" height="40" width="40" alt="" />
                  </td>

                  <td>{ value.heading }</td>

                  <td>{ value.text }</td>

                  <td>
                    <UncontrolledDropdown>
                      <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                        <MoreVertical size={ 15 } />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <Link to={ `/category/form/edit?_id=${ value._id }` }>
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
                      toggle={ () => toggleModal(value.id) }
                      className='modal-dialog-centered'
                      modalClassName="modal-danger"
                      key={ value._id }>
                      <ModalHeader toggle={ () => toggleModal(value.id) }>Delete</ModalHeader>
                      <ModalBody>
                        Are you sure you want to  this?
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" onClick={ () => deleteCategory(value._id) }>
                          delete
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </td>
                </tr>
              )
            }) : <Spinner color='primary' />
            }
          </tbody>
        </Table>
      </CardBody>
    </Card>
  )
}

export default CategoryTable