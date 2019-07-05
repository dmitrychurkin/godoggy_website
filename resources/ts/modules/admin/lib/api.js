import axios from 'axios';

// export const apiSetup = () => {
    // const { common } = axios.defaults.headers;
    // common['X-Requested-With'] = 'XMLHttpRequest';
    // const token = document.head.querySelector('meta[name="csrf-token"]');
    // if (token) {
    //     common['X-CSRF-TOKEN'] = token.content;
    // } else {
    //     console.error('CSRF token not found');
    // }
    // window.axios = axios;
// };

export default axios.create({
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});

export const getBaseURL = () => `${window.location.origin}/admin`;