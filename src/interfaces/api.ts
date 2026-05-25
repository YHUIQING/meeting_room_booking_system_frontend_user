import axiosInstance, { ApiResponse } from './index';
import { RegisterUser } from '../types/user';
import { UpdatePassword } from '../types/user';
export async function login(username: string, password: string) {
  return await axiosInstance.post('/user/login', { username, password });
}

export async function registerCaptcha(email: string) {
    return await axiosInstance.get('/user/register-captcha', {
        params: {
            address: email
        }
    });
}

export async function register(registerUser: RegisterUser) {
    return await axiosInstance.post('/user/register', registerUser) as unknown as ApiResponse;
}



export async function getUpdatePasswordCaptcha(email: string) {
  return await axiosInstance.get('/user/update_password/captcha', {
    params: { address: email },
  });
}

export async function updatePasswordCaptcha(email: string) {
    return await axiosInstance.get('/user/update_password/captcha', {
        params: {
            address: email
        }
    });
}

export async function updatePassword(data: UpdatePassword) {
    return await axiosInstance.post('/user/update_password', data);
}