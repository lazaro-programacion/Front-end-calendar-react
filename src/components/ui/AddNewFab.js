import React from 'react'
import { uiOpenModal } from '../../actions/ui'
import { useDispatch} from 'react-redux'


export const AddNewFab = () => {
const dispatch = useDispatch()

    const handelClick = () => {
        dispatch(uiOpenModal())
    }
    return (
        <button className="btn btn-primary fab" onClick={handelClick}>
            <i className="fas fa-plus"/>

        </button>
    )
}
