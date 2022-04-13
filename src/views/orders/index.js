// ** React Imports
import { Link } from 'react-router-dom'
import { AiOutlineCloudDownload, AiOutlineDelete } from 'react-icons/ai'
import Pagination from '@src/views/components/pagination/PaginationBasic'

// ** Third Party Components
import { Eye } from 'react-feather'
import { UncontrolledTooltip, Label, Modal, ModalHeader, Button, ModalBody, ModalFooter, Input, Table, Row, Col, Card } from 'reactstrap'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import CardBody from 'reactstrap/lib/CardBody'
import { useState, useEffect } from 'react'
import Action from '../../middleware/API'
//import toast types from components 
import { SuccessToast, ErrorToast } from '../components/toastify'
//import toasts from react
import { toast } from 'react-toastify'

const orderTable = () => {
  const [allOrders, setAllOrders] = useState([])
  const [filterOrders, setFilterOrders] = useState([])

  const [modal, setModal] = useState(null)
  //delete modal
  const toggleModalDanger = id => {
    if (modal !== id) {
      setModal(id)
    } else {
      setModal(null)
    }
  }
  useEffect(() => {
    //using promise 
    const GetOrders = async () => {
      try {
        const { data } = await Action.get('/order')
        setAllOrders(data.data)
        setFilterOrders(data.data)
      } catch (error) {
        console.log(error)
      }
    }
    GetOrders()
  }, [modal])
  //getting single user product quantity and price
  let sum = 0
  let price = 0

  allOrders.map((orders, i) => {
    sum = 0
    price = 0
    orders.products.map((product, index) => {
      sum += product.quantity
      price += product.price * product.quantity

      //console.log("product index", index, "order index ", i, "product price", product.price, price)
    })
    //manually adding fields in api
    allOrders[i].totalQuantity = sum
    allOrders[i].totalPrice = price

  })
  //let filterOrders

  const handleFilter = (email) => {

    setFilterOrders(allOrders.filter(value => value.name.startsWith(email)))

  }

  //pagination algo
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage, setDataPerPage] = useState(5)
  //setting pages into the pagination
  const indexOfLastPage = currentPage * dataPerPage//5
  const indexOfFirstPage = indexOfLastPage - dataPerPage //0

  const currentData = filterOrders.slice(indexOfFirstPage, indexOfLastPage)
  const totalPages = filterOrders.length //15

  //change pages onclick 
  const Paginate = (pageNumber) => { setCurrentPage(pageNumber) }

  //delete api 
  const deleteOrder = async (id) => {
    const res = await Action.delete(`/order?id=${ id }`)
    if (res.data.success) {
      toast.success(<SuccessToast title="Success" text="Product Deleted Succesfully!" />)
      toggleModalDanger(id)
    } else {
      toast.error(<ErrorToast title="error" text={ res.data.message } />)
    }
  }

  return (
    <Card>
      <CardBody>
        <div className='invoice-list-table-header w-100 p-1'>
          <Row>
            <Col
              lg='6'
              className='actions-right d-flex flex-lg-nowrap mb-2 flex-wrap mt-lg-0 mt-1 pr-lg-1 p-0'>
              <div className='d-flex align-items-center'>
                <Label for='search-invoice'>Search</Label>
                <Input
                  id='search-invoice'
                  className='ml-50 mr-2 w-100'
                  type='text'
                  onChange={ e => handleFilter(e.target.value) }
                  placeholder='Search Invoice by name'
                />
              </div>
            </Col>
          </Row>
          <Table responsive>
            <thead>
              <tr>
                <th>SR NO</th>
                <th>CUSTOMER</th>
                <th>TOTAL ITEMS</th>
                <th>AMOUNT</th>
                <th>CITY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            {
              filterOrders.length ? <tbody>
                {
                  currentData.map((data, i) => {
                    return (

                      <tr className='p-3'>
                        <td>
                          {/* { index + (indexOfFirstPage + 1) } */ } { i + indexOfFirstPage + 1 }
                        </td>
                        <td>
                          <div className='d-flex justify-content-left align-items-center'>
                            {/* <img src={ avatar1 } width='35' className='mr-50 rounded-circle' height='35' alt="" /> */ }
                            <div className='rounded-circle bg-info mr-1 text-center ' style={ { height: "40px", width: "40px", fontWeight: "600", paddingTop: "10px" } }>
                              <span className='text-white text-xs font-bold text-capitalize '> { data.name.slice(0, 1) } </span>
                            </div>
                            <div className='d-flex flex-column'>
                              <h6 className='user-name text-truncate mb-0'>{ data.name }</h6>
                              <small className='text-truncate text-muted mb-0'>{ data.email }</small>
                            </div>
                          </div>
                        </td>
                        <td> { data.totalQuantity } </td>
                        <td>{ data.totalPrice }</td>
                        <td>{ data.city }</td>

                        <td>
                          <div className='column-action d-flex align-items-center'>
                            <AiOutlineCloudDownload size={ 19 } id={ `send-tooltip-5036` } />
                            <UncontrolledTooltip placement='top' target={ `send-tooltip-5036` }>
                              Download
                            </UncontrolledTooltip>
                            <Link to={ `/orders/preview/${ data._id }` } className="text-dark" id={ `pw-tooltip-5036` }>
                              <Eye size={ 19 } className='mx-1' />
                            </Link>
                            <UncontrolledTooltip placement='top' target={ `pw-tooltip-5036` }>
                              Preview Invoice
                            </UncontrolledTooltip>
                            <AiOutlineDelete size={ 19 } className='' id="row-id" onClick={ () => toggleModalDanger(data._id) } />
                            <UncontrolledTooltip placement='top' target="row-id" >
                              Delete
                            </UncontrolledTooltip>
                          </div>
                          <Modal
                            isOpen={ modal === data._id }
                            toggle={ () => toggleModalDanger(data._id) }
                            className='modal-dialog-centered'
                            modalClassName="modal-danger"
                            key={ data._id }>
                            <ModalHeader toggle={ () => toggleModalDanger(data._id) }>Delete</ModalHeader>
                            <ModalBody>
                              Are you sure you want to delete a order?
                            </ModalBody>
                            <ModalFooter>
                              <Button color="danger" onClick={ () => deleteOrder(data._id) }>
                                delete
                              </Button>
                            </ModalFooter>
                          </Modal>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody> : <p className='mt-1 mx-2 font-bold'>NO LIST FOUND!</p> }
          </Table>
          {
            totalPages > dataPerPage ? <Pagination dataPerPage={ dataPerPage } currentPage={ currentPage } Paginate={ Paginate } totalPages={ totalPages } /> : null
          }
        </div>
      </CardBody>
    </Card>
  )
}

export default orderTable
