<template>
    <admin-layout>
        <div class="flex justify-between bg-white border-b border-blue-600 p-4">
            <div class="text-xl">
                <router-link to="/admin/books">Book</router-link>
            </div>
        </div>
        <div class="bg-white p-6">
            <form class="w-full" @submit.prevent="saveBook">
                <div class="w-1/2">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Book Name</label>
                    <input type="text" id="name" v-model="book.name"
                        class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-blue-500 block w-full p-2.5"
                        placeholder="Your book name">
                </div>
                <div v-if="error && error.name != undefined" class="mt-2 text-red-500">
                    {{ error.name[0] }}
                </div>

                <div class="w-1/2">
                    <label for="author" class="block mb-2 text-sm font-medium text-gray-900">Author</label>
                    <input type="text" id="author" v-model="book.author"
                        class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-blue-500 block w-full p-2.5"
                        placeholder="Your book author">
                </div>
                <div v-if="error && error.author != undefined" class="mt-2 text-red-500">
                    {{ error.author[0] }}
                </div>

                <div class="w-1/2">
                    <label for="sale_price" class="block mb-2 text-sm font-medium text-gray-900">Sale Price</label>
                    <input type="number" id="sale_price" v-model="book.sale_price"
                        class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-blue-500 block w-full p-2.5"
                        placeholder="Your sale price">
                </div>
                <div v-if="error && error.sale_price != undefined" class="mt-2 text-red-500">
                    {{ error.sale_price[0] }}
                </div>

                <div class="w-1/2">
                    <label for="discount_price" class="block mb-2 text-sm font-medium text-gray-900">Discount Price</label>
                    <input type="number" id="discount_price" v-model="book.discount_price"
                        class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-blue-500 block w-full p-2.5"
                        placeholder="Your discount price">
                </div>
                <div v-if="error && error.discount_price != undefined" class="mt-2 text-red-500">
                    {{ error.discount_price[0] }}
                </div>

                <div class="mt-6 w-full flex">
                    <div class="flex items-center bg-grey-lighter w-1/2">
                        <label
                            class="w-full px-2 flex flex-col items-center py-6 bg-white text-blue rounded-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-300">
                            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path
                                    d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span class="mt-2 text-base leading-normal">Select a file</span>
                            <input type='file' class="hidden" @change="uploadFile" ref="file" />
                        </label>
                    </div>
                    <div class="ml-4 w-1/4" v-if="previewImage">
                        <img class="img-height-110" :src="previewImage" alt="image">
                    </div>
                </div>
                <div v-if="error && error.image != undefined" class="mt-2 text-red-500">
                    {{ error.image[0] }}
                </div>

                <div class="flex items-start mt-6 w-1/2">
                    <select v-model="book.status" class="w-full p-3 focus:outline-none focus:border-blue-500 border border-gray-200">
                        <option value="">Select One</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
                <div v-if="error && error.status != undefined" class="mt-2 text-red-500">
                    {{ error.status[0] }}
                </div>

                <router-link to="/admin/books"
                    class="mt-6 mr-3 py-3 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-6 text-center">
                    Cancel
                </router-link>
                <button type="submit"
                    class="mt-6 text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-6 py-2.5 text-center">
                    Save Book
                </button>
            </form>
        </div>
    </admin-layout>
</template>

<script>
import AdminLayout from '@/layouts/admin.vue'
import BookService from '@/services/book.service';
import CommonService from '@/services/common.service';

export default {
    name: 'CreateBook',
    components: {
        AdminLayout
    },
    data() {
        return {
            book: {
                name: '',
                author: '',
                sale_price: '',
                discount_price: '',
                status: '',
                image: ''
            },
            previewImage: null,
            error: null
        }
    },
    methods: {
        uploadFile(e) {
            this.book.image = e.target.files[0];

            const file = e.target.files[0];
            this.previewImage = URL.createObjectURL(file);
        },
        async saveBook() {
            this.error = CommonService.checkValidity({
                name: this.book.name,
                author: this.book.author,
                sale_price: this.book.sale_price,
                status: this.book.status
            });

            if (Object.keys(this.error).length) {
                return false;
            }

            let result = await BookService.store('admin/books', this.book);
            if (result.status == 200) {
                if (result.recall == true) {
                    setTimeout(() => {
                        this.saveBook();
                    }, 1000);
                } else {
                    this.$router.push({ name: 'Book' })
                }
            }

            if (result.status == 422) {
                this.error = result.data.records;
            }
        }
    }
}
</script>

<style scoped>
.img-height-110 {
    height: 110px
}
</style>