import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const PaginationBasic = ({ dataPerPage, Paginate, totalPages, currentPage }) => {
  const pageNumber = []
  for (let i = 1; i <= Math.ceil(totalPages / dataPerPage); i++) {
    pageNumber.push(i)
  }
  console.log(pageNumber)
  return (
    <Pagination className='d-flex mt-3 mr-2 justify-content-end'>
      { pageNumber.length ? pageNumber.map((number, index) => {
        return (
          <PaginationItem onClick={ () => Paginate(number) } className={ currentPage === number ? "active" : "" } >
            <PaginationLink href='#' key={ index }>{ number }</PaginationLink>
          </PaginationItem>
        )
      }) : null }
    </Pagination>
  )
}
export default PaginationBasic
