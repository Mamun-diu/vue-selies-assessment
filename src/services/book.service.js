import axios from "axios";

import common from "./common.service";

const BookService = {

    async index(url) {
        common.init()

        let result = await axios.get(url).catch(error => {
            return error;
        });

        return await common.response(result);
    },

    async store(url, data) {
        common.init();

        const headers = { 'Content-Type': 'multipart/form-data' };

        let result = await axios.post(url, data, { headers }).catch(error => {
            return error;
        });

        return await common.response(result);
    },

    async edit(url) {
        common.init();

        let result = await axios.get(url).catch(error => {
            return error;
        });

        return await common.response(result);
    },

    async update(url, data) {
        common.init();

        const headers = { 'Content-Type': 'multipart/form-data' };

        let result = await axios.post(url, data, { headers }).catch(error => {
            return error;
        });

        return await common.response(result);
    },

    async delete(url) {
        common.init();

        let result = await axios.delete(url).catch(error => {
            return error;
        });

        return await common.response(result);
    }
};

export default BookService;