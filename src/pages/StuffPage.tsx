import React from 'react';
import IStuff from "../types/stuff";
import {Divider, Row, Col, Card, Button, Tag, Space, message, Rate} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/reducers/root";
import {IAuthState} from "../redux/reducers/auth";
import * as stuffActions from "../redux/actions/stuffs";

export interface IStuffPageProps {
    stuff: IStuff;
}

export function StuffPage({stuff}: IStuffPageProps) {
    const dispatch = useDispatch();
    const {user} = useSelector<RootState, IAuthState>(state => state.auth);

    const onAddStuffToBasketClick = () => {
        //todo add to basket action and catch errors inside default layout if errors of auth
        message.info(`Товар "${stuff.name}" добавлен в корзину`);
        //message.error(`Товар \"${stuff.name}\" не добавлен в корзину`);
    };

    const getStuffRate = (stuff: IStuff) => {
        if (user) {
            const rate = stuff.rates.find(rate => rate.user.id === user.id);
            if (rate) {
                return rate.value;
            }
        }

        return stuff.rates.length > 0 ?
            stuff.rates.map(r => r.value).reduce((s, v) => s + v) / stuff.rates.length : 0;
    };

    const onChangeRateHandler = (value: number) => {
        if (user)
            dispatch(stuffActions.rateStuff(stuff, {user, value}));
    };

    return (
        <div>
            <h1>{stuff.name}</h1>
            <span>
                <Rate allowHalf disabled={!user} value={getStuffRate(stuff)} onChange={onChangeRateHandler} allowClear={false}/>
                <span className="ant-rate-text">{stuff.rates.length}</span>
            </span>
            <Divider/>
            <Row align="top" gutter={[40, 0]} wrap={false}>
                <Col flex='40%'>
                    <img style={{width: '100%'}} alt='Изображение товара' src={stuff.image}/>
                </Col>
                <Col flex='auto'>
                    <h2>Описание</h2>
                    <span>{stuff.description}</span>
                    <Space size={[2,0]} wrap>
                        {stuff.categories.map(category =>
                            <Tag key={category.id}>{category.name}</Tag>
                        )}
                    </Space>
                </Col>
                <Col>
                    <Card title={`Цена: ${stuff.cost}р`}>
                        <Button size='large' type='primary' style={{padding: '0 2rem'}}
                                onClick={onAddStuffToBasketClick}>
                            Добавить в корзину
                        </Button>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}