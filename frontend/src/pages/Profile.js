import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, message, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuthStore } from '../stores/authStore';
import userService from '../services/userService';

const Profile = () => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
  }, [user, form]);

  const onProfileFinish = async (values) => {
    try {
      setLoading(true);
      await userService.updateProfile(values);
      message.success('Profile updated successfully');
    } catch (error) {
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const onPasswordFinish = async (values) => {
    try {
      setLoading(true);
      await userService.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      message.success('Password changed successfully');
      passwordForm.resetFields();
    } catch (error) {
      message.error('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '30px' }}>Profile</h1>

      <Card style={{ marginBottom: '20px', maxWidth: '600px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Avatar
            size={80}
            icon={<UserOutlined />}
            style={{ backgroundColor: '#1890ff' }}
          />
          <h2 style={{ marginTop: '10px' }}>{user?.email}</h2>
        </div>

        <h3>Update Profile</h3>
        <Form
          form={form}
          onFinish={onProfileFinish}
          layout="vertical"
          style={{ marginBottom: '30px' }}
        >
          <Form.Item label="Email" name="email">
            <Input disabled />
          </Form.Item>
          <Form.Item label="First Name" name="firstName">
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Profile
          </Button>
        </Form>

        <h3>Change Password</h3>
        <Form
          form={passwordForm}
          onFinish={onPasswordFinish}
          layout="vertical"
        >
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, min: 6 }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Change Password
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
