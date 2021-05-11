import React from 'react';
import {Table} from 'antd';
import {useSelector} from "react-redux";
import {RootState} from "../redux/reducers/root";
import {IUserState} from "../redux/reducers/user";
import {OrderStates} from "../types/orderStates";

export interface IOrdersPageProps {
}

export function OrdersPage(_: IOrdersPageProps) {
    const {user} = useSelector<RootState, IUserState>(state => state.auth);
    const orders = user?.orders
        .map(order => ({...order,
            cost: order.basket.stuffs
                .map(s => s.count * s.baseStuff.cost)
                .reduce((ps, s) => ps + s)
                .toFixed(2)}))
        .reverse() ?? [];

    const formatDate = (date: Date) : string => {
        let day = date.getDate().toString();
        day = (day.length === 1 ? "0" : "") + day;

        let month = date.getMonth().toString();
        month = (month.length === 1 ? "0" : "") + month;

        let hours = date.getHours().toString();
        hours = (hours.length === 1 ? "0" : "") + hours;

        let minutes = date.getMinutes().toString();
        minutes = (minutes.length === 1 ? "0" : "") + minutes;

        return `${day}-${month}-${date.getFullYear()} ${hours}:${minutes}`;
    }

    const statesDictionary = new Map<OrderStates, string>([
        ['ordered', 'Получен'],
        ['ready', 'Готов'],
        ['revoked', 'Отменен'],
        ['taken', 'Выполнен'],
    ]);
    const columns = [
        {
            title: 'Номер',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Цена',
            dataIndex: 'cost',
            key: 'cost'
        },
        {
            title: 'Состояние',
            key: 'state',
            render: (text: string, order: any) => {
                return (
                    <span>{statesDictionary.get(order.state) ?? order.state}</span>
                );
            }
        },
        {
            title: 'Время получения',
            key: 'createTime',
            render: (text: string, order: any) => {
                return (
                    <span>{order.createTime ? formatDate(order.createTime) : ""}</span>
                );
            }
        },
        {
            title: 'Время выполнения',
            key: 'takeTime',
            render: (text: string, order: any) => {
                return (
                    <span>{order.takeTime ? formatDate(order.takeTime) : ""}</span>
                );
            }
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={orders} pagination={false}
                   rowKey={(order: any) => order.id}/>
        </div>
    );
}