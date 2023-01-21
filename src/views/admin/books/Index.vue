<template>
    <admin-layout>
        <div class="flex justify-between bg-white border-b border-gray-400 p-4">
            <div class="text-xl">
                Posts
            </div>
            <div class="border border-gray-500 px-3 py-1 hover:bg-blue-600 hover:text-white">
                <router-link to="/admin/book/create">Add Post</router-link>
            </div>
        </div>
        <!-- Table -->
        <div>
            <div class="relative overflow-x-auto  sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500">
                    <thead
                        class="text-xs text-gray-700 uppercase bg-white border-b border-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3 w-8">
                                Image
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Author
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Sale Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Discount Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="book, key in books" :key="key" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <img :src="book.image" alt="Image">
                            </th>
                            <td class="px-6 py-4">
                                {{ this.subString(book.name) }}
                            </td>
                            <td class="px-6 py-4">
                                {{ this.subString(book.author, 40) }}
                            </td>
                            <td class="px-6 py-4 capitalize">
                                {{ formatCurrency(book.sale_price) }}
                            </td>
                            <td class="px-6 py-4 capitalize">
                                {{ formatCurrency(book.discount_price) }}
                            </td>
                            <td class="px-6 py-4 capitalize">
                                {{ book.status }}
                            </td>
                            <td class="px-6 py-4">
                                <router-link :to="'book/edit/' + book.id" class="font-medium text-blue-600 hover:underline mr-2">Edit</router-link>
                                <a @click="deleteInit(book.id, key)" href="#" class="font-medium text-red-600 hover:underline">Delete</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Pagination -->
        <div class="flex items-center justify-between bg-white pb-3 lg:px-0 shadow-md rounded-bl-xl rounded-br-xl sm:px-6 px-4">
            <div class="w-full mt-2 ml-5">
                <p>Total records: {{ pagination.total }}</p>
            </div>
            <div class="lg:w-3/5 w-full justify-end flex items-center">
                <div @click="paginate(pagination.prev_page_url)" class="flex items-center pt-3 mr-5 text-gray-600 dark:text-gray-200 hover:text-indigo-700 cursor-pointer">
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.1665 4H12.8332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M1.1665 4L4.49984 7.33333" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M1.1665 4.00002L4.49984 0.666687" stroke="currentColor" stroke-width="1.25"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p class="text-sm ml-3 font-medium leading-none ">Previous</p>
                </div>
                
                <div @click="paginate(pagination.next_page_url)" class="flex items-center pt-3 mr-5 text-gray-600 dark:text-gray-200 hover:text-indigo-700 cursor-pointer">
                    <p class="text-sm font-medium leading-none mr-3">Next</p>
                    <svg class="mr-5" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.1665 4H12.8332" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M9.5 7.33333L12.8333 4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M9.5 0.666687L12.8333 4.00002" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
        
                </div>
            </div>
        </div>
    </admin-layout>
</template>

<script>
import AdminLayout from '@/layouts/admin.vue'
import BookService from '@/services/book.service';
export default {
    name: 'AdminBook',
    data() {
        return {
            books: [],
            pagination: [],
            error: null,
            deleteBook: {
                id: null,
                key: null
            },
            deleteMessage: null,
        }
    },
    components: {
        AdminLayout
    },
    methods: {
        subString(text, length = 20) {
            return text.substring(0, length);
        },
        formatCurrency(currency) {
            return parseFloat(currency)
        },
        paginate(data) {
            const url = new URLSearchParams(data);
            const page = url.get('page');

            if (page) {
                this.getData(page);
            }
        },

        deleteInit(id, key) {
            this.deleteBook.id = id;
            this.deleteBook.key = key;
            this.delete(); 
        },

        async delete() {
            let result = await BookService.delete('admin/books/' + this.deleteBook.id);
            if (result.status == 200) {
                if (result.recall == true) {
                    setTimeout(() => {
                        this.delete();
                    }, 1000);
                } else {
                    this.books.splice(this.deleteBook.key, 1);
                }
            } else {
                this.error = result.data.records;
            }
        },

        async getData(page = null) {
            let result = await BookService.index('admin/books?rows_per_page=5&page=' + page);
            if (result.status == 200) {
                if (result.recall == true) {
                    setTimeout(() => {
                        this.getData();
                    }, 1000);
                } else {
                    this.books = result.data.records.data;
                    this.pagination = result.data.records.pagination
                }
            } else {
                this.error = result.data.records;
            }
        }
    },  
    async created() {
        this.getData()
    }
}
</script>