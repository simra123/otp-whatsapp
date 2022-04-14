import { Fragment, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button, Media, Label, Row, Col, Input, FormGroup, Spinner, Form } from 'reactstrap'
import baseURL from '@src/middleware/BaseURL'

const GeneralTabs = ({ value, setValue, onSubmit, loading }) => {
  const handleSubmit = e => onSubmit(e)
  return (
    <Fragment>

      <Row>

        <Col sm='12'>
          <FormGroup>
            <Label for='name'>Name</Label>
            <Input type='text' id='login-email' placeholder='John' value={ value.name } autoFocus onChange={ (e) => setValue({ ...value, name: e.target.value }) } />
          </FormGroup>
        </Col>
        <Col sm='12'>
          <FormGroup>
            <Label for='email'>Email</Label>
            <Input type='email' id='login-email' placeholder='john@example.com' value={ value.email } autoFocus onChange={ (e) => setValue({ ...value, email: e.target.value }) } />

          </FormGroup>
        </Col>
        <Col className='mt-2' sm='12'>
          <Button.Ripple type='submit' className='mr-1' color='primary' onClick={ (e) => handleSubmit(e) }
          >
            Save changes
            { loading ? <Spinner color='light' size="sm" className="mx-1" /> : null }
          </Button.Ripple>

        </Col>
      </Row>
    </Fragment >
  )
}

export default GeneralTabs
