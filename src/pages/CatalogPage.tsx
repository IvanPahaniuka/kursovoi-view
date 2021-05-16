import React from 'react';
import {useHistory} from 'react-router-dom';
import {Carousel} from 'antd';
import {useSelector} from "react-redux";
import {RootState} from "../redux/reducers/root";
import {IStuffsState} from "../redux/reducers/stuffs";
import {StuffsPanel} from "../components/StuffsPanel";
import IStuff from "../types/stuff";

const carouselItemStyle = {
    display: 'flex',
    height: '300px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    alignItems: 'center'
};

export interface ICatalogPageProps {
}

export function CatalogPage(_: ICatalogPageProps) {
    const history = useHistory();
    const {filteredStuffs} = useSelector<RootState, IStuffsState>(state => state.stuffs);

    const onStuffClick = (stuff: IStuff) => {
        history.push(`/stuffs?id=${stuff.id}`)
    };

    return (
        <div>
            <div>
                <div style={{margin: '0 0 2rem', display: 'block'}}>
                    <Carousel autoplay>
                        <div>
                            <div style={{
                                ...carouselItemStyle,
                                backgroundImage: 'url(https://krot.info/uploads/posts/2021-01/1611731021_16-p-svetlo-goluboi-gradientnii-fon-16.jpg)'
                            }}>
                                <h1 style={{
                                        color: "white",
                                        fontSize: '4rem',
                                        margin: 'auto'}}>
                                    Интернет-магазин
                                </h1>
                            </div>
                        </div>
                    </Carousel>
                </div>

                <StuffsPanel stuffs={filteredStuffs} onStuffClick={onStuffClick}/>
            </div>

        </div>
    );
};