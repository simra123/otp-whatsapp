import { Mail, MessageSquare, Octagon, BookOpen, Archive, Award, CheckSquare, Calendar, FileText, Circle, Codesandbox, Smartphone, Settings, User } from 'react-feather'
import { BiCategory, BiBadgeCheck } from 'react-icons/bi'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { CgAttribution, CgWebsite } from 'react-icons/cg'
import { FaQuestionCircle } from 'react-icons/fa'
import { GiVerticalBanner } from 'react-icons/gi'

export default [
  {
    header: 'General'
  },
  // {
  //   id: 'email',
  //   title: 'Email',
  //   icon: <Mail size={20} />,
  //   navLink: '/apps/email'
  // },
  //
  // {
  //   id: 'todo',
  //   title: 'Todo',
  //   icon: <CheckSquare size={20} />,
  //   navLink: '/apps/todo'
  // },
  // {
  //   id: 'calendar',
  //   title: 'Calendar',
  //   icon: <Calendar size={20} />,
  //   navLink: '/apps/calendar'
  // },
  {
    id: 'services',
    title: 'Services',
    icon: <Award size={ 20 } />,
    children: [
      {
        id: 'add-new',
        title: 'Add new Service',
        icon: <Circle size={ 12 } />,
        navLink: '/services/form'
      },
      {
        id: 'all-list',
        title: 'All Services',
        icon: <Circle size={ 12 } />,
        navLink: '/services/list'
      },
      {
        id: 'reviews',
        title: 'Service Reviews',
        icon: <Circle size={ 12 } />,
        navLink: '/services/reviews'
      }

    ]
  },
  // {
  //   id: 'eCommerce',
  //   title: 'eCommerce',
  //   icon: <ShoppingCart size={20} />,
  //   children: [
  //     {
  //       id: 'shop',
  //       title: 'Shop',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/shop'
  //     },
  //     {
  //       id: 'detail',
  //       title: 'Details',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/product-detail'
  //     },
  //     {
  //       id: 'wishList',
  //       title: 'Wish List',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/wishlist'
  //     },
  //     {
  //       id: 'checkout',
  //       title: 'Checkout',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/ecommerce/checkout'
  //     }
  //   ]
  // },
  {
    id: 'Customers',
    title: 'Customers',
    icon: <User size={ 20 } />,
    children: [

      {
        id: 'list-customer',
        title: 'Customer List',
        icon: <Circle size={ 12 } />,
        navLink: '/customer/list'
      }
      // {
      //   id: 'edit',
      //   title: 'Edit',
      //   icon: <Circle size={12} />,
      //   navLink: '/apps/user/edit'
      // }
    ]
  },
  {
    id: 'Employee',
    title: 'Employee',
    icon: <User size={ 20 } />,
    children: [
      {
        id: 'view-employee',
        title: 'Add new Employee',
        icon: <Circle size={ 12 } />,
        navLink: '/employee/form'
      },
      {
        id: 'list-employee',
        title: 'Employee List',
        icon: <Circle size={ 12 } />,
        navLink: '/employee/list'
      },
      {
        id: 'reviews-employee',
        title: 'Employee Reviews',
        icon: <Circle size={ 12 } />,
        navLink: '/employee/reviews'
      }
      // {
      //   id: 'edit',
      //   title: 'Edit',
      //   icon: <Circle size={12} />,
      //   navLink: '/apps/user/edit'
      // }
    ]
  },
  {
    id: 'category',
    title: 'Category',
    icon: <BiCategory size={ 20 } />,
    children: [
      {
        id: 'view-category',
        title: 'Add new Category',
        icon: <Circle size={ 12 } />,
        navLink: '/category/form/add'
      },
      {
        id: 'list-category',
        title: 'Category List',
        icon: <Circle size={ 12 } />,
        navLink: '/category/list'
      }
    ]
  },
  {
    id: 'product',
    title: 'Product Form',
    icon: <MdOutlineProductionQuantityLimits size={ 20 } />,
    children: [
      {
        id: 'view-product',
        title: 'Add new product',
        icon: <Circle size={ 12 } />,
        navLink: '/product/form'
      },
      {
        id: 'list-product',
        title: 'product List',
        icon: <Circle size={ 12 } />,
        navLink: '/product/list'
      },
      {
        id: 'colors',
        title: 'Colors',
        icon: <Circle size={ 12 } />,
        navLink: '/product/colors'
      },
      {
        id: 'attribute',
        title: 'Attribute',
        icon: <CgAttribution size={ 20 } />,
        children: [
          {
            id: 'name-attribute',
            title: 'Attribute Name',
            icon: <Circle size={ 12 } />,
            navLink: '/attribute/name'
          },
          {
            id: 'value-attribute',
            title: 'Attribute Value',
            icon: <Circle size={ 12 } />,
            navLink: '/attribute/value'
          }

        ]
      }
    ]
  },
  {
    id: 'pages',
    title: 'Pages',
    icon: <FileText size={ 20 } />,
    navLink: '/page-setting'
  },
  {
    id: 'front-end',
    title: 'Front End',
    icon: <Codesandbox size={ 20 } />,
    children: [
      {
        id: 'header',
        icon: <Circle size={ 12 } />,
        title: 'Top Header',
        navLink: '/frontend/header'
      },
      {
        id: 'about',
        icon: <Circle size={ 12 } />,
        title: 'About Us',
        navLink: '/frontend/about'
      },
      {
        id: 'works',
        icon: <Circle size={ 12 } />,
        title: 'How it Works',
        permissions: ['admin', 'editor'],
        navLink: '/frontend/work'
      },
      {
        id: 'application',
        title: 'Mobile Applications',
        icon: <Smartphone size={ 28 } />,
        children: [
          {
            id: 'customer',
            title: 'For Customer',
            icon: <Circle size={ 12 } />,
            navLink: '/frontend/app/customer'

          },
          {
            id: 'employee',
            title: 'For Employees',
            icon: <Circle size={ 12 } />,
            navLink: '/frontend/app/employee'

          }
        ]
      }
    ]
  },
  {
    id: 'FAQ',
    title: 'FAQ',
    icon: <FaQuestionCircle size={ 12 } />,
    children: [
      {
        id: 'form',
        title: 'Add New FAQ',
        icon: <Circle size={ 12 } />,
        navLink: '/faq/form'
      },
      {
        id: 'list',
        title: 'FAQ List',
        icon: <Circle size={ 12 } />,
        navLink: '/faq/list'
      }
    ]
  },
  {
    id: 'Banners',
    title: 'Banners',
    icon: <CgWebsite size={ 12 } />,
    children: [
      {
        id: 'desktop',
        title: 'For Desktop',
        icon: <Circle size={ 12 } />,
        navLink: '/banners/desktop'
      },
      {
        id: 'mobile',
        title: 'For Mobile',
        icon: <Circle size={ 12 } />,
        navLink: '/banners/mobile'
      }
    ]
  },

  {
    id: 'bookings',
    title: 'Bookings',
    icon: <BookOpen size={ 20 } />,
    navLink: '/bookings'
  },
  {
    id: 'chat',
    title: 'Chat',
    icon: <MessageSquare size={ 20 } />,
    navLink: '/apps/chat'
  },

  {
    id: 'Orders',
    title: 'Orders',
    icon: <BiBadgeCheck size={ 12 } />,
    navLink: '/orders'
  },
  {
    id: 'Marketing Banner',
    title: 'Marketing Banner',
    icon: <GiVerticalBanner size={ 12 } />,
    navLink: '/marketing/banner'
  },
  {
    header: 'Settings'
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: <Settings size={ 20 } />,
    children: [
      {
        id: 'general',
        title: 'General Settings',
        icon: <Circle size={ 12 } />,
        navLink: '/settings/general'
      },
      {
        id: 'smtp',
        title: 'SMTP Configuration',
        icon: <Circle size={ 12 } />,
        navLink: '/settings/smtp'
      }
    ]
  },

  // {
  //   id: 'FAQ',
  //   title: 'FAQ',
  //   icon: <FaQuestionCircle  size={12} />,
  //   navLink: '/faq/From'
  // },
  {
    header: 'Mobile'
  },
  {
    id: 'mobile',
    title: 'Mobile Application',
    icon: <Smartphone size={ 20 } />,
    children: [
      // {
      //   id: 'mobile',
      //   title: 'Banners',
      //   icon: <Circle size={ 12 } />,
      //   navLink: '/mobile-app/banners'
      // },
      {
        id: 'm-screens',
        title: 'Splash Screens',
        icon: <Circle size={ 12 } />,
        navLink: '/mobile-app/splash'
      }
    ]
  }

]
