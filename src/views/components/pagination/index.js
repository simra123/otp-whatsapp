import { Fragment, useEffect } from 'react'
import Prism from 'prismjs'
import { Row, Col, CardText } from 'reactstrap'
import BreadCrumbs from '@components/breadcrumbs'
import PaginationBasic from './PaginationBasic'
import PaginationSeparated from './PaginationSeparated'
import PaginationIconText from './PaginationIconsAndText'
import PaginationIcon from './PaginationIcons'
import PaginationSuccess from './PaginationSuccess'
import PaginationDanger from './PaginationDanger'
import PaginationInfo from './PaginationInfo'
import PaginationWarning from './PaginationWarning'
import PaginationPositions from './PaginationPositions'
import PaginationSizes from './PaginationSizes'
import {
  paginationBasic,
  paginationSeparated,
  paginationIconsAndText,
  paginationIcons,
  paginationDanger,
  paginationInfo,
  paginationSuccess,
  paginationWarning,
  paginationPositions,
  paginationSizes
} from './PaginationSourceCode'

const Pagination = () => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <Fragment>
      <BreadCrumbs breadCrumbTitle='Pagination' breadCrumbParent='Components' breadCrumbActive='Pagination' />
      <Row className='match-height'>
        <Col md='6' sm='12'>
          <CardText>A basic pagination with active item.</CardText>
          <PaginationBasic />
        </Col>
        <Col md='6' sm='12'>
          <CardText>
            To create separated pagination use <code>.prev-item</code> class for the first item and{ ' ' }
            <code>.next-item</code> for the last item.
          </CardText>
          <PaginationSeparated />
        </Col>
        <Col md='6' sm='12'>
          <CardText>Pagination with icon and text.</CardText>
          <PaginationIconText />
        </Col>
        <Col md='6' sm='12'>
          <CardText>Pagination with only icons.</CardText>
          <PaginationIcon />
        </Col>
        <Col md='6' sm='12'>
          <CardText>
            Use class <code>.pagination-success</code> with
            <code>pagination</code> tag.
          </CardText>
          <PaginationSuccess />
        </Col>
        <Col md='6' sm='12'>
          <CardText>
            Use class <code>.pagination-danger</code> with
            <code>pagination</code> tag.
          </CardText>
          <PaginationDanger />
        </Col>
        <Col md='6' sm='12'>
          <CardText>
            Use class <code>.pagination-info</code> with
            <code>pagination</code> tag.
          </CardText>
          <PaginationInfo />
        </Col>
        <Col md='6' sm='12'>
          <CardText>
            Use class <code>.pagination-warning</code> with
            <code>pagination</code> tag.
          </CardText>
          <PaginationWarning />
        </Col>
      </Row>
      <Row>
        <Col sm='12'>
          <CardText>
            Use classes <code>.justify-content-[direction]</code> with
            <code>pagination</code> tag.
          </CardText>
          <PaginationPositions />
        </Col>
        <Col sm='12'>
          <CardText>
            Use prop <code>size="lg"</code> for large size pagination & use
            <code>size="sm"</code>
            for small size pagination.
          </CardText>
          <PaginationSizes />
        </Col>
      </Row>
    </Fragment>
  )
}
export default Pagination
