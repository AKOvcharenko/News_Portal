import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from './../store/store.js';
import actionInitFeed from './../actions/actionInitFeed.js';
import actionChangeUrlInfo from './../actions/actionChangeUrlInfo.js';
import actionChangeActiveArticle from './../actions/actionChangeActiveArticle.js';
import actionChangeTableState from './../actions/actionChangeTableState.js';
import fetchData from './../modules/fetchData.js';

import Header from './../component_header/Header.jsx';
import Navigation from '../component_navigation/Navigation.jsx';
import NewsList from '../component_news_list/NewsList.jsx';
import ContentLHP from '../component_content_lhp/ContentLHP.jsx';
import ContentAP from '../component_content_ap/ContentAP.jsx';
import Loader from '../component_loader/Loader.jsx';


const mapStateToProps = state => {return {feedState: state.feedState}};

class Container extends Component {

    componentWillMount(){
        fetchData('/data/feed.json').then(response => {
            store.dispatch(actionInitFeed(response));
        });
    }

    componentDidUpdate(){
        if(this.props.urlInfo){
            store.dispatch(actionChangeUrlInfo(this.props.urlInfo));
            store.dispatch(actionChangeActiveArticle());
            store.dispatch(actionChangeTableState(this.props.urlInfo.league));
        }
    }

    render(){
        var urlInfo = this.props.urlInfo;
        return this.props.feedState.length ?
            (<div id="provider">
                <Header/>
                <div id="main" className="container">
                    <Navigation/>
                    {urlInfo.id ? <ContentAP/> : <ContentLHP/>}
                    <div className="news-list col-sm-4 col-md-3">
                        <NewsList compateElem="like" header="Most Popular" listType="most-popular"/>
                        <NewsList compateElem="time" header="Last News" listType="last-news"/>
                    </div>
                </div>
            </div>) : <Loader/>;
    }
}

Container = connect(mapStateToProps)(Container);

export default Container;