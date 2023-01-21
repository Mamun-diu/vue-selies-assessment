<template>
    <div class="bg-gray-100">
        <header class="sticky top-0 z-30 w-full px-2 py-4 bg-white sm:px-4 shadow-md">
            <div class="flex items-center justify-between mx-auto max-w-7xl">
                <div class="flex items-center space-x-1">
                    <ul class="space-x-2 inline-flex">
                        <li><router-link to="/" class="px-4 py-2 font-semibold text-gray-500 rounded hover:text-gray-800">Home</router-link></li>
                    </ul>
                </div>
                <div>
                    <a v-if="isLogin" href="#" @click="logout">
                        <span class="font-bold text-gray-500 hover:text-gray-800">Logout</span>
                    </a>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
import AuthenticationService from '@/services/authentication.service'
export default {
    name: 'HeaderPage',
    data() {
        return {
            isLogin: false
        }
    },
    methods: {
        logout() {
            AuthenticationService.logout();
        }
    },
    created() {
        this.isLogin = localStorage.getItem("user") !== null
    }
}
</script>
