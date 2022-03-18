import { useState, useEffect } from "react"
import Uppy from "@uppy/core"
import { useHistory } from 'react-router-dom'
import thumbnailGenerator from "@uppy/thumbnail-generator"
import { DragDrop } from "@uppy/react"
import { EditorState } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import "../../@core/scss/react/libs/editor/editor.scss"
import "../../@core/scss/react/libs/file-uploader/file-uploader.scss"
import "uppy/dist/uppy.css"
import { selectThemeColors } from "@utils"
import Select from "react-select"
import { MdOutlineProductionQuantityLimits } from "react-icons/md"
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

// {
//   name: "gel hydroalcoolique pour les mains",
//   color: [
//       {
//           name: "Bleue",
//           code: "cyan"
//       }
//   ],
//   size: [
//       {
//           "length": [
//               "medium",
//               "Long"
//           ]
//       }
//   ],
//   image: [imgs],
//   price: 105,
//   description: "Dans l'édition et la conception graphique, Lorem ipsum est un texte d'espace réservé couramment utilisé pour démontrer la forme visuelle d'un document ou d'une police de caractères sans s'appuyer sur un contenu significatif. Lorem ipsum peut être utilisé comme espace réservé avant que la copie finale ne soit disponible.",
//   quantity: 10,
//   SKU: "32423423",
// },


