import axios from 'axios'
import { AuthService } from '../services'
import { APIPath } from '../constant'
import { toast } from 'react-toastify'

axios.defaults.headers.DeviceType = 2 // 1 for mobile, 2 for  'Desktop'
const onSuccess = response => {
    if (response.data.isSuccess) {
        if (response.data.message && response.data.message.toLowerCase().includes("already exists")) {
            toast.error(response.data.message); // Show error if record already exists
        } else {
            toast.success(response.data.message); // Show success for other messages
        }
    }
    return response.data;
};


const onError = async (error, callback) => {
    console.log(error)
    // if (error.data.isSuccess && error.data.message) {
    //     toast.error(error.data.message)
    // }
    if (callback && error?.response?.status === 401) {
        const token = await AuthService.refreshToken()
        await AuthService.storeToken(token)
        // return callback()
        // AuthService.logout()
        // FirebaseService.auth.signOut()
        // window.location.href = '/'
    }
    return Promise.reject({
        error: error?.response?.data?.error || error?.response?.data,
        status: error?.response?.status,
    })
}

// const refreshToken = async (error) => {
//     const originalRequest = error.config;
//     if (error?.response?.status === 403 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         const refresh_token = AuthService.getRefreshToken();
//         if (refresh_token) {
//             try {
//                 const params = {
//                     refresh_token,
//                 };
//                 const result = await AuthService.refreshToken(params);
//                 AuthService.storeUser(result);
//                 originalRequest.headers.Authorization = `Bearer ${result.access_token}`;
//                 return originalRequest;
//             } catch (error) {
//                 window.location.href = '/'
//             }
//         } else {
//             window.location.href = '/'
//         }
//     }
//     return Promise.reject(error);
// }

const request = async (options, isSecure, isToken) => {
    const headers = {}

    if (isSecure) {
        const token = AuthService.getToken()
        headers.Authorization = `Bearer ${token}`
    }
    if (isToken) {
        const token = AuthService.getToken()
        headers.Token = `${token}`
    }

    headers.app = 'GiatKit'
    headers['Access-Control-Allow-Origin'] = '*'

    const client = axios.create({
        baseURL: APIPath.server,
        headers: {
            ...headers,
        },
    })

    return client(options)
        .then(onSuccess)
        .catch(error => onError(error, () => request(options, isSecure)))
}

const uploadFiles = (url, data, headers) => {
    const token = AuthService.getToken()
    headers.Authorization = `Bearer ${token}`
    const urlPath = APIPath.server + url
    const client = axios({
        url: urlPath,
        baseURL: APIPath.server,
        method: 'POST',
        headers: { ...headers },
        data,
    })

    return client.then(onSuccess).catch(onError)
}

export class BaseService {
    static get(url, isSecure = true, isToken = false) {
        return request(
            {
                url,
                method: 'GET',
            },
            isSecure,
            isToken,
        )
    }

    static post(url, data, isSecure = true, isToken = false) {
        return request(
            {
                url,
                method: 'POST',
                data,
            },
            isSecure,
            isToken,
        )
    }

    static put(url, data, isSecure = true, isToken = false) {
        return request(
            {
                url,
                method: 'PUT',
                data,
            },
            isSecure,
            isToken,
        )
    }

    static moralisAPI(url) {
        const client = axios.create({
            baseURL: APIPath.moralisAPI,
        })
        return client({
            url,
            method: 'GET',
        })
            .then(onSuccess)
            .catch(onError)
    }

    static extenralAPICall(url) {
        const client = axios({
            url,
            method: 'GET',
            timeout: 1000 * 3,
        })
        return client.then(onSuccess).catch(onError)
    }

    static remove(url, isSecure = true, isToken = false) {
        return request(
            {
                url,
                method: 'DELETE',
            },
            isSecure,
            isToken,
        )
    }

    static upload = (url, data, header) => {
        const formData = new FormData()
        formData.append('', data)
        return uploadFiles(url, formData, header)
    }

    static setCountry = (CountryCode, CountryId) => {
        axios.defaults.headers.CountryName = CountryCode
        axios.defaults.headers.CountryId = CountryId
        axios.defaults.headers.CountryCode = CountryCode
    }

    static setState = state => {
        axios.defaults.headers.StateName = state.StateCode || ''
        axios.defaults.headers.StateId = state.StateId || 0
        axios.defaults.headers.Latitude = state.Latitude || 0
        axios.defaults.headers.Longitude = state.Longitude || 0
    }
}
