import axios from "axios";
import vm from '../main.js';
const AuthenticationService = {
    init() {
        axios.defaults.baseURL = 'http://localhost/laravel-selies/public/api/';
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    },

    async response(data) {
        let status = 200;

        if (data.response) {
            status = data.response.status;
        } else {
            status = data.data.response.status.code;
        }

        if (status == 200 || status == 201) {
            return {
                status: 200,
                data: data.data.response
            }
        }

        if (status == 422) {
            return {
                status: 422,
                recall: false,
                data: data.response.data.response
            }
        }

        return {
            status: 500,
            message: 'Something went wrong, Please try again.'
        }
    },
    
    async login(data) {
        this.init();

        let result = await axios.post('login', data).catch(error => {
            return error;
        });

        result = await this.response(result);
        if (result.status != 200) {
            return result;
        }
        
        localStorage.setItem('user', JSON.stringify(result.data.records));
            
        if (result.data.records.type == 'admin') {
            vm.$router.push({name: 'Dashboard'});
        } else {
            vm.$router.push({name: 'Home'});
        }

        return {
            status: 200,
            message: 'Login Success'
        }
    },

    async registration(data) {
        this.init();

        let result = await axios.post('register', data).catch(error => {
            return error;
        });

        result = await this.response(result);
        if (result.status != 200) {
            return result;
        } 
        
            
        vm.$router.push({name: 'Login'});

        return {
            status: 200,
            message: 'Registration Success'
        }
    },

    async logout() {
        this.init();

        let result = await axios.post('logout').catch(error => {
            return error;
        });

        result = await this.response(result);
        if (result.status != 200) {
            return result;
        } 
        
        localStorage.removeItem('user');
        vm.$router.push({name: 'Login'});

        return {
            status: 200,
            message: 'Registration Success'
        }
    }
};

export default AuthenticationService;