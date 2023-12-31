import { RouteInfo } from './sidebar.metadata';


export const ROUTES: RouteInfo[] = [
 
  {
    path: '/main/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '#',
    title: 'Formulir',
    icon: 'bi bi-file-earmark',
    class: '',
    extralink: false,
    dropdown: true,
    submenu: [
      {
        path: '/main/component/form-itcm',
        title: 'ITCM',
        icon: 'bi bi-file-earmark',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/main/component/form-da',
        title: 'DA',
        icon: 'bi bi-file-earmark',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  },
  {
    path: '#',
    title: 'Settings',
    icon: 'bi bi-gear',
    class: '',
    extralink: false,
    dropdown: true,
    submenu: [
      {
        path: '/main/component/user-control',
        title: 'User Control',
        icon: 'bi bi-person',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/main/component/doc-settings',
        title: 'Setting Documents',
        icon: 'bi bi-file-plus',
        class: '',
        extralink: false, 
        submenu: []
      },
      {
        path: '/main/component/application',
        title: 'Aplikasi',
        icon: 'bi bi-file-earmark',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/main/component/division',
        title: 'Divisi',
        icon: 'bi bi-person-rolodex',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/main/component/grup-akses',
        title: 'Grup Akses',
        icon: 'bi bi-universal-access-circle',
        class: '',
        extralink: false,
        submenu: []
      },
    ],
  },
  // {
  //   path: '/main/component/alert',
  //   title: 'Alert',
  //   icon: 'bi bi-bell',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/main/component/badges',
  //   title: 'Badges',
  //   icon: 'bi bi-patch-check',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/main/component/buttons',
  //   title: 'Button',
  //   icon: 'bi bi-hdd-stack',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/main/component/card',
  //   title: 'Card',
  //   icon: 'bi bi-card-text',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/main/component/dropdown',
  //   title: 'Dropdown',
  //   icon: 'bi bi-menu-app',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/main/component/pagination',
  //   title: 'Pagination',
  //   icon: 'bi bi-dice-1',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/main/component/nav',
  //   title: 'Nav',
  //   icon: 'bi bi-pause-btn',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/main/component/table',
  //   title: 'Table',
  //   icon: 'bi bi-layout-split',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/main/component/add-user',
  //   title: 'Add User',
  //   icon: 'bi bi-person-plus',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/main/about',
  //   title: 'About',
  //   icon: 'bi bi-people',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/main/component/list-all-role',
  //   title: 'List All Role',
  //   icon: 'bi bi-list',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/main/component/list-all-division',
  //   title: 'List All Division',
  //   icon: 'bi bi-list',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/main/component/list-all-app',
  //   title: 'List All Application',
  //   icon: 'bi bi-list',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/main/component/add-data',
  //   title: 'Add Data',
  //   icon: 'bi bi-plus-circle',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  {
    path: '/login',
    title: 'Login',
    icon: 'bi bi-box-arrow-in-right',
    class: '',
    extralink: false,
    submenu: []
  }
];
