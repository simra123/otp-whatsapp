import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const PaginationTable = ({ setpage }) => {
    return (
        <div className='float-right'>
            <Pagination className='d-flex mt-3'>
                <PaginationItem active>
                    <PaginationLink href='#' onClick={ (e) => {
                        setpage(e.target.HTML)
                    } }>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href='#' onClick={ (e) => {
                        setpage(e.target.HTML)
                    } }>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href='#' onClick={ (e) => {
                        setpage(e.target.HTML)
                    } }>3</PaginationLink>
                </PaginationItem>
                <PaginationItem >
                    <PaginationLink href='#' onClick={ (e) => {
                        setpage(e.target.HTML)
                    } }>4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href='#'>onClick={ (e) => {
                        setpage(e.target.HTML)
                    } }5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href='#' onClick={ (e) => {
                        setpage(e.target.HTML)
                    } }>6</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href='#' onClick={ (e) => {
                        setpage(e.target.HTML)
                    } }>7</PaginationLink>
                </PaginationItem>
            </Pagination>
        </div>
    )
}
export default PaginationTable
