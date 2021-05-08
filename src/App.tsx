import React from 'react';
import { Layout, Col, Row, Divider, Button, Space, Input, Pagination  } from 'antd';
import * as icons from '@ant-design/icons';


function App() {
  return (
    <Layout style={{ background: 'white' }}>
        <Layout.Header style={{background: 'white', padding: '0.5rem 5rem' }}>
            <Row gutter={[50, 0]} align="middle">
                <Col>
                    <Button type="primary" icon={<icons.UnorderedListOutlined />} size='large'>
                        Каталог
                    </Button>
                </Col>
                <Col flex="auto">
                    <Input.Search style={{display: "block"}} placeholder="Название товара..." size="large" onSearch={() => {}} enterButton/>
                </Col>
                <Col>
                    <Space>
                        <Button size='large' icon={<icons.LoginOutlined />}>Войти</Button>
                        <Button size='large' icon={<icons.AppstoreOutlined />}>Корзина</Button>
                        <Button size='large' icon={<icons.DollarCircleOutlined />}>Заказы</Button>
                        <Button size='large' icon={<icons.LogoutOutlined />} type='primary' danger >Выход</Button>
                    </Space>
                </Col>
            </Row>
        </Layout.Header>

        <Layout.Content style={{ padding: '2rem 4rem 0' }}>
            <div>Content</div>
            <Pagination style={{textAlign: "center"}} defaultCurrent={1} total={500} pageSize={30} showSizeChanger={false}/>
        </Layout.Content>

        <Layout.Footer style={{ textAlign: 'center', background: 'white' }}>
            <Divider/>
            <span>Курсовой проект Лебедева А.Д. и Поганюко И.А.</span><br/>
            <span>БГУИР, 2021</span>
        </Layout.Footer>
    </Layout>
  );
}

export default App;
