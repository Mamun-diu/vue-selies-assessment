<template>
    <div class="relative flex flex-col justify-center mt-16 overflow-hidden">
        <div class="w-full p-6 mx-auto bg-white rounded shadow-lg border border-gray-300 lg:max-w-md">
            <h1 class="text-3xl font-semibold text-center text-gray-700">Sign In</h1>
    
            <form class="mt-6" @submit.prevent="signIn">
                <div>
                    <label for="email" class="block text-sm text-gray-800">Email</label>
                    <input type="email" v-model="login.email"
                        class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    <div v-if="error && error.email != undefined" class="mt-2 text-red-500">
                        {{ error.email[0] }}
                    </div>
                </div>
                <div class="mt-4">
                    <div>
                        <label for="password" class="block text-sm text-gray-800">Password</label>
                        <input type="password" v-model="login.password"
                            class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40">
                        <div v-if="error && error.password != undefined" class="mt-2 text-red-500">
                            {{ error.password[0] }}
                        </div>
                    </div>
                    <div class="mt-6">
                        <button
                            class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-600">
                            Login
                        </button>
                    </div>
                </div>
            </form>
            <p class="mt-8 text-xs font-light text-center text-gray-700"> Don't have an account?
                <router-link to="/register" class="font-medium text-purple-600 hover:underline">Sign up</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import AuthenticationService from '@/services/authentication.service';
import CommonService from '@/services/common.service';

export default {
    name: 'LoginPage',
    data() {
        return {
            login: {
                email: '',
                password: '',
            },
            error: {},
            errorMessage: null
        }
    },
    methods: {
        async signIn() {
            this.error = CommonService.checkValidity(this.login);

            if (Object.keys(this.error).length) {
                return false;
            }
            
            const response = await AuthenticationService.login(this.login);

            if (response.status == 422) {
                this.error = response.data.records;
            }

            if (response.status == 500) {
                this.errorMessage = response.message;
            }
        }
    },
    beforeMount() {
        if (localStorage.getItem("user") !== null) {
            this.$router.push({ name: 'Home' });
        }
    }
}
</script>
