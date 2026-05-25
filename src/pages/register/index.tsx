import { Button, Form, Input, message } from 'antd';
import './index.css';
import { useForm } from 'antd/es/form/Form';
import { Link } from 'react-router-dom';
import { registerCaptcha, register } from '../../interfaces/api';
import { useNavigate } from 'react-router-dom';

export interface RegisterUser {
    username: string;
    nickName: string;
    password: string;
    confirmPassword: string;
    email: string;
    captcha: string;
}




const layout1 = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
}

const layout2 = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 }
}
const getCaptcha = async (email: string) => {
    const res = await registerCaptcha(email);
    console.log(res);
};

export function Register() {
    const [form] = useForm();
    const navigate = useNavigate();
    const onFinish = async (values: RegisterUser) => {
        console.log(values);
        const res = await register(values) || {};
        if (res?.code === 200) {
            // 跳转到登录页面
            navigate('/login');
            message.success('注册成功');
        }   
        console.log('registerFetch', res);
    };
    return <div id="register-container">
        <h1>会议室预订系统</h1>
        <Form
            form={form}
            {...layout1}
            onFinish={onFinish}
            colon={false}
            autoComplete="off"
        >
            <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="昵称"
                name="nickName"
                rules={[{ required: true, message: '请输入昵称!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="确认密码"
                name="confirmPassword"
                rules={[{ required: true, message: '请输入确认密码!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="邮箱"
                name="email"
                rules={[
                    { required: true, message: '请输入邮箱!' },
                    { type: "email", message: '请输入合法邮箱地址!'}
                ]}
            >
                <Input />
            </Form.Item>

            <div className='captcha-wrapper'>
                <Form.Item
                    label="验证码"
                    name="captcha"
                    rules={[{ required: true, message: '请输入验证码!' }]}
                >
                    <Input />
                </Form.Item>
                <Button type="primary" onClick={() => { getCaptcha(form.getFieldValue('email')) }}>发送验证码</Button>
            </div>

            <Form.Item
                {...layout2}
            >
                <div className='links'>
                    已有账号？去<Link to="/login">登录</Link>
                </div>
            </Form.Item>

            <Form.Item
                {...layout1}
                label=" "
            >
                <Button className='btn' type="primary" htmlType="submit">
                    注册
                </Button>
            </Form.Item>
        </Form>
    </div>   
}