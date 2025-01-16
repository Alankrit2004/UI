import { BaseService } from "./base";
import { BrowserUtility } from "../browser-utility";
import { APIPath, FirebaseService, StorageConstant, UserMode } from "utility";
import { CommonUtility } from "../common";
// import { useFooter } from 'layout/footer'

class Auth {
    refreshToken = async () => {
        const token = await FirebaseService.auth.currentUser.getIdToken(true);
        return token;
    };

    getRefreshToken() {
        const user = this.getUser();
        if (user) {
            return user.stsTokenManager.refreshToken;
        }
        return "";
    }

    login(reqData) {
        return BaseService.post(`${APIPath.login}`, { ...reqData, remember: true, isWebOrMobileUser: UserMode.Web });
    }

    storeToken(token) {
        BrowserUtility.save(StorageConstant.token, token);
    }

    storeUser(user) {
        if (process.env.NODE_ENV === 'development') {
            user.role = 'admin';
        }
        BrowserUtility.save(StorageConstant.user, JSON.stringify(user));
    }

    getToken() {
        return BrowserUtility.get(StorageConstant.token) || "";
    }

    async getRecaptchaToken() {
        return new Promise((resolve) => {
            let cnt = 0;
            const getCaptcha = async () => {
                cnt += 1;
                if (cnt === 5) return resolve();
                if (window.recaptchaRef) {
                    const token = await window.recaptchaRef.current?.executeAsync();
                    if (token) return resolve(token);
                }
                return setTimeout(() => getCaptcha(), 1000);
            };
            getCaptcha();
        });
    }

    getUser() {
        return BrowserUtility.getObj(StorageConstant.user);
    }

    logout() {
        BrowserUtility.remove(StorageConstant.token);
        BrowserUtility.remove(StorageConstant.user);
    }

    isAuthenticated() {
        const token = this.getToken();
        return !!token;
    }

    register(reqData) {
        return BaseService.post(APIPath.register, reqData);
    }

    sendOTP(reqData) {
        const data = CommonUtility.objectToParams(reqData);
        return BaseService.post(`${APIPath.sendOTP}?${data}`);
    }

    verifyCode(code) {
        return BaseService.post(`${APIPath.verifyCode}/${code}`, null);
    }

    updateUser(reqData) {
        return BaseService.post(APIPath.update, reqData);
    }

    updateUserAddress(reqData) {
        const data = CommonUtility.objectToParams(reqData);
        return BaseService.post(APIPath.addCutomerAddress, data);
    }
}

const AuthService = new Auth();
Object.freeze(AuthService);
export { AuthService };
