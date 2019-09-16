import React, { Component } from 'react'
import { connect } from 'react-redux'


import "./History.css"
class History extends Component {
    render() {
        return (
            <div style={{width:'100%',height:'100%',overflow:'auto',background:' #fff   '}}>
                <div className='historyBox' style={{width:'100%',height:'100%',overflow:'auto'}}>
                    <div style={{marginBottom: '10px',boxShadow:' 0 4px 4px 0 rgba(0,0,0,.1)',background:' #fff',padding:'20px 10px'}}>
                        <h2 style={{color:'#56A8DA'}}>
                            看房足迹
                        </h2>
                    </div>
                    <ul style={{padding:'0 10px'}}>
                        {
                            this.props.historyData.map((obj) => {
                                return <li key={obj.id} style={{marginBottom: '5px',boxShadow:' 0 4px 4px 0 rgba(0,0,0,.1)'}}>
                                    <div className='imgBox'>
                                        <img className='historyImg' alt='图片加载失败' src={'http://192.168.0.106:80' + obj.imgs} />
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
            </div>
        )
    }

}
//如果不写过滤函数，默认所有数据都不给，只给一个dispatch函数，让你去修改store的值
export default connect((state) => {
    //return的值才会被真正注入到当前组件中
    //所有值都会被注入到props中
    return { historyData: state.historyData }
})(History)
