import {configureStore} from '@reduxjs/toolkit'
import todoSlice from './todoSlice'

export default configureStore({
    reducer : {
        todo : todoSlice
    }
})

// configureStore 로 store를 생성.
// 객체 형태의 인자에는 reducer가 꼭 있어야 함.