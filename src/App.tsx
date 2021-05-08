import React, {useState} from 'react';
import {Layout, Col, Row, Divider, Button, Space, Input, Modal} from 'antd';
import * as icons from '@ant-design/icons';
import {Catalog} from './pages/Catalog';
import {CategoriesButton} from "./components/CategoriesButton";
import ICategory from "./types/category";
import IStuff from "./types/stuff";
import {SigninButton} from "./components/SigninButton";

let categories: Array<ICategory> = [
    {name: 'Категория 1'},
    {name: 'Категория 2'},
    {name: 'Категория 3'},
    {name: 'Категория 4'}
];
let stuffs: Array<IStuff> = [
    { name: "Товар 1", cost: 1.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
    { name: "Товар 2", cost: 2.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
    { name: "Товар 3", cost: 3.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
    { name: "Товар 4", cost: 4.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
    { name: "Товар 1", cost: 1.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
    { name: "Товар 2", cost: 2.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
    { name: "Товар 3", cost: 3.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
    { name: "Товар 4", cost: 4.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
    { name: "Товар 1", cost: 1.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
    { name: "Товар 2", cost: 2.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
    { name: "Товар 3", cost: 3.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
    { name: "Товар 4", cost: 4.99, image: "https://img.kinomax24.com/series/16_S1E5.jpg" },
];

function App() {
    let [isLoggedIn, setIsLoggedIn] = useState(false);

    const onCategorySelect = (category: ICategory) => {
        console.log(category);
    };

    const onSignin = (email: string, password: string) => {
        //return "Ошибка 0x000000 (время переустанавливать шиндовс)";
        setIsLoggedIn(true);
        console.log("signin " + JSON.stringify({email, password}));
    };

    const onSignup = (email: string, password: string) => {
        return "Ошибка 0x000000 (время переустанавливать шиндовс)";
        console.log("signup " + JSON.stringify({email, password}));
    };

    const onBasket = () => {
        console.log("on basket");
    };

    const onOrders = () => {
        console.log("on orders");
    };

    const onSignout = () => {
        setIsLoggedIn(false);
        console.log("on signout");
    };

    const onSearchClick = (name: string) => {
        console.log("search: " + name);
    };

    return (
        <Layout style={{background: 'white'}}>
            <Layout.Header style={{background: 'white', padding: '0.5rem 5rem'}}>
                <Row gutter={[50, 0]} align="middle">
                    <Col>
                        <CategoriesButton categories={categories} onCategorySelect={onCategorySelect}/>
                    </Col>
                    <Col flex="auto">
                        <Input.Search style={{display: "block"}} placeholder="Название товара..." size="large"
                                      onSearch={onSearchClick} enterButton/>
                    </Col>
                    <Col>
                        <Space >
                            <SigninButton visible={!isLoggedIn} onSignin={onSignin} onSignup={onSignup}/>
                            <Button size='large' icon={<icons.AppstoreOutlined/>}
                                    style={{display: isLoggedIn ? 'inline-block' : 'none'}}
                                    onClick={onBasket}>Корзина</Button>
                            <Button size='large' icon={<icons.DollarCircleOutlined/>}
                                    style={{display: isLoggedIn ? 'inline-block' : 'none'}}
                                    onClick={onOrders}>Заказы</Button>
                            <Button size='large' icon={<icons.LogoutOutlined/>} type='primary' danger
                                    style={{display: isLoggedIn ? 'inline-block' : 'none'}}
                                    onClick={onSignout}>Выход</Button>
                        </Space>
                    </Col>
                </Row>
            </Layout.Header>

            <Layout.Content style={{padding: '2rem 4rem 0'}}>
                <Catalog stuffs={stuffs}/>
            </Layout.Content>

            <Layout.Footer style={{textAlign: 'center', background: 'white'}}>
                <Divider/>
                <span>Курсовой проект Лебедева А.Д. и Поганюко И.А.</span><br/>
                <span>БГУИР, 2021</span>
            </Layout.Footer>
        </Layout>
    );
}

export default App;
