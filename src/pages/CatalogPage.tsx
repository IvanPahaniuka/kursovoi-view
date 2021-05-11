import React, {useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Carousel } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/reducers/root";
import {IStuffsState} from "../redux/reducers/stuffs";
import * as stuffsActions from "../redux/actions/stuffs";
import {StuffsPanel} from "../components/StuffsPanel";
import IStuff from "../types/stuff";

const carouselItemStyle = {
    display: 'block',
    height: '300px',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
};

export interface ICatalogPageProps {
}

export function CatalogPage(props: ICatalogPageProps) {
    const history = useHistory();
    const dispatch = useDispatch();
    const {stuffs} = useSelector<RootState, IStuffsState>(state => state.stuffs);

    useEffect(() => {
        if (!stuffs) dispatch(stuffsActions.getStuffs());
    }, [stuffs, dispatch]);

    const onStuffClick = (stuff: IStuff) => {
        history.push(`/stuffs?id=${stuff.id}`)
    };

    return (
        <div>
            <div>
                <Carousel style={{margin: '0 0 2rem', display: 'none' }} autoplay>
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

                <StuffsPanel stuffs={stuffs} onStuffClick={onStuffClick}/>
            </div>

        </div>
    );
};