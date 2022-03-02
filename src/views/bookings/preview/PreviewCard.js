// ** Third Party Components
import { Card, CardBody, CardText, Row, Col, Table, Label, Button } from 'reactstrap'
import Logo from '@src/assets/images/logo/logo2.png'
import Avatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import Avatar2 from '@src/assets/images/portrait/small/avatar-s-8.jpg'
import {Link} from 'react-router-dom'
import {FaMapMarkerAlt} from 'react-icons/fa'
import Bar from '../progress-bar'
import Select from 'react-select'
const status =   [
  { label : "Pending ", value : "0%"},
  { label : "Accepted ", value : "10%"},
  { label : "Rejected ", value : "20%"},
  { label : "Assigned ", value : "30%"},
  { label : "Canceled ", value : "40%"},
  { label : "Complete ", value : "50%"}
 ]


const PreviewCard = ({ data }) => {  
  return data !== null ? (
    <Card className='invoice-preview-card'>
      <CardBody className='invoice-padding pb-0'>
        {/* Header */}
          <Row>
            <Col md="6">
            <div className='logo-wrapper'>
              <img src={Logo} width="170"/>
            </div>
            </Col>
            <Col md="6" className="text-right justify-ite">
            <div className='mt-md-0 mt-2'>
            <h4 className='i'>
              Invoice <span className='invoice-number'>#{data.invoiceid}</span>
            </h4>
            <div className='d-inline-flex'>
              <p className='invoice-date-title'>Date Issued:</p>
              <p className='ml-1 font-weight-bold'>{data.createdAt}</p>
            </div>
            {/* <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Due Date:</p>
              <p className='invoice-date'>{data.invoice.dueDate}</p>
            </div> */}
          </div>
            </Col>
          </Row>
          <Row  className="mb-2">
            <Col md="8">
            <h6 className='mb-2'>Customer Info:</h6>
            <div className='d-inline-flex mb-50'>
              <img className='mr-50 rounded-circle' src={Avatar} width='35' height='35' />
              <h6 className=' mt-50'>{data.userid[0].name}</h6>
            </div>
            <CardText className='mb-25'>{data.userid[0].phone}</CardText>
            <CardText className='mb-25'>{data.userid[0].email}</CardText>
            <Link to="/bookings/map">
            <CardText className='mb-25'>{data.userid[0].address}</CardText>
            </Link>
            </Col>
            <Col md="4">
            <h6 className='mb-2'>Employee Info:</h6>
            <div className='d-inline-flex mb-50'>
              <img className='mr-50 rounded-circle' src={Avatar2} width='35' height='35' />
              <h6 className=' mt-50'>{data.employeeid[0].name} </h6>
            </div>
            <CardText className='mb-25'>{data.employeeid[0].phone}</CardText>
            <CardText className='mb-25'>{data.employeeid[0].phone}</CardText>
            <Link to="/bookings/map">
            <div className='d-inline-flex mb-50'>
              <FaMapMarkerAlt className='mr-25' size={20}/>
            <CardText className='mb-25'>Track Empployee</CardText>
            </div>
            </Link>
            {/* <CardText className='mb-25'>{data.invoice.client.contact}</CardText> */}
            </Col>
            </Row>

        {/* /Header */}
      </CardBody>

      {/* <hr className='invoice-spacing' /> */}

      {/* Address and Contact */}
      {/* <CardBody className='invoice-padding pt-0'>
        <Row className='invoice-spacing'>
          <Col className='p-0' lg='8'>
            <h6 className='mb-2'>Invoice To:</h6>
            <h6 className='mb-25'>{data.invoice.client.name}</h6>
            <CardText className='mb-25'>{data.invoice.client.company}</CardText>
            <CardText className='mb-25'>{data.invoice.client.address}</CardText>
            <CardText className='mb-25'>{data.invoice.client.contact}</CardText>
            <CardText className='mb-0'>{data.invoice.client.companyEmail}</CardText>
          </Col>
          <Col className='p-0 mt-xl-0 mt-2' lg='4'>
            <h6 className='mb-2'>Payment Details:</h6>
            <table>
              <tbody>
                <tr>
                  <td className='pr-1'>Total Due:</td>
                  <td>
                    <span className='font-weight-bolder'>{data.paymentDetails.totalDue}</span>
                  </td>
                </tr>
                <tr>
                  <td className='pr-1'>Bank name:</td>
                  <td>{data.paymentDetails.bankName}</td>
                </tr>
                <tr>
                  <td className='pr-1'>Country:</td>
                  <td>{data.paymentDetails.country}</td>
                </tr>
                <tr>
                  <td className='pr-1'>IBAN:</td>
                  <td>{data.paymentDetails.iban}</td>
                </tr>
                <tr>
                  <td className='pr-1'>SWIFT code:</td>
                  <td>{data.paymentDetails.swiftCode}</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </CardBody> */}
      {/* /Address and Contact */}

      {/* Invoice Description */}
      <Table responsive>
        <thead>
          <tr>
            <th className='py-1'>Service Name</th>
            <th className='py-1'>Service Time</th>
            <th className='py-1'>Service Date</th>
            <th className='py-1'>Customer Info</th>
            <th className='py-1'>Employee Info</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='py-1'>
              {/* <p className='card-text font-weight-bold mb-25'>Native App Development</p>
              <p className='card-text text-nowrap'>
                Developed a full stack native app using React Native, Bootstrap & Python
              </p> */}
              {data.serviceid[0].heading}
            </td>
            <td className='py-1'>
              <span className='font-weight-bold'>{data.starttime}</span>
            </td>
            <td className='py-1'>
              <span className='font-weight-bold'>{data.startdate}</span>
            </td>
            <td className='py-1'>
            <div className='d-inline-flex mb-50'>
              <img className='mr-50 rounded-circle' src={Avatar2} width='35' height='35' />
              <h6 className=' mt-50'>{data.userid[0].name} </h6>
            </div>
            </td>
            <td className='py-1'>
              <div className='d-inline-flex mb-50'>
                <img className='mr-50 rounded-circle' src={Avatar} width='35' height='35' />
                <h6 className=' mt-50'>{data.employeeid[0].name}</h6>
              </div>
            </td>
          </tr>
          
        </tbody>
      </Table>
      {/* /Invoice Description */}

      {/* Total & Sales Person */}
      
      {/* /Total & Sales Person */}


      {/* Invoice Note */}
      <CardBody className='my-5 px-5'>
        <Bar state= {data.status}/>
        <Row>
          <Col md='3' className='mt-5'>
            <Label>set Status</Label>
            <Select
            className='react-select'
            classNamePrefix='select'
            defaultValue={status[0].label}
            
            options={status}
            />
            </Col>
            <Col md='3' className='mt-0 mt-md-5'>
            <Button.Ripple className='mt-2' color='primary' type='submit' onClick={e => e.preventDefault()}>
             Update
            </Button.Ripple>
          </Col>
        </Row>
      </CardBody>
      {/* /Invoice Note */}
    </Card>
  ) : null
}

export default PreviewCard
