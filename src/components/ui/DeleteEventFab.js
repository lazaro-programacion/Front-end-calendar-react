import React from 'react'
import { useDispatch } from 'react-redux'
import {eventDeleted} from '../../actions/events'


export const DeleteEventFab = () => {

    const dispatch = useDispatch()

    const handelDelete = () => {
        dispatch(eventDeleted())
    }

    return (
        <button className="btn btn-danger fab-danger" onClick={handelDelete}>
            <i className="fas fa-trash" />
            <span> Borrar evento </span>
        </button>
    )
}
