import React, { Component } from 'react'
import { Button, Flex, InputItem, WingBlank, WhiteSpace, Checkbox,Modal } from 'antd-mobile'
import { Link } from 'react-router-dom'

import './Reg.css'
import { regApi, valitecodeApi } from '../../api/api'
const AgreeItem = Checkbox.AgreeItem;
const alert = Modal.alert;
export default class Reg extends Component {
    constructor() {
        super()

        this.state = {
            phone: '',    //手机
            pwd: '', //密码
            valitecode: '',//验证码
            checkbox: false, //协议开关
         
        }
    }
    render() {
        return (
            <div className='Reg'>
                <WingBlank size='lg' >
                    <InputItem
                        placeholder="请输入手机"
                        type="phone"
                        clear
                        value={this.state.phone}
                        onChange={(val) => { this.setState({ phone: val }) }}
                    >
                        {/* <div  /> */}
                    </InputItem>
                    <WhiteSpace size="md" />
                    <InputItem
                        placeholder="请输入密码"
                        type="password"
                        clear
                        value={this.state.pwd}
                        onChange={(val) => { this.setState({ pwd: val }) }}
                    >
                        {/* <div  /> */}
                    </InputItem>
                    <WhiteSpace size="md" />
                    <InputItem
                        placeholder="请输入验证码"
                        type="text"
                        clear
                        extra='获取验证码'
                        onExtraClick={async () => {
                            let res = await valitecodeApi();
                            this.setState({ valitecode: res.data })
                        }}
                        value={this.state.valitecode}
                        onChange={(val) => { this.setState({ valitecode: val }) }}
                    >
                    </InputItem>
                    <WhiteSpace size="md" />
                    <Flex >
                        <AgreeItem style={{ marginLeft: 0 }} data-seed="logId" onChange={e => this.setState({ checkbox: this.state.checkbox ? false : true })} >
                            <span style={{ color: '#8a8a8a', fontSize: 12, }}> 我已同意</span>

                        </AgreeItem>
                        <span style={{ color: '#56A8DA', fontSize: 12 }}>《用户服务协议》及《隐私权政策》</span></Flex>
                    <WhiteSpace size="md" />
                    <Button transparent onClick={this.regFn.bind(this)} disabled={!(this.state.checkbox&&(this.state.phone!==""&&this.state.pwd!==""&&this.state.valitecode!==""))} activeStyle={{ backgroundColor: '#7ABAD6' }} style={{ backgroundColor: '#56A8DA', color: '#FFF' }}>注册</Button>
                    <WhiteSpace size="md" />
                    <Link style={{ color: '#56A8DA' }} to='/login'>已有账号</Link>
                </WingBlank>
            </div >
        )
    }
    /* 注册 */
    async regFn() {
        let res = await regApi(this.state.phone,this.state.pwd)
        console.log(res);
        if (res.statusText ==='OK') {
            const alertInstance = alert('注册成功!', '是否跳转到登录页面?', [
                { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
                { text: '跳转', onPress: () => this.props.history.push('/login') },
              ]);
              setTimeout(() => {
                // 可以调用close方法以在外部close
                console.log('auto close');
                alertInstance.close();
                this.props.history.push('/login')
              }, 500000);
        }else if(res.data ==='fail'){
            const alertInstance = alert('注册失败!');
        }
    }
}
