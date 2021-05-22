
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CodeList.vue') },
      { path: '/editor', component: () => import('components/EditorPage.vue') },
      { path: '/quiz', component: () => import('pages/QuizData.vue') },
      { path: '/codelist', component: () => import('pages/CodeList.vue') },
      { path: '/signin', component: () => import('components/GoogleLogin.vue') }
    ]
  },
  {
    path: '/quiz',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/QuizData.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
