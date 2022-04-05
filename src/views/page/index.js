import { useState } from 'react'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import '../../@core/scss/react/libs/editor/editor.scss'
import { MoreVertical, Edit, Trash, User } from 'react-feather'
import { Link } from 'react-router-dom'


import { Card, CardTitle, CardBody, Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

const pages = [
  {
    id: 1,
    title: 'About us',
    url: 'about-page'
  },
  {
    id: 2,
    title: 'Terms And Conditions',
    url: 'condition'
  },
  {
    id: 3,
    title: 'Privact Policy',
    url: 'privacy'
  }

]
const Pages = () => {
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>All Pages </CardTitle>

          <Table responsive>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Page Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                pages.map((value, index) => {
                  return (
                    <tr key={ index }>
                      <td>
                        { index + 1 }
                      </td>

                      <td> { value.title } </td>
                      <td>
                        <UncontrolledDropdown>
                          <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                            <MoreVertical size={ 15 } />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <Link to={ `edit-page/${ value.url }` }>
                              <DropdownItem href='/' >

                                <Edit className='mr-50' size={ 15 } />  <span className='align-middle'>Edit</span>

                              </DropdownItem>
                            </Link>

                          </DropdownMenu>
                        </UncontrolledDropdown>

                      </td>
                    </tr>
                  )
                })
              }


            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  )
}
export default Pages
