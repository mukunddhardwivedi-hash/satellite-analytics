import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Table, Space, Button, Modal } from 'antd';
import { EnvironmentOutlined, FireOutlined, AreaChartOutlined } from '@ant-design/icons';
import satelliteService from '../services/satelliteService';
import eventService from '../services/eventService';
import analysisService from '../services/analysisService';

const Dashboard = () => {
  const [satelliteCount, setSatelliteCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [analysisCount, setAnalysisCount] = useState(0);
  const [recentData, setRecentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [satRes, eventRes, analysisRes] = await Promise.all([
          satelliteService.getAll({ limit: 5 }),
          eventService.getAll({ limit: 5 }),
          analysisService.getAll(),
        ]);

        setSatelliteCount(satRes.data?.length || 0);
        setEventCount(eventRes.data?.length || 0);
        setAnalysisCount(analysisRes.data?.length || 0);
        setRecentData(satRes.data || []);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Data Type',
      dataIndex: 'dataType',
      key: 'dataType',
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Date',
      dataIndex: 'acquisitionDate',
      key: 'acquisitionDate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '30px' }}>Dashboard</h1>

      <Row gutter={[16, 16]} style={{ marginBottom: '30px' }}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Satellite Data"
              value={satelliteCount}
              prefix={<EnvironmentOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Natural Events"
              value={eventCount}
              prefix={<FireOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Analyses"
              value={analysisCount}
              prefix={<AreaChartOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Recent Satellite Data" loading={loading}>
        <Table
          dataSource={recentData}
          columns={columns}
          rowKey="id"
          pagination={false}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
