import {createStore,combineReducers} from 'redux'



function test(state='张三',action){
    switch(action.type){
        default: return state
    }
}

function historyData(state=[],action){
    switch(action.type){
        case 'addHistoryList':return [action.obj,...state.filter(obj=>obj.name!=action.obj.name)]
        default :return state
    }   
}


//combineReducers 把N个小的reducer合成成一个大reducer,用来定义多个状态
export default createStore(combineReducers({
    test,
    historyData
}))