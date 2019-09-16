import React, { Component } from 'react'
import { Button, Flex, InputItem, WingBlank, WhiteSpace, List } from 'antd-mobile'




import './My.css'
const Item = List.Item;

export default class My extends Component {
    constructor() {
        super()
        this.state = {
            msg: '登入/注册',
            iconlist: [{ icon: 'icon17.png', name: '我的积分' },
            { icon: 'icon18.png', name: '我的订阅' },
            {},
            { icon: 'icon19.png', name: '微聊联系人' },
            {},
            { icon: 'icon20.png', name: '房贷计算器' },
            { icon: 'icon21.png', name: '我的房子' },
            {},
            { icon: 'icon22.png', name: '我的看房记录' },
            { icon: 'icon23.png', name: '我的问答' },
            {},
            { icon: 'icon24.png', name: '设置' },
            { icon: 'icon25.png', name: '意见反馈' }]
        }
    }
    render() {
        return (
            <div className="My">
                <div className='cardBox'>
                    <div className='tBox'>
                        <div className='portraitBox'>
                            <img className='portrait' alt='图片加载失败!' src={require('../../../assets/image/icon_portrait.png')} />
                        </div>
                        <div className="infoBox">
                            <div> <span onClick={this.clickLogin.bind(this)}>{this.state.msg}</span> <img className='set' alt='图片加载失败!' src={require('../../../assets/image/icon_set.png')} /> </div>
                            <p>可以与经纪人发起聊天</p>
                        </div>
                    </div>
                    <WhiteSpace size="md" />
                    <WhiteSpace size="xl" />
                    <div className='bBox'>
                        <div>
                            <span>0</span>
                            <p><img alt='图片加载失败!' src={require('../../../assets/image/icon_wallet.png')} />钱包</p>
                        </div>
                        <div>
                            <span>0</span>
                            <p><img alt='图片加载失败!' src={require('../../../assets/image/icon_disco.png')} />优惠</p>
                        </div>
                        <div style={{ border: 0 }}>
                            <span>0</span>
                            <p><img alt='图片加载失败!' src={require('../../../assets/image/icon_int.png')} />积分</p>
                        </div>
                    </div>
                </div>
                <List>
                    {
                        this.state.iconlist.map((obj) => {
                            if (obj.icon) {
                                return <Item
                                    key={obj.name}
                                    thumb={require('../../../assets/image/' + obj.icon)}
                                    arrow="horizontal"
                                    onClick={() => { }}
                                >{obj.name}</Item>
                            }else{
                                return <div key={obj.name} style={{height: '10px', background: 'rgba(9, 0, 0,0.1   )'}}></div>
                            }
                        }
                        )

                    }
                </List>
            </div>
        )
    }
    componentDidMount() {
        // localStorage.getItem('username')?this.setState({msg:localStorage.getItem('username')}):this.setState({msg:'登入/注册'})
        let val = localStorage.getItem('username')
        this.setState({ msg: val ? val : '登录/注册' })
    }

    clickLogin() {
        if (!localStorage.getItem('username'))
            this.props.h.push('/login')
    }
}
