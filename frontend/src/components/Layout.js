import React from 'react';
import { Layout as AntLayout, Menu, Avatar, Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined, UserOutlined, HomeOutlined, EnvironmentOutlined, BarChartOutlined } from '@ant-design/icons';
import { useAuthStore } from '../stores/authStore';
import './Layout.css';

const { Header, Sider, Content } = AntLayout;

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = React.useState(false);

  const menuItems = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/'),
    },
    {
      key: '2',
      icon: <EnvironmentOutlined />,
      label: 'Map View',
      onClick: () => navigate('/map'),
    },
    {
      key: '3',
      icon: <BarChartOutlined />,
      label: 'Analysis',
      onClick: () => navigate('/analysis'),
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => navigate('/profile'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: () => {
        logout();
        navigate('/login');
      },
    },
  ];

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: '#001529',
        }}
      >
        <div className="logo">
          <h2 style={{ color: '#fff', margin: '20px', fontSize: '18px' }}>
            {collapsed ? 'SA' : 'Satellite Analytics'}
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          style={{ backgroundColor: '#001529' }}
        />
      </Sider>
      <AntLayout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header
          style={{
            background: '#fff',
            padding: '0 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '18px',
              width: '64px',
              height: '64px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
            }}
          >
            ☰
          </button>
          <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
              <span>{user?.email || 'User'}</span>
            </div>
          </Dropdown>
        </Header>
        <Content style={{ margin: '20px', overflow: 'initial' }}>
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
