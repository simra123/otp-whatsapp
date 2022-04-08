import { useContext } from 'react'
import { Row, Col } from 'reactstrap'
import CompanyTable from './CompanyTable'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import Earnings from '@src/views/ui-elements/cards/analytics/Earnings'
import CardMedal from '@src/views/ui-elements/cards/advance/CardMedal'
import CardMeetup from '@src/views/ui-elements/cards/advance/CardMeetup'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
import GoalOverview from '@src/views/ui-elements/cards/analytics/GoalOverview'
import RevenueReport from '@src/views/ui-elements/cards/analytics/RevenueReport'
import OrdersBarChart from '@src/views/ui-elements/cards/statistics/OrdersBarChart'
import ProfitLineChart from '@src/views/ui-elements/cards/statistics/ProfitLineChart'
import CardTransactions from '@src/views/ui-elements/cards/advance/CardTransactions'
import CardBrowserStates from '@src/views/ui-elements/cards/advance/CardBrowserState'
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
import { BiCategory } from 'react-icons/bi'
import { BsFillBookmarkStarFill } from 'react-icons/bs'
import { GrUserManager } from 'react-icons/gr'
import { RiUserStarFill } from 'react-icons/ri'
const EcommerceDashboard = () => {

  return (
    <div id='dashboard-ecommerce'>
      <Row>
        {/* Stats With Icons */ }
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={ <BsFillBookmarkStarFill size={ 21 } /> } color='info' stats='36.9k' statTitle='Bookings' />
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={ < ShoppingBag size={ 21 } /> } color='danger' stats='97.8k' statTitle='Orders' />
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={ <GrUserManager size={ 21 } /> } color='warning' stats='12k' statTitle='Customers' />
        </Col>

        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={ <RiUserStarFill size={ 21 } /> } color='primary' stats='26.8' statTitle='Employees' />
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={ <Award size={ 21 } /> } color='danger' stats='2.1k' statTitle='Services' />
        </Col>
        <Col xl='3' md='4' sm='6'>
          <StatsVertical icon={ <BiCategory size={ 21 } /> } color='success' stats='689' statTitle='Categories' />
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
