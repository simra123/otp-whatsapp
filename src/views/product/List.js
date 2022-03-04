import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../@core/scss/react/libs/file-uploader/file-uploader.scss'
import 'uppy/dist/uppy.css'
import { MoreVertical, Edit, Trash, User } from 'react-feather'


import { Card, Spinner, CardTitle, CardBody, Table, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap'

//   const products = [
//     {  
//       id:1,
//       no : 1,
//       proName : 'Headphones',
//       proImage : 'https://nanny-frontend.netlify.app/static/media/headphones.57e3be39.jpg',
//       price : '50$'
//     },
//     {  
//         id:2,
//         no : 2,
//         proName : 'Selfie Stick',
//         proImage : 'https://nanny-frontend.netlify.app/static/media/selfie-stick.4e27ea96.jpg',
//         price : '50$'
//     },
//     {  
//         id:3,
//         no : 3,
//         proName : 'Headphones',
//         proImage : 'https://nanny-frontend.netlify.app/static/media/headphones.57e3be39.jpg',
//         price : '50$'
//     },
//     {  
//         id:4,
//         no : 4,
//         proName : 'Headphones',
//         proImage : 'https://nanny-frontend.netlify.app/static/media/headphones.57e3be39.jpg',
//         price : '50$'
//       }

// ]
import Action from '../../middleware/API'
import BaseURL from '../../middleware/BaseURL'
const Banner = () => {
  const [modal, setModal] = useState(false)
  const [products, setproducts] = useState([])
  useEffect(async () => {
    const res = await Action.get('/product', {})
    if (res.data.success === true) {
    console.log(res.data)
      setproducts(res?.body?.body)
    } else {
      setproducts([])
    }
  }, [modal])
  console.log(products)

  const toggleModalDanger = async (id) => {
    if (id) {
      setModal(true)
      const res = await Action.delete(`/product?id=${id}`, {})
    } else {
      setModal(false)
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
                    <tr key={index}>
                      <td>
                        {index + 1}
                      </td>
                      <td>{value.name}</td>
                      <td> <img className="rounded-circle" src={value.image ? (BaseURL + value.image[0]) : null} width="80" height="80" alt="" /> </td>
                      <td>{value.price}</td>

                      <td>
                        <UncontrolledDropdown>
                          <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                            <MoreVertical size={15} />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <Link to="/product/form" state={value}>
                              <DropdownItem href='/' >
                                <Edit className='mr-50' size={15} />  <span className='align-middle'>Edit</span>
                              </DropdownItem>
                            </Link>

                            <DropdownItem href='/' onClick={(e) => {
                              e.preventDefault()
                              toggleModalDanger(value._id)
                            }}>
                              <Trash className='mr-50' size={15} /> <span className='align-middle'>Delete</span>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>


                        {/* delete modal */}
                        <Modal
                          isOpen={modal === value.id}
                          toggle={() => toggleModalDanger(value.id)}
                          className='modal-dialog-centered'
                          modalClassName="modal-danger"
                          key={value.id}>
                          <ModalHeader toggle={() => toggleModalDanger(value.id)}>Delete</ModalHeader>
                          <ModalBody>
                            Are you sure you want to delete this?
                          </ModalBody>
                          <ModalFooter>
                            <Button color="danger" onClick={() => toggleModalDanger(value.id)}>
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
