import { Button, Form, Input, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

interface LoginForm {
  username: string;
  password: string;
}

export function Login() {
  const [form] = Form.useForm<LoginForm>();

  const handleLogin = (values: LoginForm) => {
    console.log('登录', values.username, values.password);
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
