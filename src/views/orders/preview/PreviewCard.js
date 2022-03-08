// ** Third Party Components
import { Card, CardBody, CardText, Row, Col, Table } from 'reactstrap'
import Logo from '@src/assets/images/logo/logo2.png'

const PreviewCard = ({ data }) => {
  { console.log(data) }
  return data !== null ? (
    <Card className='invoice-preview-card'>
      <CardBody className='invoice-padding pb-0'>
        {/* Header */ }
        <Row>
          <Col md="6">
            <div className='logo-wrapper'>
              <img src={ Logo } width="170" />
            </div>
          </Col>
          <Col md="6" className="text-right justify-ite">
            <div className='mt-md-0 mt-2'>
              <h4 className='i'>
                Invoice <span className='invoice-number'>#{ data._id }</span>
              </h4>
              <div className='d-inline-flex'>
                <p className='invoice-date-title'>Date Issued:</p>
                <p className='ml-1 font-weight-bold'> data.invoice.issuedDate </p>
              </div>
              {  /* <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>Due Date:</p>
              <p className='invoice-date'>data.invoice.dueDate</p>
            </div> */}
            </div>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col md="8">
            <h6 className='mb-2'>Invoice From:</h6>
            <h6 className='mb-25'>Care Inc</h6>
            <CardText className='mb-25'>Office 149, 450 South Brand Brooklyn</CardText>
            <CardText className='mb-25'>San Diego County, CA 91905, USA</CardText>
            <CardText className='mb-0'>+1 (123) 456 7691, +44 (876) 543 2198</CardText>
          </Col>
          <Col md="4">
            <h6 className='mb-2'>Invoice To:</h6>
            <h6 className='mb-25'> {data[0].name} </h6>
            <CardText className='mb-25'> data.invoice.client.company </CardText>
            <CardText className='mb-25'> data.invoice.client.address </CardText>
            <CardText className='mb-25'> data.invoice.client.contact </CardText>
          </Col>
        </Row>

        {/* /Header */ }
      </CardBody>

      {/* <hr className='invoice-spacing' /> */ }

      {/* Address and Contact */ }
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
      {/* /Address and Contact */ }

      {/* Invoice Description */ }
      <Table responsive>
        <thead>
          <tr>
            <th className='py-1'>#</th>
            <th className='py-1'>Item</th>
            <th className='py-1'>Price</th>
            <th className='py-1'>Qty</th>
            <th className='py-1'>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='py-1'>
              {/* <p className='card-text font-weight-bold mb-25'>Native App Development</p>
              <p className='card-text text-nowrap'>
                Developed a full stack native app using React Native, Bootstrap & Python
              </p> */}
              1
            </td>
            <td className='py-1'>
              <span className='font-weight-bold'>4</span>
            </td>
            <td className='py-1'>
              <span className='font-weight-bold'>T-shirt</span>
            </td>
            <td className='py-1'>
              <span className='font-weight-bold'>5</span>
            </td>
            <td className='py-1'>
              <span className='font-weight-bold'>$450</span>
            </td>
          </tr>
          <tr className='border-bottom'>
            <td className='py-1'>
              {/* <p className='card-text font-weight-bold mb-25'>Ui Kit Design</p>
              <p className='card-text text-nowrap'>Designed a UI kit for native app using Sketch, Figma & Adobe XD</p> */}
              2
            </td>
            <td className='py-1'>
              <span className='font-weight-bold'>Socks</span>
            </td>
            <td className='py-1'>
              <span className='font-weight-bold'>$20</span>
            </td>
            <td className='py-1'>
              <span className='font-weight-bold'>4</span>
            </td>
            <td className='py-1'>
              <span className='font-weight-bold'>$128</span>
            </td>
          </tr>
        </tbody>
      </Table>
      {/* /Invoice Description */ }

      {/* Total & Sales Person */ }
      <CardBody className='invoice-padding pb-2'>
        <Row className='invoice-sales-total-wrapper'>
          <Col className='d-flex justify-content-end' md='12' order={ { md: 2, lg: 1 } }>
            <div className='invoice-total-wrapper'>
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Subtotal:</p>
                <p className='invoice-total-amount'>$1800</p>
              </div>
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Discount:</p>
                <p className='invoice-total-amount'>$28</p>
              </div>
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Tax:</p>
                <p className='invoice-total-amount'>21%</p>
              </div>
              <hr className='my-50' />
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Total:</p>
                <p className='invoice-total-amount'>$1690</p>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
      {/* /Total & Sales Person */ }

      {/* <hr className='invoice-spacing' /> */ }

      {/* Invoice Note */ }
      {/* <CardBody className='invoice-padding pt-0'>
        <Row>
          <Col sm='12'>
            <span className='font-weight-bold'>Note: </span>
            <span>
              It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance
              projects. Thank You!
            </span>
          </Col>
        </Row>
      </CardBody> */}
      {/* /Invoice Note */ }
    </Card>
  ) : null
}

export default PreviewCard
