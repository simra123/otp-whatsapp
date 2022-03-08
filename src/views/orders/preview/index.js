import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
// ** Third Party Components
import axios from 'axios'
import { Row, Col, Alert } from 'reactstrap'

// ** Invoice Preview Components
import PreviewCard from './PreviewCard'
import PreviewActions from './PreviewActions'
import Action from '../../../middleware/API'
import baseURL from '../../../middleware/BaseURL'


// ** Styles
import '@styles/base/pages/app-invoice.scss'

const InvoicePreview = () => {
  // ** Vars
  const { id } = useParams()

  // ** States
  const [data, setData] = useState(null)
  const [sendSidebarOpen, setSendSidebarOpen] = useState(false)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)

  // ** Functions to toggle add & send sidebar
  const toggleSendSidebar = () => setSendSidebarOpen(!sendSidebarOpen)
  const toggleAddSidebar = () => setAddPaymentOpen(!addPaymentOpen)


  // ** Get invoice on mount based on id
  useEffect(() => {
    const getSingleOrder = async () => {
      const { data } = await Action.get(`/order?id=${ id }`)
      setData(data.data)
      console.log(data.data)
    }
    getSingleOrder()
  }, [])


  return data !== null ? (
    <div className='invoice-preview-wrapper'>
      <Row className='invoice-preview'>
        <Col xl={ 12 } md={ 12 } sm={ 12 }>
          <PreviewCard data={ data } />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>Invoice not found</h4>
      <div className='alert-body'>
        Invoice with id: { id } doesn't exist. Check list of all invoices: <Link to='/invoice/list'>Invoice List</Link>
      </div>
    </Alert>
  )
}

export default InvoicePreview
