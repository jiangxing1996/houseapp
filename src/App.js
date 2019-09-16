import React, { Component } from 'react'

import { HashRouter, Route, Switch } from 'react-router-dom'

import Main from './pages/nav/main/Main'
import Error404 from './pages/error404/Error404'
import Login from './pages/login/Login'
import Reg from './pages/reg/Reg'
import Nav from './pages/nav/Nav'
import SelectCity from './pages/selectcity/Selectcity'
import store from './store'
import {Provider }from 'react-redux'

console.log(store.getState());

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                {/* //路由器:就是路由出口,组件的切换都在此容器进行 */}
                <HashRouter>
                    {/* Switch:选择器,匹配下面的Route,只要匹配成功1个,就会返回!!性能高 */}
                    {/* exact:精准匹配,加了以后就不在是模糊匹配 */}
                    <Switch>
                        <Route path='/main' component={Main}></Route>
                        <Route path='/Error404' component={Error404}></Route>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/reg' component={Reg}></Route>
                        <Route path='/mian' component={Main}></Route>
                        <Route path='/' exact component={Nav}></Route>
                        <Route path='/selectcity' component={SelectCity} />
                    </Switch>
                </HashRouter>
            </Provider>
        )
    }
}
