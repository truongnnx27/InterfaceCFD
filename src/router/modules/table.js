/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: 'Quản lý',
    icon: 'table'
  },
  children: [
    {
      path: 'complex-table',
      component: () => import('@/views/table/complex-table'),
      name: 'ComplexTable',
      meta: { title: 'Quản lý khóa học' }
    },
    {
      path: 'catagory-table',
      component: () => import('@/views/table/inline-edit-table.vue'),
      name: 'CatagoryTable',
      meta: { title: 'Quản lý danh mục' }
    }
  ]
}
export default tableRouter
