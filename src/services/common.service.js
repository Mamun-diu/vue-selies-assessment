import axios from "axios";
import vm from '../main.js';

const CommonService = {
    
    init() {
        axios.defaults.baseURL = 'http://localhost/laravel-selies/public/api/';

        if (localStorage.getItem('user')) {
            axios.defaults.headers.post['Content-Type'] = 'application/json';
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${JSON.parse(localStorage.getItem('user')).access_token}`;
        }
    },

    checkValidity(data) {
        let error = {};

        for (const key in data) {
            if (data[key] == '') {
                error[key] = [`The ${key} is required`];
            }
        }

        return error;
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
                recall: false,
                data: data.data.response
            }
        }

        if (status == 422) {
            if (data.response.data.response.status.message == 'Access Denied') {
                vm.$router.push('/not-found');
            }

            return {
                status: 422,
                recall: false,
                data: data.response.data.response
            }
        }

        if (status == 401) {
            if (!localStorage.getItem('user')) {
                vm.$router.push('/register');
            } else {
                this.refresh(JSON.parse(localStorage.getItem('user')).refresh_token);
                return {
                    status: 200,
                    recall: true,
                    message: 'Authentication Success'
                }
            }
        }
    },

    async refresh(token) {
        this.init();

        await axios.post('refresh', {
            token: token
        }).then(res => {
            localStorage.setItem('user', JSON.stringify(res.data.response.records))
            return {
                status: 200,
                recall: true,
                message: 'Authentication Success'
            }
        }).catch(error => {
            console.log(error);
            localStorage.removeItem('user');
            vm.$router.push('/login');
        });
    },
}

export default CommonService;