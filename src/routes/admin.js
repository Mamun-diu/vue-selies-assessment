import Dashboard from '@/views/admin/Dashboard.vue';
import Book from '@/views/admin/books/Index.vue'
import CreateBook from '@/views/admin/books/Create.vue'
import EditBook from '@/views/admin/books/Edit.vue'

const routes = [
    {
        name: 'Dashboard',
        component: Dashboard,
        path: '/admin/dashboard'
    },
    {
        name: 'Book',
        component: Book,
        path: '/admin/books'
    },
    {
        name: 'CreateBook',
        component: CreateBook,
        path: '/admin/book/create'
    },
    {
        name: 'EditBook',
        component: EditBook,
        path: '/admin/book/edit/:id'
    },
];

export default routes;