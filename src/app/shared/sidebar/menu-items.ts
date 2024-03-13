import { RouteInfo } from './sidebar.metadata';


export const ROUTES: RouteInfo[] = [
 
  {
    path: '/main/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: [],
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
        path: '/main/component/form-list',
        title: 'Form List',
        icon: 'bi bi-file-earmark',
        class: '',
        extralink: false,
        submenu: [],
        role_code: ['SA'],
      },
      
    ],
    role_code: ['SA', ],
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
        submenu: [],
        role_code: ['SA', 'A'],
      },
      {
        path: '/main/component/document-control',
        title: 'Document Control',
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
      {
        path: '/main/component/otoritas',
        title: 'Otoritas',
        icon: 'bi bi-person-rolodex',
        class: '',
        extralink: false,
        submenu: []
      }
    ],
  },
];
