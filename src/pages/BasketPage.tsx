import React from 'react';
import {Table, InputNumber, Space, Button, message} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {RootState} from "../redux/reducers/root";
import {IUserState} from "../redux/reducers/user";
import IBasket from "../types/basket";
import * as basketActions from "../redux/actions/basket";
import IStuff from "../types/stuff";
import {IStuffsState} from "../redux/reducers/stuffs";

export interface IBasketPageProps {
}

export function BasketPage(_: IBasketPageProps) {
    const dispatch = useDispatch();
    const {user} = useSelector<RootState, IUserState>(state => state.auth);
    const {stuffs} = useSelector<RootState, IStuffsState>(state => state.stuffs);
    const basket: IBasket = user?.basket ?? {stuffs: []};
    const mappedBasketStuffs = basket.stuffs.map(
        stuff => {
            let baseStuff: IStuff = stuffs?.find(s => s.id === stuff.stuffId) ?? {
                id: "0",
                cost: 0,
                name: "Неизвестный товар",
                rates: [],
                description: "",
                image: "",
                categories: []
            };

            return {
                baseStuff,
                costLine: baseStuff.cost.toFixed(2),
                count: stuff.count,
                basketStuff: stuff
            };
        });

    const onCountInputBlur = (stuff: IStuff) => (e: any) => {
        let value = +e.target.value;
        if (user) {
            dispatch(basketActions.setCountOfStuffInBasket(user, stuff, value));
        }
    }
    const onOrderClick = () => {
        if (user) {
            dispatch(basketActions.orderBasket(user));
            message.info("Заказ успешно получен");
        }
    }
    const onClearClick = () => {
        if (user) {
            dispatch(basketActions.clearBasket(user));
        }
    }

    const columns = [
        {
            title: 'Товар',
            key: 'name',
            render: (text: string, mappedStuff: any) => {
                return (
                    <Link to={`/stuffs?id=${mappedStuff.baseStuff.id}`}>
                        {mappedStuff.baseStuff.name}
                    </Link>
                );
            }
        },
        {
            title: 'Цена',
            dataIndex: 'costLine',
            key: 'costLine'
        },
        {
            title: 'Количество',
            key: 'count',
            render: (text: string, mappedStuff: any) => {
                return (
                    <InputNumber size='large' min={0} max={10000}
                                 defaultValue={mappedStuff.count}
                                 onBlur={onCountInputBlur(mappedStuff.baseStuff)}/>
                );
            }
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={mappedBasketStuffs} pagination={false}
                   style={{margin: '0 0 1rem'}}
                   rowKey={(mappedStuff: any) => mappedStuff.id}/>
            <Space style={{justifyContent: 'flex-end', width: '100%'}}>
                <Button type='default' size='large' disabled={!user || mappedBasketStuffs.length === 0}
                        onClick={onClearClick}>Очистить корзину</Button>
                <Button type='primary' size='large' disabled={!user || mappedBasketStuffs.length === 0}
                        onClick={onOrderClick}>Оформить заказ</Button>
            </Space>
        </div>
    );
}