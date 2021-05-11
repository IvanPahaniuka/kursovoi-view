import React from 'react';
import {Layout, Col, Row, Divider, Button, Space, Input} from 'antd';
import * as icons from '@ant-design/icons';
import {CategoriesButton} from "../components/CategoriesButton";
import ICategory from "../types/category";
import {SigninButton} from "../components/SigninButton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/reducers/root";
import {ICategoriesState} from "../redux/reducers/categories";
import * as authActions from "../redux/actions/auth";
import {useHistory} from "react-router-dom";
import {IAuthState} from "../redux/reducers/auth";
import {ISigninUser, ISignupUser} from "../types/user";


//todo stuff full info
//todo basket full info
//todo purchases full info


export interface IDefaultLayoutProps {
    children?: any;
}

export function DefaultLayout({ children }: IDefaultLayoutProps) {
    const dispatch = useDispatch();
    const history = useHistory();
    const {categories} = useSelector<RootState, ICategoriesState>(state => state.categories);
    const {user, signinResult, signupResult, error: authError} = useSelector<RootState, IAuthState>(state => state.auth);

    const onCategorySelect = (category: ICategory) => {
        console.log(category);
    };

    const onSignin = (user: ISigninUser) => {
        dispatch(authActions.signin(user));
    };

    const onSignup = (user: ISignupUser) => {
        dispatch(authActions.signup(user));
    };

    const onBasket = () => {
        console.log("on basket");
    };

    const onOrders = () => {
        console.log("on orders");
    };

    const onSignout = () => {
        dispatch(authActions.signout());
    };

    const onSearchClick = (name: string) => {
        console.log("search: " + name);
    };

    const onMainClick = () => {
        history.push('/');
    };

    return (
        <Layout style={{background: 'white'}}>
            <Layout.Header style={{background: 'white', padding: '0.5rem 5rem'}}>
                <Row gutter={[50, 0]} align="middle">
                    <Col>
                        <Space>
                            <Button onClick={onMainClick} size='large' type='primary' icon={<icons.HomeOutlined/>}>Главная</Button>
                            <CategoriesButton categories={categories} onCategorySelect={onCategorySelect}/>
                        </Space>
                    </Col>
                    <Col flex="auto">
                        <Input.Search style={{display: "block"}} placeholder="Название товара..." size="large"
                                      onSearch={onSearchClick} enterButton/>
                    </Col>
                    <Col>
                        <Space>
                            <SigninButton visible={!user}
                                          signinResult={signinResult} signupResult={signupResult} error={authError}
                                          onSignin={onSignin} onSignup={onSignup}/>
                            <Button size='large' icon={<icons.AppstoreOutlined/>}
                                    style={{display: user ? 'inline-block' : 'none'}}
                                    onClick={onBasket}>Корзина</Button>
                            <Button size='large' icon={<icons.DollarCircleOutlined/>}
                                    style={{display: user ? 'inline-block' : 'none'}}
                                    onClick={onOrders}>Заказы</Button>
                            <Button size='large' icon={<icons.LogoutOutlined/>} type='primary' danger
                                    style={{display: user ? 'inline-block' : 'none'}}
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