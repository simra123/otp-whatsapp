import { useState, useEffect } from 'react'
import Uppy from '@uppy/core'
import thumbnailGenerator from '@uppy/thumbnail-generator'
import { DragDrop } from '@uppy/react'
import { useHistory, useParams } from 'react-router-dom'
import Action from '../../middleware/API'
import '../../@core/scss/react/libs/editor/editor.scss'
import '../../@core/scss/react/libs/file-uploader/file-uploader.scss'
import 'uppy/dist/uppy.css'
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    FormGroup,
    Row,
    Col,
    Input,
    Form,
    Button,
    Label,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Spinner
} from 'reactstrap'
import { Mail, Lock } from 'react-feather'
import { BsGenderAmbiguous } from 'react-icons/bs'
import { FaPencilAlt, FaCity } from 'react-icons/fa'
import { AiOutlinePhone } from 'react-icons/ai'
import { HiOutlineLocationMarker } from 'react-icons/hi'
//import toast types from components
import { SuccessToast, ErrorToast } from '../components/toastify'
//import toasts from react
import { toast } from 'react-toastify'

const EmployeeForm = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    //  file Uploader
    const [img, setImg] = useState(null)
    const [preview, setPreview] = useState(null)
    const [Edetails, setEdetails] = useState({
        name: "",
        email: "",
        phone: null,
        gender: "",
        address: "",
        city: "",
        usertype: 2,
        password: ""
    })
    useEffect(() => {
        const getAllEmployee = async () => {
            const { data } = await Action.get(`/auth/employees?_id=${ id }`)
            const res = data.data
            setEdetails({
                name: res.name,
                email: res.email,
                phone: res.phone,
                gender: res.gender,
                address: res.address,
                city: res.city,
                usertype: 2,
                password: res.password
            })
        }
        getAllEmployee()
    }, [])
    console.log(id)
    const uppy = new Uppy({
        meta: { type: 'avatar' },
        restrictions: { maxNumberOfFiles: 1 },
        autoProceed: true
    })

    uppy.use(thumbnailGenerator)

    uppy.on('thumbnail:generated', (file, preview) => {
        setImg(file.data)
        setPreview(preview)
    })
    const eventOnChange = (e) => {
        const { name, value } = e.target
        setEdetails((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    //post new employee
    const updateEmployee = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await Action.put(`/auth/employees/${ id }`, Edetails, {})
        console.log(res)
        if (res.data.success) {
            setTimeout(() => {
                toast.success(<SuccessToast title="Success" text="settings updated Successfully!" />)
                history.push('/employee/list')
            }, 2000)
        } else {
            setLoading(false)
            toast.error(<ErrorToast title="error" text={ res.data.message } />)
        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Add New Employee</CardTitle>
            </CardHeader>
            <CardBody>
                <Form>
                    <Row>
                        <Col sm='12' md="6">
                            {/*employee form */ }
                            <Label for='name'> Name</Label>
                            <InputGroup className='input-group-merge' tag={ FormGroup }>
                                <InputGroupAddon addonType='prepend'>
                                    <InputGroupText>
                                        <FaPencilAlt size={ 15 } />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input type='text' id='name' name="name" value={ Edetails.name } onChange={ eventOnChange } placeholder='Enter your Name' />
                            </InputGroup>
                        </Col>
                        <Col sm='12' md="6">
                            {/*employee form */ }
                            <Label for='email'>Email</Label>
                            <InputGroup className='input-group-merge' tag={ FormGroup }>
                                <InputGroupAddon addonType='prepend'>
                                    <InputGroupText>
                                        <Mail size={ 15 } />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input type='email' id='email' name="email" value={ Edetails.email } onChange={ eventOnChange } placeholder='Enter your Email' />
                            </InputGroup>
                        </Col>
                        <Col sm='12' md="6">
                            {/*employee form */ }
                            <Label for='phone'>Phone Number</Label>
                            <InputGroup className='input-group-merge' tag={ FormGroup }>
                                <InputGroupAddon addonType='prepend'>
                                    <InputGroupText>
                                        <AiOutlinePhone size={ 15 } />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input type='number' id='phone' name="phone" value={ Edetails.phone } onChange={ eventOnChange } placeholder='Enter your phone number' />
                            </InputGroup>
                        </Col>
                        <Col sm='12' md="6">
                            {/*employee form */ }
                            <Label for='password'>Password</Label>
                            <InputGroup className='input-group-merge' tag={ FormGroup }>
                                <InputGroupAddon addonType='prepend'>
                                    <InputGroupText>
                                        <Lock size={ 15 } />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input type='password' id='password' name="password" value={ Edetails.password } onChange={ eventOnChange } placeholder='Enter your password' />
                            </InputGroup>
                        </Col>
                        <Col sm='12' md="6">
                            {/*employee form */ }
                            <Label for='confirm-pass'>Confirm Password</Label>
                            <InputGroup className='input-group-merge' tag={ FormGroup }>
                                <InputGroupAddon addonType='prepend'>
                                    <InputGroupText>
                                        <Lock size={ 15 } />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input type='text' id='confirm-pass' name="password" value={ Edetails.password } onChange={ eventOnChange } placeholder='Enter your confirm password' />
                            </InputGroup>
                        </Col>
                        <Col sm='12' md="6">
                            {/*employee form */ }
                            <Label for='gender'>Gender</Label>
                            <InputGroup className='input-group-merge' tag={ FormGroup }>
                                <InputGroupAddon addonType='prepend'>
                                    <InputGroupText>
                                        <BsGenderAmbiguous size={ 15 } />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input type='text' id='gender' name="gender" value={ Edetails.gender } onChange={ eventOnChange } placeholder='Enter your gender' />
                            </InputGroup>
                        </Col>
                        <Col sm='12' md="6">
                            {/*employee form */ }
                            <Label for='address'>Address (location or manually)</Label>
                            <InputGroup className='input-group-merge' tag={ FormGroup }>
                                <InputGroupAddon addonType='prepend'>
                                    <InputGroupText>
                                        <HiOutlineLocationMarker size={ 15 } />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input type='text' id='address' name="address" value={ Edetails.address } onChange={ eventOnChange } placeholder='Enter your address' />
                            </InputGroup>
                        </Col>
                        <Col sm='12' md="6">
                            {/*employee form */ }
                            <Label for='city'>City</Label>
                            <InputGroup className='input-group-merge' tag={ FormGroup }>
                                <InputGroupAddon addonType='prepend'>
                                    <InputGroupText>
                                        <FaCity size={ 15 } />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input type='text' id='city' name="city" value={ Edetails.city } onChange={ eventOnChange } placeholder='Enter your City' />
                            </InputGroup>
                        </Col>
                        <Col sm='12'>
                            {/*employee textarea */ }
                            <Label>Short Bio</Label>

                            <Input type='textarea' name='text' id='exampleText' rows='3' placeholder='Enter your Biography' />

                        </Col>
                        <Col sm='12' className="mt-2">
                            {/* basic image upload */ }

                            <h6> Employee Image </h6>
                            <DragDrop uppy={ uppy } />
                            { img !== null ? <img className='rounded mt-2' src={ img } alt='avatar' /> : null }
                        </Col>


                        <Col sm='12' className="mt-4">
                            <FormGroup className='d-flex mb-0'>
                                <Button.Ripple className='mr-1' color='primary' type='submit' onClick={ e => updateEmployee(e) }>
                                    Submit

                                </Button.Ripple>
                                { loading ? <Spinner color='primary' /> : null }
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    )
}
export default EmployeeForm
