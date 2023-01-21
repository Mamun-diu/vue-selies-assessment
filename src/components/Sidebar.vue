<template>
    <div class="min-h-screen flex flex-row bg-gray-100">
        <div class="flex flex-col w-56 bg-white overflow-hidden">
            <div class="flex items-center pl-5 border-b h-20">
                <h1 class="text-3xl uppercase text-indigo-500">SELIES</h1>
            </div>
            <ul class="flex flex-col py-4">
                <li>
                    <router-link to="/admin/dashboard"
                        class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                        <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i
                                class="bx bx-home"></i></span>
                        <span class="text-sm font-medium">Dashboard</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/admin/books"
                        class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                        <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i
                                class="bx bx-music"></i></span>
                        <span class="text-sm font-medium">Books</span>
                    </router-link>
                </li>
    
                <li>
                    <a href="#" @click="logout"
                        class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                        <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i
                                class="bx bx-log-out"></i></span>
                        <span class="text-sm font-medium">Logout</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import AuthenticationService from '@/services/authentication.service';
export default {
    name: 'AdminSidebar',
    methods: {
        logout() {
            AuthenticationService.logout();
        }
    },
    beforeMount() {
        if (localStorage.getItem("user") === null) {
            this.$router.push({ name: 'Login' });
        }
    }
}
</script>