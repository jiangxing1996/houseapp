import React, { Component } from 'react'
import { Button, Flex, InputItem, WingBlank, WhiteSpace, List, Picker, SearchBar, TabBar } from 'antd-mobile'

import Main from '../nav/main/Main'
import My from '../nav/my/My'
import Chat from '../nav/chat/Chat'
import History from '../nav/history/History'






export default class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'main',
            iocnlist: [
                { title: '首页', key: 'main', icon: 'icon_main02.png', selecteIcon: 'icon_main01.png' },
                { title: '微聊', key: 'chat', icon: 'icon_chat02.png', selecteIcon: 'icon_chat01.png' },
                { title: '足迹', key: 'history', icon: 'icon_rec02.png', selecteIcon: 'icon_rec01.png' },
                { title: '我的', key: 'my', icon: 'icon_my02.png', selecteIcon: 'icon_my01.png' },
            ]
        }
    }

    renderContent() {
        // eslint-disable-next-line default-case
        switch(this.state.selectedTab){
            case 'main':return <Main h={this.props.history} />
            case 'chat':return <Chat />
            case 'history':return <History />
            case 'my':return <My  h={this.props.history}/>
        }
    }

    render() {
        return (

            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                >
                    {
                        this.state.iocnlist.map(obj => <TabBar.Item
                            title={obj.title}
                            key={obj.key}
                            icon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(' + require(`../../assets/image/${obj.icon}`) + ') center center /  21px 21px no-repeat'
                            }}
                            />
                            }
                            selectedIcon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(' + require(`../../assets/image/${obj.selecteIcon}`) + ') center center /  21px 21px no-repeat'
                            }}
                            />
                            }
                            selected={this.state.selectedTab === obj.key}
                            onPress={() => {
                                this.setState({
                                    selectedTab: obj.key,
                                });
                            }}
                        >
                            {this.renderContent()}
                        </TabBar.Item>
                        )
                    }
                </TabBar>
            </div>
        )
    }
}
