import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Select, Button, Table, Space, message } from 'antd';
import analysisService from '../services/analysisService';

const Analysis = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      setLoading(true);
      const response = await analysisService.getAll();
      setAnalyses(response.data);
    } catch (error) {
      message.error('Failed to fetch analyses');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      if (editingId) {
        await analysisService.update(editingId, values);
        message.success('Analysis updated successfully');
      } else {
        await analysisService.create(values);
        message.success('Analysis created successfully');
      }
      form.resetFields();
      setEditingId(null);
      fetchAnalyses();
    } catch (error) {
      message.error('Failed to save analysis');
    }
  };

  const handleDelete = async (id) => {
    try {
      await analysisService.delete(id);
      message.success('Analysis deleted successfully');
      fetchAnalyses();
    } catch (error) {
      message.error('Failed to delete analysis');
    }
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Type', dataIndex: 'analysisType', key: 'analysisType' },
    { title: 'Region', dataIndex: 'region', key: 'region' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditingId(record.id);
              form.setFieldsValue(record);
            }}
          >
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '30px' }}>Analysis</h1>

      <Card title="Create/Edit Analysis" style={{ marginBottom: '30px' }}>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Analysis title" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} placeholder="Analysis description" />
          </Form.Item>
          <Form.Item
            name="analysisType"
            label="Type"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select analysis type"
              options={[
                { label: 'Comparison', value: 'comparison' },
                { label: 'Trend', value: 'trend' },
                { label: 'Classification', value: 'classification' },
                { label: 'Change Detection', value: 'change_detection' },
                { label: 'Custom', value: 'custom' },
              ]}
            />
          </Form.Item>
          <Form.Item name="region" label="Region" rules={[{ required: true }]}>
            <Input placeholder="Region name" />
          </Form.Item>
          <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item name="endDate" label="End Date" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {editingId ? 'Update' : 'Create'} Analysis
            </Button>
            {editingId && (
              <Button
                onClick={() => {
                  setEditingId(null);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
            )}
          </Space>
        </Form>
      </Card>

      <Card title="All Analyses" loading={loading}>
        <Table
          dataSource={analyses}
          columns={columns}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  );
};

export default Analysis;
