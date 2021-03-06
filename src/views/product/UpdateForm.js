import { useState, useEffect } from "react"
import Uppy from "@uppy/core"
import { useHistory, useParams } from 'react-router-dom'
import thumbnailGenerator from "@uppy/thumbnail-generator"
import { DragDrop } from "@uppy/react"
import { EditorState } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import "../../@core/scss/react/libs/editor/editor.scss"
import "../../@core/scss/react/libs/file-uploader/file-uploader.scss"
import "uppy/dist/uppy.css"
import Select from "react-select"
import { MultiSelect } from "react-multi-select-component"
import { MdOutlineProductionQuantityLimits } from "react-icons/md"
import { stateFromHTML } from 'draft-js-import-html'
import { AiOutlineNumber } from "react-icons/ai"
import { SuccessToast, ErrorToast } from '../components/toastify'
import { stateToHTML } from 'draft-js-export-html'
import { toast } from 'react-toastify'
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
} from "reactstrap"
import { FaDollarSign } from "react-icons/fa"
import Action from "../../middleware/API"
import baseURL from "../../middleware/BaseURL"
import { string } from "prop-types"

const ProductForm = (props) => {

    //  file Uploader
    const [imgs, setImgs] = useState([])
    //text editor
    const history = useHistory()
    const { id } = useParams()


    // multiple file uploader
    const [previewArr, setPreviewArr] = useState([])


    const uppy = new Uppy({
        meta: { type: 'avatar' },
        autoProceed: true
    })

    uppy.use(thumbnailGenerator)

    uppy.on('thumbnail:generated', (file, preview) => {
        setImgs([])
        const arr = previewArr
        arr.push(preview)
        setPreviewArr([...arr])
        const arrImg = imgs
        arrImg.push(file.data)
        setImgs([...arrImg])
    })

    const [category, setcategory] = useState([])
    const [colors, setcolors] = useState([])
    const [attribute, setattribute] = useState([])
    const [values, setvalues] = useState([])
    const [selectedColors, setSelectedColors] = useState([])
    const [selectedSizes, setSelectedSizes] = useState([])
    const [para, setPara] = useState(EditorState.createEmpty())
    const [loading, setLoading] = useState(false)

    const [body, setbody] = useState({
        name: "",
        minQuantity: null,
        category: "",
        price: null,
        quantity: null,
        SKU: ""
    })
    async function fetchcategorydata() {
        const response = await Action.get("/category", {})
        if (response.data.success === true) {
            response.data.data.map((item, index) => {
                response.data.data[index].value = item.text
                response.data.data[index].label = item.text
            })
            setcategory(response.data.data)
        } else {
            setcategory([])
        }
    }
    async function fetchSingleProduct() {
        const { data } = await Action.get(`/product?_id=${ id }`)
        const res = data.data[0]
        setImgs(res.image)

        setbody({
            name: res.name,
            minQuantity: res.minQuantity,
            category: res.vca,
            price: res.price,
            quantity: res.quantity,
            SKU: res.SKU
        })
        setPara(EditorState.createWithContent(stateFromHTML(res.comments)))
    }

    // const fetchcolor = async () => {
    //     const response = await Action.get("/color", {})

    //     if (response.data.success === true) {
    //         response.data.data.map((item, index) => {
    //             response.data.data[index].value = item.code
    //             response.data.data[index].label = item.color
    //         })

    //         setcolors(response.data.data)
    //     } else {
    //         setcolors([])
    //     }
    // }
    // const fetchattribute = async () => {
    //     const response = await Action.get("/attribute", {})

    //     if (response.data.success === true) {
    //         response.data.data.map((item, index) => {
    //             response.data.data[index].value = item.attribute
    //             response.data.data[index].label = item.attribute
    //         })
    //         setattribute(response.data.data)
    //     } else {
    //         setattribute([])
    //     }
    // }

    // const fetchvalues = async (id) => {
    //     const response = await Action.get(`/attribute/value?attribute=${ id }`, {})

    //     if (response.data.success === true) {
    //         response.data.data.map((item, index) => {
    //             response.data.data[index].value = item.value
    //             response.data.data[index].label = item.value
    //         })
    //         setvalues(response.data.data)
    //     } else {
    //         setvalues([])
    //     }
    // }
    useEffect(async () => {
        fetchcategorydata()
        //  fetchcolor()
        //   fetchattribute()
        fetchSingleProduct()

    }, [])

    const renderPreview = () => {
        if (previewArr.length) {
            return previewArr.map((src, index) => <img key={ index } className='rounded mt-2 mr-1' src={ src } alt='avatar' />)
        } else if (imgs) {
            return imgs.map((src, index) => <img key={ index } height={ 140 } width={ 'auto' } className='rounded mt-2 mr-1' src={ baseURL + src } alt='avatar' />)

        } else {
            return null
        }
    }
    const allSizes = []
    if (selectedSizes.length) {
        selectedSizes.map((val) => {
            allSizes.push(val.value)
        })

    }
    const paraToHtml = stateToHTML(para.getCurrentContent())
    const size = {}
    size[body.attribute] = allSizes
    const data = new FormData()

    //post function
    const submit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (selectedColors) {
            selectedColors.map((val) => {
                delete val.value
                delete val.label
                delete val._id
                delete val.createdAt
                delete val.updatedAt
            })
        }
        data.append('name', body.name)
        data.append('minQuantity', body.minQuantity)
        imgs.map((image) => {
            data.append('file', image)
        })
        data.append('price', body.price)
        data.append('quantity', body.quantity)
        data.append('SKU', body.SKU)
        data.append('comments', paraToHtml)
        const response = await Action.put(`/product/${ id }`, data)

        if (response.data.success) {
            toast.success(<SuccessToast title="Success" text="Product updated Successfully!" />)
            history.push('/product/list')
        } else {
            setLoading(false)
            toast.error(<ErrorToast title="error" text={ response.data.message } />)
        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Add New Product</CardTitle>
            </CardHeader>
            <CardBody>
                <Form>
                    <Row>
                        <Col sm="12" md="6">
                            {/*product form */ }
                            <Label for="pro-name">Product Name</Label>
                            <InputGroup className="input-group-merge" tag={ FormGroup }>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <MdOutlineProductionQuantityLimits size={ 15 } />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    type="text"
                                    value={ body.name }
                                    id="pro-name"
                                    placeholder="Enter your product Name"
                                    onChange={ (e) => {
                                        setbody({ ...body, name: e.target.value })
                                    } }
                                />
                            </InputGroup>
                        </Col>
                        <Col sm="12" md="6">
                            {/*product form */ }
                            <Label for="quantity">Minimum Purchase Quatity</Label>
                            <InputGroup className="input-group-merge" tag={ FormGroup }>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <AiOutlineNumber size={ 15 } />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    type="number"
                                    id="quantity"
                                    placeholder="Enter your quantity"
                                    onChange={ (e) => {
                                        setbody({ ...body, minQuantity: e.target.value })
                                    } }
                                    value={ body.minQuantity }
                                />
                            </InputGroup>
                        </Col>

                        <Col className="mb-1" md="6" sm="12">
                            <Label>Categories</Label>

                            <Select
                                className="react-select"
                                classNamePrefix="select"
                                defaultValue={ body.category }
                                onChange={ (e) => {
                                    setbody({ ...body, category: e.value })
                                } }
                                options={ category }
                                isClearable={ false }
                            />
                        </Col>
                    </Row>

                    {/* <h4 className="py-2">Product Images</h4>
               
                            <h6>Gallery Images (600x600)</h6>
                            <small className="pb-2">
                                These images are visible in product details page gallery. Use
                                600x600 sizes images.
                            </small>
                            <div className="mt-1">
                                <Card>
                                    <CardHeader>
                                        <CardTitle tag='h4'> Multiple Files Upload</CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <DragDrop uppy={ uppy } />
                                        { previewArr.length ? previewArr.map((src, index) => {
                                            return (<img key={ index } className='rounded mt-2 mr-1' src={ src } alt='avatar' />)
                                        }) : null }
                                        { imgs.length ? imgs.map((src, index) => {
                                            return (<img key={ index } className={ typeof src !== 'object' ? 'rounded mt-2 mr-1' : 'd-none' } height={ 140 } width={ 'auto' } src={ baseURL + src } alt='avatar' />)
                                        }) : null }
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>
                    </Row> */}

                    <Row>

                        <Col sm="12" md="6">
                            {/*att form */ }
                            <Label for="Unitprice">Unit price</Label>
                            <InputGroup className="input-group-merge" tag={ FormGroup }>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <FaDollarSign size={ 15 } />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    type="number"
                                    id="UnitPrice"
                                    placeholder="Unit Price"
                                    value={ body.price }
                                    onChange={ (e) => {
                                        setbody({ ...body, price: e.target.value })
                                    } }
                                />
                            </InputGroup>
                        </Col>
                        <Col sm="12" md="6">
                            {/*att form */ }
                            <Label for="quantity">Quatity</Label>
                            <InputGroup className="input-group-merge" tag={ FormGroup }>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <AiOutlineNumber size={ 15 } />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    type="number"
                                    id="quantity"
                                    value={ body.SKU }
                                    placeholder="Enter your quantity"
                                    onChange={ (e) => {
                                        setbody({ ...body, quantity: e.target.value })
                                    } }
                                />
                            </InputGroup>
                        </Col>
                        <Col sm="12" md="6">
                            {/*product form */ }
                            <Label for="sku">SKU</Label>
                            <InputGroup className="input-group-merge" tag={ FormGroup }>
                                <Input
                                    type="text"
                                    id="sku"
                                    placeholder="Enter your SKU"
                                    value={ body.SKU }
                                    onChange={ (e) => {
                                        setbody({ ...body, SKU: e.target.value })
                                    } }
                                />
                            </InputGroup>
                        </Col>
                        <Col sm="12" className="mt-2">
                            {/* text editor */ }
                            <h6>Product Description</h6>
                            <Editor editorState={ para } onEditorStateChange={ data => setPara(data) } />


                        </Col>

                        <Col sm="12" className="mt-4">
                            <FormGroup className="d-flex mb-0">
                                <Button.Ripple
                                    className="mr-1"
                                    color="primary"
                                    type="submit"
                                    onClick={ (e) => {
                                        submit(e)
                                    } }
                                >
                                    Submit
                                </Button.Ripple>
                                { loading ? <Spinner color='primary' /> : null }
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card >
    )
}
export default ProductForm