import React, { Component } from 'react'
import cityDate from "../../json/city.json"
import BScroll from 'better-scroll'

export default class Selectcity extends Component {
    render() {
        return (
            console.log(cityDate.hotcity),
            <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                <div id='selectcityBox' style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                    <ul className="content">
                        {/* 热门城市 */}
                        <div>
                            <p style={{ width: '100%', padding: '8px', backgroundColor: "#EEE" }}>热门城市</p>
                            {
                                cityDate.hotcity.map((obj) => {
                                    return <div key={obj}>
                                        <p style={{ lineHeight: '40px',padding: '8px', borderBottom: '1px solid #CCC',color:'#333' }}>{obj}</p>
                                    </div>
                                })
                            }
                        </div>
                        {/* 所有城市 */}
                        {
                            cityDate.citys.map(obj => <div key={obj.title} id={obj.title }>
                                <h3 style={{ width: '100%', padding: '8px', backgroundColor: "#EEE" }}>{obj.title}</h3>
                                {
                                    obj.child.map(cn => <p key={cn} style={{ lineHeight: '40px',padding: '8px', borderBottom: '1px solid #CCC',color:'#333' }}>{cn}</p>)
                                }
                            </div>
                            )
                        }
                    </ul>
                </div>
                <div style={{width:15,height:100,position:"fixed",top:80,right:0}}>
                    {
                        cityDate.citys.map(obj =><p  key={obj.title} onClick={this.clickRightTitle.bind(this,obj.title)} style={{margin:"5px 0",color:'#333' }}>{obj.title}</p>)
                    }
                    
                </div>
            </div>
        )
    }
    clickRightTitle(lab){
        //点谁滚动到左侧指定的标签上
        this.myscroll.scrollToElement('#' + lab, 300)
    }
    componentDidMount() {
        this.myscroll = new BScroll('#selectcityBox', {

        })
    }
}




