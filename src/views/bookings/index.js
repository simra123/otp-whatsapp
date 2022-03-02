// ** React Imports
import { Link } from 'react-router-dom'
import { AiOutlineCloudDownload, AiOutlineDelete } from 'react-icons/ai'
import avatar1 from '@src/assets/images/portrait/small/avatar-s-5.jpg'
import Pagination from '../orders/pagination'
import Avatar from '@components/avatar'

// ** Third Party Components
import { Eye, LogIn, Coffee } from 'react-feather'
import { UncontrolledTooltip, Label, Input, Table, Row, Col, Card } from 'reactstrap'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import CardBody from 'reactstrap/lib/CardBody'
import { useState, useEffect, Fragment } from 'react'
import { toast, Slide } from 'react-toastify'
import Action from "../../middleware/API"
import Dropdown from 'reactstrap/lib/Dropdown'
import Button from 'reactstrap/lib/Button'


const ToastContent = ({ service, user }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title font-weight-bold'>Welcome, {user}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>Booking of the service {service} by {user} is deleted successfully</span>
    </div>
  </Fragment>
)

const orderTable = ({ handleFilter, value, handleStatusValue, statusValue, handlePerPage, rowsPerPage }) => {
  const [data, setdata] = useState([])
  const [order, setorder] = useState([])
  const [query, setquery] = useState('')
  const [page, setpage] = useState(1)
  async function getorders() {
    const res = await Action.get(`/booking?page=${page}&limit=30`, {})
    if (res.data.success === true) {
      setorder(res.data.data)
      setdata(res.data.data)
    } else {
      setorder([])
    }
  }
  useEffect(async () => {
    getorders()

  }, [page])

  async function search(value) {
    const content = []
    if (value.length === 0) {
      getorders()
    }
    data.map((item, index) => {
      if (value === item.serviceid[0].heading || value === item.name || value === (item.invoiceid).toString()) {
        content.push(item)
      }
    })
    setorder(content)
  }
  async function deletebooking(item, service, user) {
    const res = await Action.delete(`/booking/?id=${item}`, {})
    if (res.data.success === true) {
      toast.success(
        <ToastContent service={service} user={user} />,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
      getorders()
    } else {
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

                <Input
                  id='search-invoice'
                  className='ml-50 mr-2 w-100'
                  type='text'
                  value={query}
                  onChange={e => {

                    setquery(e.target.value)

                  }}
                  placeholder='Search Customer'
                />
                <Button onClick={async () => {
                  await search(query)
                }}>
                  Search
                </Button>
              </div>
            </Col>

          </Row>
          <Table responsive>
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>CUSTOMER</th>
                <th>Service</th>
                <th>Service Date</th>
                <th>Service Time</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {
                order.map((item) => {
                  return (

                    <tr className='p-3'>
                      <td>
                        <Link to={`/bookings/preview/${item.invoiceid}`}>#{item.invoiceid}</Link>
                      </td>
                      <td>
                        <div className='d-flex justify-content-left align-items-center'>
                          <img src={avatar1} width='35' className='mr-50 rounded-circle' height='35' alt="" />
                          <div className='d-flex flex-column'>
                            <h6 className='user-name text-truncate mb-0'>{item.name}</h6>
                            <small className='text-truncate text-muted mb-0'>{item.email}</small>
                          </div>
                        </div>
                      </td>
                      <td>{item.serviceid[0].heading}</td>
                      <td> {item.startdate} </td>
                      <td>{item.starttime}</td>
                      <td>
                        <div className='column-action d-flex align-items-center'>
                          <AiOutlineCloudDownload size={19} id={`send-tooltip-5036`} />
                          <UncontrolledTooltip placement='top' target={`send-tooltip-5036`}>
                            Download
                          </UncontrolledTooltip>
                          <Link to={`/bookings/preview/${item._id}`} className="text-dark" id={`pw-tooltip-5036`}>
                            <Eye size={19} className='mx-1' />
                          </Link>
                          <UncontrolledTooltip placement='top' target={`pw-tooltip-5036`}>
                            Preview Invoice
                          </UncontrolledTooltip>
                          <AiOutlineDelete size={19} className='' id="row-id" onClick={() => {
                            deletebooking(item._id, item.serviceid[0].heading, item.userid[0].name)
                          }} />
                          <UncontrolledTooltip placement='top' target="row-id">
                            Delete
                          </UncontrolledTooltip>

                        </div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          <Pagination />
        </div>
      </CardBody>
    </Card>
  )
}

export default orderTable
