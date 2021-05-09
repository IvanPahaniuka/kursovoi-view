import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Pagination, Carousel, Card, Space } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/reducers/root";
import {IStuffsState} from "../redux/reducers/stuffs";
import * as stuffsActions from "../redux/actions/stuffs";

const carouselItemStyle = {
    display: 'block',
    height: '300px',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
};

export interface ICatalogPageProps {
}

export function CatalogPage() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const {stuffs} = useSelector<RootState, IStuffsState>(state => state.stuffs);
    const stuffCountPerPage = 7;

    useEffect(() => {
        if (!stuffs) dispatch(stuffsActions.getStuffs());
    }, [stuffs]);

    return (
        <div>
            <div style={{margin: '0 0 2rem'}}>
                <Carousel style={{margin: '0 0 2rem', display: 'block' }} autoplay>
                    <div>
                        <Link to='/'
                             style={{
                                 ...carouselItemStyle,
                                 backgroundImage: 'url(https://img.kinomax24.com/series/16_S1E5.jpg)'
                             }}/>
                    </div>
                    <div>
                        <Link to='/'
                              style={{
                                  ...carouselItemStyle,
                                  backgroundImage: 'url(https://image.tmdb.org/t/p/original/u73vYvxR4kr7wYO4hn2iXlZfahh.jpg)'
                              }}/>
                    </div>
                    <div>
                        <Link to='/'
                              style={{
                                  ...carouselItemStyle,
                                  backgroundImage: 'url(https://image.tmdb.org/t/p/original/ed8RcGrngBxXt67pIJvhW0P1RaR.jpg)'
                              }}/>
                    </div>
                </Carousel>

                <div>
                    <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }} size='large' align='center' wrap>
                        {(stuffs ?? [])
                            .slice((currentPage - 1) * stuffCountPerPage, currentPage * stuffCountPerPage)
                            .map((stuff, i) =>
                            <Card
                                key={i}
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="" src={stuff.image} />}>
                                <Card.Meta title={`${stuff.cost}р`} description={stuff.name} />
                            </Card>
                        )}
                    </Space>
                </div>
            </div>
            <Pagination style={{textAlign: "center"}}
                        current={currentPage}
                        total={stuffs?.length ?? 0}
                        pageSize={stuffCountPerPage}
                        showSizeChanger={false}
                        onChange={(page) => setCurrentPage(page)}/>
        </div>
    );
};