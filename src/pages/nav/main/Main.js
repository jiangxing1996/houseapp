import React, { Component } from 'react'
import { Button, Flex, InputItem, WingBlank, WhiteSpace, List, Picker, SearchBar, Carousel } from 'antd-mobile'
import { Link } from 'react-router-dom'
import BScroll from 'better-scroll'
import {connect} from 'react-redux'

import "./Main.css"
import { guessLickApi } from '../../../api/api'



class Main extends Component {
    constructor() {
        super()
        this.state = {
            data: [{ img: 'logo.jpg', hash: '' }],
            imgHeight: 200,
            menuList: [
                { i: 'icon01.png', t: '新房' },
                { i: 'icon02.png', t: '二手房' },
                { i: 'icon03.png', t: '租房' },
                { i: 'icon04.png', t: '商铺' },
                { i: 'icon05.png', t: '海外房产' },
                { i: 'icon06.png', t: '卖房' },
                { i: 'icon07.png', t: '问答' },
                { i: 'icon08.png', t: '小区房价' }
            ].map((obj) => {
                return { icon: require('../../../assets/image/' + obj.i), text: obj.t }
            }),
            funcList: [
                { i: 'icon_loans.png', t: '我要贷款' },
                { i: 'icon_calculator.png', t: '房贷计算' },
                { i: 'icon_know.png', t: '知识' },
                { i: 'icon_scan.png', t: '扫一扫' },
            ].map((obj) => {
                return { icon: require('../../../assets/image/' + obj.i), text: obj.t }
            }),
            lickList: [],
            city: '定位中'//定位的城市
        }
    }


    render() {
        return (
            <div id='Main'>
                {/* 导航 */}
                <div className='navBox'>
                    <div onClick={this.locationFn.bind(this)} style={{ marginLeft: 10, color: '#fff' }}>{this.state.city}▼ </div>
                    <img className='iocn_map' src={require('../../../assets/image/icon_map.png')} />
                </div>
                <div id='scrollBox'  style={{width:'100%',height:'100%',overflow:'auto'}}>
                    <ul className='content'>
                        {/* 轮播 */}
                        <Carousel
                            autoplay={true}
                            infinite
                            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                            afterChange={index => console.log('slide to', index)}
                        >
                            {this.state.data.map(val => (
                                <a
                                    key={val}
                                    href={val.hash}
                                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                    <img
                                        src={require(`../../../assets/image/` + val.img)}
                                        alt=""
                                        style={{ width: '100%', verticalAlign: 'top', height: this.state.imgHeight }}
                                        onLoad={() => {
                                            // fire window resize event to change height
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ imgHeight: this.state.imgHeight });
                                        }}
                                    />
                                </a>
                            ))}
                        </Carousel>
                        {/* 搜索 */}
                        <div className='searchBox'>
                            <div style={{ width: 25, }}>
                                <img className='' src={require('../../../assets/image/iocn_search.png')} />
                            </div>
                            <span style={{ marginLeft: 10 }}>挑好房,上兴盛房产APP</span>
                        </div>
                        {/* 菜单 */}
                        <div className='menuBox'>
                            <ul>
                                {
                                    this.state.menuList.map((val) => {
                                        return <li key={val.text}>
                                            <img className='menuIocn' alt={val.text} src={val.icon} />
                                            <p>{val.text}</p>
                                        </li>
                                    })
                                }

                            </ul>
                        </div>
                        {/* 功能 */}
                        <div className="funcBox">
                            <div className="topBox">
                                <h3 style={{ color: '#56A8DA' }}>房产百科知识</h3>
                                <span style={{ color: '#999', fontSize: 12, marginLeft: 10 }}>专业的买房攻略</span>
                            </div>
                            <ul>
                                {
                                    this.state.funcList.map((val) => {
                                        return <li key={val.text}>
                                            <img style={{width:'36px',height:'36px'}} className='menuIocn' alt={val.text} src={val.icon} />
                                            <p style={{ color: '#616161' ,marginTop:15,fontSize:13}}>{val.text}</p>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                        {/* 猜你喜欢 */}
                        <div className='likeBox'>
                            <p style={{ color: '#333', fontSize: 16, textAlign: "left" }}>猜你喜欢</p>
                            {/* < div id='myMpa' style={{ width: '100%', height: 200, background: 'red' }}></div> */}
                            <ul>
                                {   
                                    this.state.lickList.map((obj) => {
                                        return <li key={obj.id} onClick={this.recordFn.bind(this,obj)}>
                                            <div className='imgBox'>
                                                <img className='likeImg' alt='图片加载失败' src={'http://192.168.0.106:80' + obj.imgs} />
                                            </div>
                                            <div className='content'>
                                                <div>
                                                    <h3>{obj.name}</h3>
                                                    <span style={{ color: 'red', fontWeight: 900, fontSize: 16 }}>{obj.price}/平</span>
                                                </div>
                                                <div>{obj.area}&nbsp;{obj.range}</div>
                                                <div>{obj.type}&nbsp;{obj.point}</div>
                                            </div>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </ul>
                </div>
            </div>
        )
    }
    /* 组件初始化完毕 */
    async componentDidMount() {
        // simulate img loading
        /* 性能优化:延迟加载图片 */
        setTimeout(() => {
            this.setState({
                data: [{ img: 'banner01.jpg', hash: '#/reg' },
                { img: 'banner02.jpg', hash: '#/map' },
                { img: 'banner03.jpg', hash: '#/search' }]
            });
        }, 100);
        /* 猜你喜欢get请求 */
        let res = await guessLickApi();
        this.setState({
            lickList: res.data
        })
        console.log(this.state.lickList);
        let mianScroll = new BScroll('#scrollBox', {
            click: true
        })

        // var map = new window.AMap.Map("myMpa", {
        //     resizeEnable: true,
        //     center: [116.397428, 39.90923],
        //     zoom: 13
        // });

        let _this = this
        // 高德地图定位
        //获取用户所在城市信息
        function showCityInfo() {

            //实例化城市查询类
            var citysearch = new window.AMap.CitySearch();
            //自动获取用户IP，返回当前城市
            citysearch.getLocalCity(function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    if (result && result.city && result.bounds) {
                        var cityinfo = result.city;
                        // var citybounds = result.bounds;
                        // document.getElementById('info').innerHTML = '您当前所在城市：' + cityinfo;
                        //地图显示当前城市
                        // map.setBounds(citybounds);
                        console.log(cityinfo);
                        _this.setState({
                            city: cityinfo
                        })
                    }
                } else {
                    document.getElementById('info').innerHTML = result.info;


                }
            });
        }
        showCityInfo();
    }
    
    recordFn(obj){
        console.log(this.props);   
        this.props.dispatch({
            type:'addHistoryList',
            obj
        })
    }
    locationFn() {
        console.log(this.props);
        this.props.h.push('/selectcity')
    }
}

export default connect()(Main)