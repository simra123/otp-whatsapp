import { useEffect, useState } from 'react'
import { Row, Col } from 'reactstrap'
import Action from '@src/middleware/API'
// import CompanyTable from './CompanyTable'
// import { ThemeColors } from '@src/utility/context/ThemeColors'
// import Earnings from '@src/views/ui-elements/cards/analytics/Earnings'
// import CardMedal from '@src/views/ui-elements/cards/advance/CardMedal'
// import CardMeetup from '@src/views/ui-elements/cards/advance/CardMeetup'
// import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
// import GoalOverview from '@src/views/ui-elements/cards/analytics/GoalOverview'
// import RevenueReport from '@src/views/ui-elements/cards/analytics/RevenueReport'
// import OrdersBarChart from '@src/views/ui-elements/cards/statistics/OrdersBarChart'
// import ProfitLineChart from '@src/views/ui-elements/cards/statistics/ProfitLineChart'
// import CardTransactions from '@src/views/ui-elements/cards/advance/CardTransactions'
// import CardBrowserStates from '@src/views/ui-elements/cards/advance/CardBrowserState'
import StatsVertical from '../../components/dashboardStatics/StatsVertical'

import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import {
  Eye,
  MessageSquare,
  ShoppingBag,
  Heart,
  Award,
  Truck,
  Cpu,
  Server,
  Activity,
  AlertOctagon
} from 'react-feather'
import { BiCategory, BiCartAlt } from 'react-icons/bi'
import { BsFillBookmarkStarFill } from 'react-icons/bs'
import { FaUserTie } from 'react-icons/fa'
import { RiUserStarFill } from 'react-icons/ri'
const EcommerceDashboard = () => {
  const [data, setData] = useState({
    services: 0,
    orders: 0,
    customers: 0,
    employees: 0,
    bookings: 0,
    categories: 0,
    products: 0
  })
  useEffect(() => {
    const getData = async () => {
      try {
        const service = await Action.get(`/service`)
        const employee = await Action.get(`/auth/employee`)
        const customer = await Action.get(`/auth/customer`)
        const category = await Action.get(`/category`)
        const order = await Action.get(`/order`)
        const booking = await Action.get(`/booking`)
        const product = await Action.get(`/product`)
        setData({
          services: service.data.data.length,
          orders: order.data.data.length,
          customers: customer.data.data.length,
          employees: employee.data.data.length,
          bookings: booking.data.data.length,
          categories: category.data.data.length,
          products: product.data.data.length
        })
      } catch (error) {
        console.log(error)
      }

    }
    getData()
  }, [])
  return (
    <div id='dashboard-ecommerce'>
      <Row>
        {/* Stats With Icons */ }
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={ <BsFillBookmarkStarFill size={ 28 } /> } color='info' stats={ data.bookings } statTitle='Bookings' />
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={ < ShoppingBag size={ 28 } /> } color='danger' stats={ data.orders } statTitle='Orders' />
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={ <FaUserTie size={ 28 } /> } color='warning' stats={ data.customers } statTitle='Customers' />
        </Col>

        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={ <RiUserStarFill size={ 28 } /> } color='primary' stats={ data.employees } statTitle='Employees' />
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={ <Award size={ 28 } /> } color='danger' stats={ data.services } statTitle='Services' />
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={ <BiCategory size={ 28 } /> } color='success' stats={ data.categories } statTitle='Categories' />
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={ <BiCartAlt size={ 28 } /> } color='primary' stats={ data.products } statTitle='Products' />
        </Col>

        {/* Stats With Icons */ }
      </Row>
      {/* <Row className='match-height'>
        <Col xl='4' md='6' xs='12'>
          <CardMedal />
        </Col>
        <Col xl='8' md='6' xs='12'>
          <StatsCard cols={ { xl: '3', sm: '6' } } />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col lg='4' md='12'>
          <Row className='match-height'>
            <Col lg='6' md='3' xs='6'>
              <OrdersBarChart warning={ colors.warning.main } />
            </Col>
            <Col lg='6' md='3' xs='6'>
              <ProfitLineChart info={ colors.info.main } />
            </Col>
            <Col lg='12' md='6' xs='12'>
              <Earnings success={ colors.success.main } />
            </Col>
          </Row>
        </Col>
        <Col lg='8' md='12'>
          <RevenueReport primary={ colors.primary.main } warning={ colors.warning.main } />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col lg='8' xs='12'>
          <CompanyTable />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <CardMeetup />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <CardBrowserStates colors={ colors } trackBgColor={ trackBgColor } />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <GoalOverview success={ colors.success.main } />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <CardTransactions />
        </Col>
      </Row> */}
    </div>
  )
}

export default EcommerceDashboard
