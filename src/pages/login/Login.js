import React, { Component } from 'react'
import { Button, Flex, InputItem, WingBlank, WhiteSpace } from 'antd-mobile'
import { Link } from 'react-router-dom'

import './Login.css'
import { loginApi } from '../../api/api'

export default class Login extends Component {
    constructor() {
        super()

        this.state = {
            acc: '',    //用户名
            pwd: '', //密码
            oldAcc: '',  //上一轮输入的用户名
            oldPwd: '',  //上一轮输入的密码
            show: 'none'//显示提示
        }
    }
    /* 组件初始化完毕 */
    componentDidMount() {

    }
    render() {
        return (
            <div className='Login' style={{ backgroundImage: "url(" + require("../../assets/image/login_bg.jpg") + ")" ,}}>
                <Flex justify='center'>
                    <img className='logo' alt='图片加载失败!' src={require('../../assets/image/logo.jpg')} />
                </Flex>


                <WhiteSpace size="xl" />

                <WingBlank size='lg' >
                    {/* 用户名 */}
                    <InputItem
                        placeholder="请输入用户名"
                        clear
                        value={this.state.acc}
                        onChange={(val) => { this.setState({ acc: val }) }}
                    >
                        <div style={{ backgroundImage: `url(${require('../../assets/image/icon_user.png')})`, backgroundSize: 'cover', height: '22px', width: '22px' }} />
                    </InputItem>
                    {/* 密码 */}
                    <InputItem
                        placeholder="请输入密码"
                        type="password"
                        clear
                        value={this.state.pwd}
                        onChange={(val) => { this.setState({ pwd: val }) }}
                    >
                        <div style={{ backgroundImage: `url(${require('../../assets/image/icon_pwd.png')})`, backgroundSize: 'cover', height: '22px', width: '22px' }} />
                    </InputItem>
                    <p style={{ color: "red", display: this.state.show }}>请输入正确的用户名和密码!</p>

                    <WhiteSpace size="md" />

                    {/* 登录按钮 */}
                    <Button disabled={!(this.state.acc !== "" && this.state.pwd !== "")} activeStyle={{ backgroundColor: '#7ABAD6' }} onClick={this.loginFn.bind(this)} style={{ backgroundColor: '#56A8DA', color: '#FFF' }}>登录</Button>

                    <WhiteSpace size="md" />
                    
                    {/* 注册页跳转 */}
                    <Flex justify="between">
                        <Link style={{ color: '#999' }} to='/reg'>快速手机注册</Link>
                        <Link style={{ color: '#999' }} to='/reg'>忘记密码</Link>
                    </Flex>
                    {/* 第三方登录方式 */}
                    <div className="third-party">
                        <Flex justify='between'>
                            <img className='wx ' alt='图片加载失败!' src={require('../../assets/image/icon_wx.png')} />
                            <img className='qq ' alt='图片加载失败!' src={require('../../assets/image/icon_qq.png')} />
                            <img className='wb ' alt='图片加载失败!' src={require('../../assets/image/icon_wb.png')} />
                        </Flex>
                        <p>其他登录方式</p>
                    </div>
                    <p className='agreement' >登录/注册即代表同意 《 兴盛地产用户协议 》</p>
                </WingBlank>
            </div>
        )
    }
    /* 登录 */
    async loginFn() {
        // 防止用户连续点击登录按钮
        if (this.state.oldAcc === this.state.acc && this.state.oldPwd === this.state.pwd)
            this.setState({
                oldAcc: this.state.acc,
                oldPwd: this.state.pwd
            })
        // 发送post登录请求
        let res = await loginApi(this.state.acc, this.state.pwd)
        console.log(res);
        if (res.data === 'ok') {
            // 永久保存用户名
            localStorage.setItem('username',this.state.acc)
            //成功
            this.props.history.push('/')
        } else if (res.data === 'fail') {
            this.setState({
                show: 'block'
            })
        }
    }
}
