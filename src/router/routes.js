
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/Index.vue') },
      { path: 'login', name: 'login', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('layouts/MyLayout.vue'),
    meta: {requiresAuth: true, requiresAdmin: true},
    children: [
      { path: '', name: 'admin', component: () => import('pages/Index.vue') },
      {
        path: 'users',
        name: 'users',
        component: () => import('pages/admin/Users.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
