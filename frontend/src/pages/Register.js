import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import './Auth.css';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (values.password !== values.confirm) {
      message.error('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await register({
        email: values.email,
        username: values.username,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      });
      message.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      message.error(error.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <h1>Satellite Analytics</h1>
        <h3>Register</h3>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, min: 3 }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>
          <Form.Item
            label="First Name"
            name="firstName"
          >
            <Input placeholder="First name (optional)" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
          >
            <Input placeholder="Last name (optional)" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, min: 6 }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirm"
            rules={[{ required: true }]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Register
          </Button>
        </Form>
        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;
