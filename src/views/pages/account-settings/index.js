import { Fragment, useState, useEffect } from 'react'
import Tabs from './Tabs'
import Breadcrumbs from '@components/breadcrumbs'
import GeneralTabContent from './GeneralTabContent'
import PasswordTabContent from './PasswordTabContent'
import { Row, Col, TabContent, TabPane, Card, CardBody } from 'reactstrap'
import Action from '@src/middleware/API'

import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'
//import toast types from components
import { SuccessToast, ErrorToast } from '../../components/toastify'
//import toasts from react
import { toast } from 'react-toastify'
const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('1'),
    [data, setData] = useState(null)

  const toggleTab = tab => {
    setActiveTab(tab)
  }
  const [value, setValue] = useState({
    name: '',
    email: ''
  })
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  useEffect(async () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const { data } = await Action.get(`/auth/${ userData.data.usertype }?_id=${ userData.data._id }`)
    setValue({
      name: data.data[0].name,
      email: data.data[0].email
    })
    setData(userData.data)

  }, [])
  const onSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const res = await Action.put(`/auth/updateprofile/${ data._id }`, {
      name: value.name,
      email: value.email
    })
    console.log(res)
    if (res.data.success) {
      toast.success(<SuccessToast title="Success" text="user profile updated Successfully!" />)
      setLoading(false)
    } else {
      setLoading(false)
      toast.error(<ErrorToast title="error" text={ res.data.message } />)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await Action.post(`auth/resetpassword`, {
      email: data.email,
      password: passwords.newPassword,
      confirmpassword: passwords.confirmPassword
    })
    console.log(res)
    if (res.data.success) {
      setLoading(false)
      toast.success(<SuccessToast title="Success" text={ res.data.message } />)
    } else {
      setLoading(false)
      toast.error(<ErrorToast title="error" text={ res.data.message } />)

    }

  }
  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Account Settings' breadCrumbParent='Pages' breadCrumbActive='Account Settings' />
      { value !== null ? (
        <Row>
          <Col className='mb-2 mb-md-0' md='3'>
            <Tabs activeTab={ activeTab } toggleTab={ toggleTab } />
          </Col>
          <Col md='9'>
            <Card>
              <CardBody>
                <TabContent activeTab={ activeTab }>
                  <TabPane tabId='1'>
                    <GeneralTabContent loading={ loading } setValue={ setValue } onSubmit={ onSubmit } value={ value } />
                  </TabPane>
                  <TabPane tabId='2'>
                    <PasswordTabContent handleSubmit={ handleSubmit } passwords={ passwords } setPasswords={ setPasswords } loading={ loading } />
                  </TabPane>
                  {/*  <TabPane tabId='3'>
                    <InfoTabContent data={data.info} />
                  </TabPane>
                  <TabPane tabId='4'>
                    <SocialTabContent data={data.social} />
                  </TabPane>
                  <TabPane tabId='5'>
                    <NotificationsTabContent data={data.notification} />
                  </TabPane> */}
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : null }
    </Fragment>
  )
}

export default AccountSettings
