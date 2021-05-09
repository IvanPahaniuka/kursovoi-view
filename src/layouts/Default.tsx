import React, {useEffect, useState} from 'react';
import {Layout, Col, Row, Divider, Button, Space, Input} from 'antd';
import * as icons from '@ant-design/icons';
import {CategoriesButton} from "../components/CategoriesButton";
import ICategory from "../types/category";
import {SigninButton} from "../components/SigninButton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/reducers/root";
import {ICategoriesState} from "../redux/reducers/categories";
import * as categoriesActions from "../redux/actions/categories";


//todo stuff full info
//todo basket full info
//todo purchases full info
//todo sell full info


export interface IDefaultLayoutProps {
    children?: any;
}

export function DefaultLayout({ children }: IDefaultLayoutProps) {
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {categories} = useSelector<RootState, ICategoriesState>(state => state.categories)

    useEffect(() => {
        if (!categories) dispatch(categoriesActions.getCategories());
    }, [categories]);

    const onCategorySelect = (category: ICategory) => {
        console.log(category);
    };

    const onSignin = (email: string, password: string) => {
        //return "Ошибка 0x000000 (время переустанавливать шиндовс)";
        setIsLoggedIn(true);
        console.log("signin " + JSON.stringify({email, password}));
    };

    const onSignup = (email: string, password: string) => {
        console.log("signup " + JSON.stringify({email, password}));
        return "Ошибка 0x000000 (время переустанавливать шиндовс)";
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
                        <Space>
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
                {children}
            </Layout.Content>

            <Layout.Footer style={{textAlign: 'center', background: 'white'}}>
                <Divider/>
                <span>Курсовой проект Лебедева А.Д. и Поганюко И.А.</span><br/>
                <span>БГУИР, 2021</span>
            </Layout.Footer>
        </Layout>
    );
}