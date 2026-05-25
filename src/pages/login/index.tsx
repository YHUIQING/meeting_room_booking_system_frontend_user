import { Button, Form, Input, message, Space, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../interfaces/api';

interface LoginForm {
  username: string;
  password: string;
}

export function Login() {
  const [form] = Form.useForm<LoginForm>();
  const navigate = useNavigate();

  const handleLogin = async (values: LoginForm) => {
    const res = (await login(values.username, values.password)) as unknown as {
      code: number;
      message: string;
      data: any;
    };
    console.log(res);
    const { code, message: msg, data } = res;

    if (code === 201 || code === 200) {
      message.success('登录成功');
      localStorage.setItem('access_token', data.accessToken);
      localStorage.setItem('refresh_token', data.refreshToken);
      localStorage.setItem('user_info', JSON.stringify(data.userInfo));
      navigate('/');
    } else {
      message.error(msg || '登录失败');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#fff',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <Typography.Title
        level={3}
        style={{ marginBottom: '48px', fontWeight: 500 }}
      >
        会议室预订系统
      </Typography.Title>

      <Form
        form={form}
        onFinish={handleLogin}
        style={{ width: '100%', maxWidth: '420px' }}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          <Input.Password placeholder="请输入" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
          <Space
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Link to="/register" style={{ color: '#333' }}>
              创建账号
            </Link>
            <Link to="/update_password" style={{ color: '#333' }}>
              忘记密码
            </Link>
          </Space>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ backgroundColor: '#4a90e2' }}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
