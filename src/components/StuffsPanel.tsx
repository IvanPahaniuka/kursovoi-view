import {Space, Card, Pagination} from "antd";
import React, {useState} from "react";
import IStuff from "../types/stuff";
import * as icons from "@ant-design/icons";
import * as colors from "@ant-design/colors";


export interface IStuffsPanelProps {
    stuffs?: Array<IStuff>;
    onStuffClick?: (stuff: IStuff) => void;
}

export function StuffsPanel({
                                stuffs = [], onStuffClick = () => {
    }
                            }: IStuffsPanelProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const stuffCountPerPage = 7;

    const onStuffClickHandler = (stuff: IStuff) => () => {
        onStuffClick(stuff);
    };

    return (
        <div>
            {stuffs && stuffs.length > 0 ?
                <Space direction="horizontal" style={{width: '100%', justifyContent: 'center', margin: '0 0 2rem'}}
                       size='large' align='center' wrap>
                    {(stuffs ?? [])
                        .slice((currentPage - 1) * stuffCountPerPage, currentPage * stuffCountPerPage)
                        .map((stuff, i) =>
                            <Card
                                key={i}
                                hoverable
                                style={{width: 240}}
                                cover={<img alt="" src={stuff.image}/>}
                                onClick={onStuffClickHandler(stuff)}>
                                <Card.Meta title={`${stuff.cost}р`} description={stuff.name}/>
                            </Card>
                        )}
                </Space>
            :
                <div style={{textAlign: "center", color: colors.grey[6]}}>
                    <icons.FrownOutlined style={{fontSize: '6rem', margin: '0 0 1rem 0'}}/>
                    <h2>Список товаров пуст</h2>
                </div>
            }

            <Pagination style={{textAlign: "center"}}
                        hideOnSinglePage={true}
                        current={currentPage}
                        total={stuffs?.length ?? 0}
                        pageSize={stuffCountPerPage}
                        showSizeChanger={false}
                        onChange={(page) => setCurrentPage(page)}/>
        </div>
    );
}

;