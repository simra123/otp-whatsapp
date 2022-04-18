// ** Third Party Components
import { Card, CardBody, CardText, Row, Col, Table } from 'reactstrap'
import Logo from '@src/assets/images/logo/logo2.png'
let Subtotal = 0
let total = 0
const Discount = 20
const PreviewCard = ({ data }) => {

  data.products.map((product, i) => {
    total = 0
    Subtotal += product.price * product.quantity
    total += product.price * product.quantity
    // data.products[i].totalQuantity = sum
    data.products[i].total = total
    //console.log("product index", index, "order index ", i, "product price", product.price, price)
  })

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
                Invoice <span className='invoice-number'>#{ data?.invoiceid }</span>
              </h4>
              <div className='d-inline-flex'>
                <p className='invoice-date-title'>Date Issued:</p>
                <p className='ml-1 font-weight-bold'> { data?.createdAt.slice(0, 10) }</p>
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
            <h6 className='mb-25'> { data?.name } </h6>
            <CardText className='mb-25'> { data?.email } </CardText>
            <CardText className='mb-25'> { data?.address } </CardText>
            <CardText className='mb-25'> { data?.mobile } </CardText>
          </Col>
        </Row>

        {/* /Header */ }
      </CardBody>
      {/* Invoice Description */ }
      <Table responsive>
        <thead>
          <tr>
            <th className='py-1'>#</th>
            <th className='py-1'>Item</th>
            <th className='py-1'>Color</th>
            <th className='py-1'>Size</th>
            <th className='py-1'>Quatity</th>
            <th className='py-1'>Price</th>
            <th className='py-1'>Total</th>

          </tr>
        </thead>
        <tbody>
          { data.products.map((products, index) => {
            return (
              <tr>
                <td className='py-1' key={ products.product }>

                  { index + 1 }
                </td>
                <td className='py-1'>
                  <span className='font-weight-bold'>{ products.name }</span>
                </td>
                <td className='py-1'>
                  <span className='font-weight-bold'>{ products.color.map((color) => { return (`${ color }, `) }) }</span>
                </td>
                <td className='py-1'>
                  <span className='font-weight-bold'>{ products.size.map((size) => { return (`${ size }, `) }) }</span>
                </td>
                <td className='py-1'>
                  <span className='font-weight-bold'>{ products.price }</span>
                </td>
                <td className='py-1'>
                  <span className='font-weight-bold'>{ products.quantity }</span>
                </td>
                <td className='py-1'>
                  <span className='font-weight-bold'>${ products.quantity * products.price }</span>
                </td>
              </tr>
            )
          }) }
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
                <p className='invoice-total-amount'>${ Subtotal }</p>
              </div>
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Discount:</p>
                <p className='invoice-total-amount'>${ Discount }</p>
              </div>
              {/* <div className='invoice-total-item'>
                <p className='invoice-total-title'>Tax:</p>
                <p className='invoice-total-amount'>21%</p>
              </div> */}
              <hr className='my-50' />
              <div className='invoice-total-item'>
                <p className='invoice-total-title'>Total:</p>
                <p className='invoice-total-amount'>${ Subtotal - Discount }</p>
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
