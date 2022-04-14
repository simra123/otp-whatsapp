import * as yup from 'yup'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, FormGroup, Row, Col, Button, Input, Spinner } from 'reactstrap'

const PasswordTabContent = ({ passwords, setPasswords, handleSubmit, loading }) => {

  return (
    <Form onSubmit={ (e) => handleSubmit(e) }>
      <Row>
        <Col sm='12'>
          <FormGroup>
            <Input type='password' placeholder='********' autoFocus />

          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm='6'>
          <FormGroup>
            <Input type='password' placeholder='********' value={ passwords.newPassword } autoFocus onChange={ (e) => setPasswords({ ...passwords, newPassword: e.target.value }) } />
          </FormGroup>
        </Col>
        <Col sm='6'>
          <FormGroup>
            <Input type='password' placeholder='********' value={ passwords.confirmPassword } autoFocus onChange={ (e) => setPasswords({ ...passwords, confirmPassword: e.target.value }) } />
          </FormGroup>
        </Col>
        <Col className='mt-1' sm='12'>
          <Button.Ripple type='submit' className='mr-1' color='primary'>
            Save changes
            { loading ? <Spinner color='light' size="sm" className="mx-1" /> : null }
          </Button.Ripple>

        </Col>
      </Row>
    </Form>
  )
}

export default PasswordTabContent