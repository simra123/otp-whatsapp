import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const AppRoutes = [
  // {
  //   path: '/apps/email',
  //   exact: true,
  //   appLayout: true,
  //   className: 'email-application',
  //   component: lazy(() => import('../../views/apps/email'))
  // },
  // {
  //   path: '/apps/email/:folder',
  //   exact: true,
  //   appLayout: true,
  //   className: 'email-application',
  //   component: lazy(() => import('../../views/apps/email')),
  //   meta: {
  //     navLink: '/apps/email'
  //   }
  // },
  // {
  //   path: '/apps/email/label/:label',
  //   exact: true,
  //   appLayout: true,
  //   className: 'email-application',
  //   component: lazy(() => import('../../views/apps/email')),
  //   meta: {
  //     navLink: '/apps/email'
  //   }
  // },
  // {
  //   path: '/apps/email/:filter',
  //   component: lazy(() => import('../../views/apps/email')),
  //   meta: {
  //     navLink: '/apps/email'
  //   }
  // },
  {
    path: '/apps/chat',
    appLayout: true,
    className: 'chat-application',
    component: lazy(() => import('../../views/apps/chat/'))
  },
  // {
  //   path: '/apps/todo',
  //   exact: true,
  //   appLayout: true,
  //   className: 'todo-application',
  //   component: lazy(() => import('../../views/apps/todo'))
  // },
  // {
  //   path: '/apps/todo/:filter',
  //   appLayout: true,
  //   exact: true,
  //   className: 'todo-application',
  //   component: lazy(() => import('../../views/apps/todo')),
  //   meta: {
  //     navLink: '/apps/todo'
  //   }
  // },
  // {
  //   path: '/apps/todo/tag/:tag',
  //   appLayout: true,
  //   className: 'todo-application',
  //   component: lazy(() => import('../../views/apps/todo')),
  //   meta: {
  //     navLink: '/apps/todo'
  //   }
  // },
  // {
  //   path: '/apps/calendar',
  //   component: lazy(() => import('../../views/apps/calendar'))
  // },
  // {
  //   path: '/apps/invoice/list',
  //   component: lazy(() => import('../../views/apps/invoice/list'))
  // },
  // {
  //   path: '/apps/invoice/preview/:id',
  //   component: lazy(() => import('../../views/apps/invoice/preview')),
  //   meta: {
  //     navLink: '/apps/invoice/preview'
  //   }
  // },
  // {
  //   path: '/apps/invoice/preview',
  //   exact: true,
  //   component: () => <Redirect to='/apps/invoice/preview/4987' />
  // },
  // {
  //   path: '/apps/invoice/edit/:id',
  //   component: lazy(() => import('../../views/apps/invoice/edit')),
  //   meta: {
  //     navLink: '/apps/invoice/edit'
  //   }
  // },
  // {
  //   path: '/apps/invoice/edit',
  //   exact: true,
  //   component: () => <Redirect to='/apps/invoice/edit/4987' />
  // },
  // {
  //   path: '/apps/invoice/add',
  //   component: lazy(() => import('../../views/apps/invoice/add'))
  // },
  // {
  //   path: '/apps/invoice/print',
  //   layout: 'BlankLayout',
  //   component: lazy(() => import('../../views/apps/invoice/print'))
  // },
  // {
  //   path: '/apps/ecommerce/shop',
  //   className: 'ecommerce-application',
  //   component: lazy(() => import('../../views/apps/ecommerce/shop'))
  // },
  // {
  //   path: '/apps/ecommerce/wishlist',
  //   className: 'ecommerce-application',
  //   component: lazy(() => import('../../views/apps/ecommerce/wishlist'))
  // },
  // {
  //   path: '/apps/ecommerce/product-detail',
  //   exact: true,
  //   className: 'ecommerce-application',
  //   component: () => <Redirect to='/apps/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26' />
  // },
  // {
  //   path: '/apps/ecommerce/product-detail/:product',
  //   exact: true,
  //   className: 'ecommerce-application',
  //   component: lazy(() => import('../../views/apps/ecommerce/detail')),
  //   meta: {
  //     navLink: '/apps/ecommerce/product-detail'
  //   }
  // },
  // {
  //   path: '/apps/ecommerce/checkout',
  //   className: 'ecommerce-application',
  //   component: lazy(() => import('../../views/apps/ecommerce/checkout'))
  // },
  // {
  //   path: '/apps/user/list',
  //   component: lazy(() => import('../../views/apps/user/list'))
  // },
  // {
  //   path: '/apps/user/edit',
  //   exact: true,
  //   component: () => <Redirect to='/apps/user/edit/1' />
  // },
  // {
  //   path: '/apps/user/edit/:id',
  //   component: lazy(() => import('../../views/apps/user/edit')),
  //   meta: {
  //     navLink: '/apps/user/edit'
  //   }
  // },
  // {
  //   path: '/apps/user/view',
  //   exact: true,
  //   component: () => <Redirect to='/apps/user/view/1' />
  // },
  // {
  //   path: '/apps/user/view/:id',
  //   component: lazy(() => import('../../views/apps/user/view')),
  //   meta: {
  //     navLink: '/apps/user/view'
  //   }
  // },
  {
    path: '/services/list',
    component: lazy(() => import('../../views/services/List')),
    meta: {
      navLink: '/services/list'
    }
  },
  {
    path: '/services/form',
    component: lazy(() => import('../../views/services/Form')),
    meta: {
      navLink: '/services/form'
    }
  },
  {
    path: '/services/edit/:id',
    component: lazy(() => import('../../views/services/UpdateForm')),
    meta: {
      navLink: '/services/edit'
    }
  },
  {
    path: '/services/reviews',
    component: lazy(() => import('../../views/services/Reviews')),
    meta: {
      navLink: '/services/reviews'
    }
  },
  {
    path: '/customer/list',
    component: lazy(() => import('../../views/customer/List')),
    meta: {
      navLink: '/customer/list'
    }
  },
  {
    path: '/customer/form',
    component: lazy(() => import('../../views/customer/Form')),
    meta: {
      navLink: '/customer/form'
    }
  },
  {
    path: '/employee/list',
    component: lazy(() => import('../../views/employee/List')),
    meta: {
      navLink: '/employee/list'
    }
  },
  {
    path: '/employee/form',
    component: lazy(() => import('../../views/employee/Form')),
    meta: {
      navLink: '/employee/form'
    }
  },
  {
    path: '/employee/edit/:id',
    component: lazy(() => import('../../views/employee/updateFrom')),
    meta: {
      navLink: '/employee/edit/:id'
    }
  },
  {
    path: '/employee/reviews',
    component: lazy(() => import('../../views/employee/Reviews')),
    meta: {
      navLink: '/employee/reviews'
    }
  },
  {
    path: '/category/list',
    component: lazy(() => import('../../views/category/List')),
    meta: {
      navLink: '/category/list'
    }
  },
  {
    path: '/category/form/add',
    component: lazy(() => import('../../views/category/Form')),
    meta: {
      navLink: '/category/form/add'
    }
  },
  {
    path: '/category/form/edit',
    component: lazy(() => import('../../views/category/updateForm')),
    meta: {
      navLink: '/category/form/edit'
    }
  },
  {
    path: '/product/list',
    component: lazy(() => import('../../views/product/List')),
    meta: {
      navLink: '/product/list'
    }
  },
  {
    path: '/product/form',
    component: lazy(() => import('../../views/product/Form')),
    meta: {
      navLink: '/product/form'
    }
  },
  {
    path: '/pagination',
    component: lazy(() => import('../../views/components/pagination')),
    meta: {
      navLink: '/pagination'
    }
  },
  {
    path: '/product/edit/:id',
    component: lazy(() => import('../../views/product/UpdateForm')),
    meta: {
      navLink: '/product/form'
    }
  },
  {
    path: '/attribute/name',
    component: lazy(() => import('../../views/attribute/Name')),
    meta: {
      navLink: '/attribute/name'
    }
  },
  {
    path: '/product/colors',
    component: lazy(() => import('../../views/product/Colors')),
    meta: {
      navLink: '/product/colors'
    }
  },
  {
    path: '/attribute/value',
    component: lazy(() => import('../../views/attribute/Value')),
    meta: {
      navLink: '/attribute/value'
    }
  },
  {
    path: '/banners/desktop',
    component: lazy(() => import('../../views/banners/Desktop')),
    meta: {
      navLink: '/banners/desktop'
    }
  },
  {
    path: '/banners/mobile',
    component: lazy(() => import('../../views/banners/Mobile')),
    meta: {
      navLink: '/banners/mobile'
    }
  },
  {
    path: '/page-setting',
    component: lazy(() => import('../../views/page')),
    meta: {
      navLink: '/page-setting'
    }
  },
  {
    path: '/edit-page/:url',
    component: lazy(() => import('../../views/page/Edit')),
    meta: {
      navLink: '/edit-page'
    }
  },
  {
    path: '/frontend/header',
    component: lazy(() => import('../../views/front-end/header')),
    meta: {
      navLink: '/frontend/header'
    }
  },
  {
    path: '/frontend/about',
    component: lazy(() => import('../../views/front-end/about/')),
    exact: true,
    meta: {
      navLink: '/frontend/about'
    }
  },
  {
    path: '/frontend/about/form',
    component: lazy(() => import('../../views/front-end/about/Form')),
    exact: true,
    meta: {
      navLink: '/frontend/about/form'
    }
  },
  {
    path: '/faq/list',
    component: lazy(() => import('../../views/faq/List')),
    exact: true,
    meta: {
      navLink: '/faq/list'
    }
  },
  {
    path: '/faq/form',
    component: lazy(() => import('../../views/faq/Form')),
    exact: true,
    meta: {
      navLink: '/faq/form'
    }
  },
  {
    path: '/faq/edit/:id',
    component: lazy(() => import('../../views/faq/UpdateForm')),
    exact: true,
    meta: {
      navLink: '/faq/edit/:id'
    }
  },
  {
    path: '/frontend/work',
    component: lazy(() => import('../../views/front-end/how-it-works')),
    exact: true,
    meta: {
      navLink: '/frontend/work'
    }
  },
  {
    path: '/frontend/work/edit',
    component: lazy(() => import('../../views/front-end/how-it-works/Form')),
    exact: true,
    meta: {
      navLink: '/frontend/work/edit'
    }
  },
  {
    path: '/frontend/app/customer',
    component: lazy(() => import('../../views/front-end/application/for-customer')),
    exact: true,
    meta: {
      navLink: '/frontend/app/customer'
    }
  },
  {
    path: '/frontend/app/customer/form',
    component: lazy(() => import('../../views/front-end/application/for-customer/Form')),
    exact: true,
    meta: {
      navLink: '/frontend/app/customer/form'
    }
  },
  {
    path: '/frontend/app/employee',
    component: lazy(() => import('../../views/front-end/application/for-employee')),
    exact: true,
    meta: {
      navLink: '/frontend/app/employee'
    }
  },
  {
    path: '/frontend/app/employee/form',
    component: lazy(() => import('../../views/front-end/application/for-employee/Form')),
    exact: true,
    meta: {
      navLink: '/frontend/app/employee/form'
    }
  },
  {
    path: '/marketing/banner',
    component: lazy(() => import('../../views/marketing-banner')),
    exact: true,
    meta: {
      navLink: '/marketing/banner'
    }
  },
  {
    path: '/mobile-app/splash',
    component: lazy(() => import('../../views/mobile-app/Splash')),
    exact: true,
    meta: {
      navLink: '/mobile-app/splash'
    }
  },
  {
    path: '/mobile-app/banners',
    component: lazy(() => import('../../views/mobile-app/Banners')),
    exact: true,
    meta: {
      navLink: '/mobile-app/banners'
    }
  },
  {
    path: '/bookings',
    component: lazy(() => import('../../views/bookings')),
    exact: true,
    meta: {
      navLink: '/bookings'
    }
  },
  {
    path: '/bookings/map',
    component: lazy(() => import('../../views/bookings/traking-map/Map')),
    exact: true,
    meta: {
      navLink: '/bookings/maps'
    }
  },
  {
    path: '/bookings/preview/:id',
    component: lazy(() => import('../../views/bookings/preview')),
    exact: true,
    meta: {
      navLink: '/bookings/preview'
    }
  },
  {
    path: '/orders',
    component: lazy(() => import('../../views/orders')),
    exact: true,
    meta: {
      navLink: '/orders'
    }
  },
  {
    path: '/orders/preview/:id',
    component: lazy(() => import('../../views/orders/preview')),
    exact: true,
    meta: {
      navLink: '/orders/preview'
    }
  },
  {
    path: '/settings/general',
    component: lazy(() => import('../../views/settings/General')),
    exact: true,
    meta: {
      navLink: '/settings/general'
    }
  },
  {
    path: '/settings/smtp',
    component: lazy(() => import('../../views/settings/Smtp')),
    exact: true,
    meta: {
      navLink: '/settings/smtp'
    }
  },
  {
    path: '/account-settings',
    component: lazy(() => import('../../views/pages/account-settings'))
  }
]

export default AppRoutes
