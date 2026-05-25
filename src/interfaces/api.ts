import axiosInstance from './index';

export async function login(username: string, password: string) {
  return await axiosInstance.post('/user/login', { username, password });
}

export async function register(registerData: {
  username: string;
  nickName: string;
  password: string;
  confirmPassword: string;
  email: string;
  captcha: string;
}) {
  return await axiosInstance.post('/user/register', registerData);
}

export async function updatePassword(data: {
  username: string;
  email: string;
  captcha: string;
  password: string;
  confirmPassword: string;
}) {
  return await axiosInstance.post('/user/update_password', data);
}

export async function getRegisterCaptcha(email: string) {
  return await axiosInstance.get('/user/register-captcha', {
    params: { address: email },
  });
}

export async function getUpdatePasswordCaptcha(email: string) {
  return await axiosInstance.get('/user/update_password/captcha', {
    params: { address: email },
  });
}
