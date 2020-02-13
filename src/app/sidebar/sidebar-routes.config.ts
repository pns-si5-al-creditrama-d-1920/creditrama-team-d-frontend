export const ROUTES = [
  {path: '/dashboard', title: 'Tableau de bord', icon: 'dashboard', children: null},
  {path: 'recipients', title: 'Bénéficiaires', icon: 'contacts', children: null},
  {path: 'transfer', title: 'Faire un virement', icon: 'swap_horiz', children: null},
  {path: 'profile', title: 'Profil', icon: 'person', children: null},
  {path: 'table', title: 'Table List', icon: 'content_paste', children: null},
  {
    path: '#component',
    id: 'component',
    title: 'Component',
    icon: 'apps',
    children: [
      {path: 'components/price-table', title: 'Price Table', icon: 'PT'},
      {path: 'components/panels', title: 'Panels', icon: 'P'},
      {path: 'components/wizard', title: 'Wizard', icon: 'W'}
    ]
  },
  {path: 'notification', title: 'Notification', icon: 'notifications', children: null},
  {path: 'alert', title: 'Sweet Alert', icon: 'warning', children: null},
  {path: 'settings', title: 'Settings', icon: 'settings', children: null}
];
