import React from 'react';
import {Table, InputNumber, Space, Button} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {RootState} from "../redux/reducers/root";
import {IUserState} from "../redux/reducers/user";
import IBasket from "../types/basket";
import * as basketActions from "../redux/actions/basket";
import IStuff from "../types/stuff";

export interface IBasketPageProps {
}

export function BasketPage(_: IBasketPageProps) {
    const dispatch = useDispatch();
    const {user} = useSelector<RootState, IUserState>(state => state.auth);
    const basket: IBasket = user?.basket ?? {stuffs: []};
    const mappedBasketStuffs = basket.stuffs.map(
        stuff => ({...stuff.baseStuff, count: stuff.count, basketStuff: stuff}));

    const onCountInputBlur = (stuff: IStuff) => (e: any) => {
        let value = +e.target.value;
        if (user) {
            dispatch(basketActions.setCountOfStuffInBasket(user, stuff, value));
        }
    }
    const onOrderClick = () => {

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
                    <Link to={`/stuffs?id=${mappedStuff.basketStuff.baseStuff.id}`}>
                        {mappedStuff.basketStuff.baseStuff.name}
                    </Link>
                );
            }
        },
        {
            title: 'Цена',
            dataIndex: 'cost',
            key: 'cost'
        },
        {
            title: 'Количество',
            key: 'count',
            render: (text: string, mappedStuff: any) => {
                return (
                    <InputNumber size='large' min={0} max={10000}
                                 defaultValue={mappedStuff.count}
                                 
                                 onBlur={onCountInputBlur(mappedStuff.basketStuff.baseStuff)}/>
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
                <Button type='default' size='large' disabled={!user} onClick={onClearClick}>Очистить корзину</Button>
                <Button type='primary' size='large' disabled={!user} onClick={onOrderClick}>Оформить заказ</Button>
            </Space>
        </div>
    );
}