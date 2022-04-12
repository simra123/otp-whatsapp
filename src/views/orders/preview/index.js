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

  // ** Get invoice on mount based on id
  useEffect(() => {
    const getSingleOrder = async () => {
      const { data } = await Action.get(`/order?_id=${ id }`)
      setData(data.data[0])
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
    <div>
      loading...
    </div>
  )
}

export default InvoicePreview