const ProductForm = (props) => {

  //  file Uploader
  const [imgs, setImgs] = useState([])
  //text editor
  const [value, setValue] = useState(EditorState.createEmpty())
  const history = useHistory()


  // multiple file uploader
  const [previewArr, setPreviewArr] = useState([])


  const uppy = new Uppy({
    meta: { type: 'avatar' },
    autoProceed: true
  })

  uppy.use(thumbnailGenerator)

  uppy.on('thumbnail:generated', (file, preview) => {
    const arr = previewArr
    arr.push(preview)
    setPreviewArr([...arr])
    const arrImg = imgs
    arrImg.push(file.data)
    setImgs([...arrImg])
  })
  console.log(imgs)

  const renderPreview = () => {
    if (previewArr.length) {
      return previewArr.map((src, index) => <img key={ index } className='rounded mt-2 mr-1' src={ src } alt='avatar' />)
    } else {
      return null
    }
  }

  const [category, setcategory] = useState([])
  const [colors, setcolors] = useState(
    [
      {
        name: 'Bleue',
        code: 'cyan'
      },
      {
        name: 'Bleddue',
        code: 'cyan'
      },
      {
        name: 'Bldqweue',
        code: 'cyan'
      }
    ]
  )
  const [attribute, setattribute] = useState([])
  const [values, setvalues] = useState([])
  const [para, setPara] = useState(EditorState.createEmpty())

  const [body, setbody] = useState({
    name: "",
    minQuantity: 0,
    category: "",
    colors: [],
    price: 0,
    quantity: 0,
    SKU: "",
    attribute: "",
    value: ""
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

  // const fetchcolor = async () => {
  //   const response = await Action.get("/color", {})

  //   if (response.data.success === true) {
  //     response.data.data.map((item, index) => {
  //       response.data.data[index].value = item.color
  //       response.data.data[index].label = item.color
  //     })

  //     setcolors(response.data.data)
  //   } else {
  //     setcolors([])
  //   }
  // }
  const fetchattribute = async () => {
    const response = await Action.get("/attribute", {})

    if (response.data.success === true) {
      response.data.data.map((item, index) => {
        response.data.data[index].value = item.attribute
        response.data.data[index].label = item.attribute
      })
      setattribute(response.data.data)
    } else {
      setattribute([])
    }
  }
  const fetchvalues = async (id) => {
    const response = await Action.get(`/attribute/value?id=${ id }`, {})

    if (response.data.success === true) {
      response.data.data.map((item, index) => {
        response.data.data[index].value = item.value
        response.data.data[index].label = item.value
      })
      setvalues(response.data.data)
    } else {
      setvalues([])
    }
  }
  useEffect(async () => {
    console.log(props.location)
    if (props.location) {

      // const v = props.location.state.value
      // setbody(...body, { name: v.name })
      // setbody(...body, { minQuantity: v?.quantity })
      // setbody(...body, { category: v.category })
      // setbody(...body, { colors: v.color })
      // setbody(...body, { price: v.price })
      // setbody(...body, { quantity: v.quantity })
      // setbody(...body, { SKU: v.SKU })
      // setbody(...body, { attribute: Object.keys(v.size) })
      // setbody(...body, { value: Object.values(v.size) })
      // console.log(body)
    }
    fetchcategorydata()
    // fetchcolor()
    fetchattribute()

  }, [])
  const data = new FormData()
  // data.append('name', 'body.name')
  // data.append('quantity', 'body.minQuantity')
  // imgs.map((file, index) => {
  //   data.append('file', 'keucpoweufweofioweio')

  // })
  // data.append('category', 'body.category')
  // colors.map((color, index) => {
  //   data.append('color', color)
  //   console.log(color)
  // })
  // data.append('price', 'body.price')
  // data.append('description', 'body.quantity')
  // data.append('SKU', 'body.SKU')
  // data.append('size', {
  //   length: ["moyenne"]
  // })
  data.append('name', 'body.name')
  //data.append('file', '[]')
  //data.append('file', imgs[0])
  data.append('category', 'body.category')
  data.append('color', '[{"name":"Blue","code":"#FFFFFF"}]')
  data.append('price', ' body.price')
  data.append('quantity', ' body.quantity')
  data.append('SKU', 'body.SKU')
  data.append('description', 'paraToHtml')
  data.append('size', '[{"length":["medium","medium"]},{"length":"medium"}]')
  console.log(imgs[0])
  const paraToHtml = stateToHTML(para.getCurrentContent())
  const submit = async () => {

    const response = await Action.post(`/product`, data, {})
    console.log(response)
    if (response.data.success === true) {
      toast.success(
        <SuccessToast title="Success" text="Category added Successfully!" />
      )

      history.push("/product/form")
    } else {
      toast.error(
        <ErrorToast
          title="error"
          text="Something went wrong, try again later"
        />
      )
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
                theme={ selectThemeColors }
                className="react-select"
                classNamePrefix="select"
                defaultValue={ category[0] }
                onChange={ (e) => {
                  setbody({ ...body, category: e._id })
                } }
                options={ category }
                isClearable={ false }
              />
            </Col>
          </Row>

          <h4 className="py-2">Product Images</h4>

          <Row className="mb-2">
            {/* <Col sm="12">

            <h6>Thumbnail Image (300x300)</h6>
            <small>
              This image is visible in all product box. Use 300x300 sizes
              image. Keep some blank space around main object of your image as
              we had to crop some edge in different devices to make it
              responsive.
            </small>
            <div className="mt-2">
              <DragDrop uppy={ uppy } />
              { img !== null ? (
                <img
                  className="rounded mt-2"
                  // src={body.image ? (baseURL + body.image) : img}
                  src={ img }
                  alt="avatar"
                  height="100"
                  width="100"
                />
              ) : null }
            </div>
          </Col> */}
            <Col sm="12" className="mt-1">
              {/* basic image upload */ }

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
                    { renderPreview() }
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
          <h4 className="py-2">Product letiants</h4>
          <Row>
            <Col className="mb-1" md="12" sm="12">
              <Label>Colors</Label>
              <Select
                theme={ selectThemeColors }
                className="react-select"
                classNamePrefix="select"
                defaultValue={ colors[0] }
                options={ colors }
                onChange={ (e) => {
                  setbody({ ...body, color: e._id })
                } }
                isClearable={ false }
              />
            </Col>
          </Row>
          <h4 className="py-2">Attributes</h4>
          <Row>
            <Col className="mb-1" md="6" sm="12">
              <Label>Attribute Name</Label>
              <Select
                theme={ selectThemeColors }
                className="react-select"
                classNamePrefix="select"
                defaultValue={ attribute[0] }
                options={ attribute }
                onChange={ (e) => {
                  setbody({ ...body, attribute: e.attribute })
                  fetchvalues(e._id)
                } }
                isClearable={ false }
              />
            </Col>
            <Col className="mb-1" md="6" sm="12">
              <Label>Attribute Value</Label>
              <Select
                theme={ selectThemeColors }
                className="react-select"
                classNamePrefix="select"
                defaultValue={ values[0] }
                options={ values }
                onChange={ (e) => {
                  setbody({ ...body, value: e.value })
                } }
                isClearable={ false }
              />
            </Col>
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
                    e.preventDefault()
                    submit()
                  } }
                >
                  Submit
                  {/* spinner */ }
                  {/* <Spinner color='light' /> */ }
                </Button.Ripple>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card >
  )
}
export default ProductForm
