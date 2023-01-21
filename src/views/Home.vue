<template>
    <UserLayout>
        <!-- ====== Blog Section Start -->
        <section class="pt-5 pb-10 lg:pt-[120px] lg:pb-20">
            <div class="container mx-auto">
                <div class="-mx-4 flex flex-wrap justify-center">
                    <div class="w-full px-4">
                        <div class="mx-auto max-w-[510px] text-center lg:mb-20">
                            <h2 class="text-dark mb-4 text-3xl font-bold sm:text-4xl md:text-[40px]">
                                Our Recent Books
                            </h2>
                        </div>
                    </div>
                </div>
                <div class="-mx-4 flex flex-wrap">
                    <div v-for="book, key in books" :key="key" class="w-full px-4 md:w-1/2 lg:w-1/6">
                        <div class="mx-auto mb-10 max-w-[270px]">
                            <div class="mb-2 overflow-hidden rounded">
                                <img :src="book.image" alt="image" class="w-full h-52" />
                            </div>
                            <div>
                                <h3 class="text-dark hover:text-primary mb-1 block text-center text-md font-semibold">
                                        {{ subString(book.name, 40) }}
                                </h3>
                                <p
                                    class="mb-1 text-center text-gray-700 py-1 px-4 text-xs font-semibold leading-loose">
                                    {{ subString(book.author, 40) }}
                                </p>
                                
                                <div class="flex justify-center">
                                    <p :class="{ 'line-through': book.discount_price }" class="text-body-color text-sm mr-2">
                                        Tk.{{ formatCurrency(book.sale_price) }}
                                    </p>
                                    <p v-if="book.discount_price" class="text-body-color text-sm">
                                        Tk.{{ formatCurrency(book.discount_price) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </UserLayout>
</template>

<script>
import UserLayout from '../layouts/index.vue'
import BookService from '@/services/book.service'

export default {
    name: 'HomePage',
    components: {
        UserLayout
    },
    data() {
        return {
            books: [],
            pagination: [],
        }
    },
    methods: {
        subString(text, length = 20) {
            return text.substring(0, length);
        },
        formatCurrency(currency) {
            return parseFloat(currency)
        },
        async getData() {
            let result = await BookService.index('books');
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
