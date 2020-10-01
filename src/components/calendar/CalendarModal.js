import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Modal from 'react-modal';
import moment from 'moment'

import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2'
import { uiCloseModal } from '../../actions/ui'
import { eventAddNew, eventClearActiveEvent, eventUpdate} from '../../actions/events'





const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root')

const now = moment().minutes(0).seconds(0).add(1, 'hours')
const finish = moment().minutes(0).seconds(0).add(2, 'hours')


export const CalendarModal = () => {

    const [dateStart, setDateStart] = useState(now.toDate())
    const [dateEndDate, setdateEndDate] = useState(finish.toDate())
    const [titleValid, setTitleValid] = useState(true)

    const { modalOpen } = useSelector(state => state.ui)
    const { activeEvent } = useSelector(state => state.calendar)


    const dispatch = useDispatch()

    const initEvent = {
        title: '',
        notes: '',
        start: now.toDate(),
        end: finish.toDate()
    }

    const [formValues, setFormValues] = useState(initEvent)

    const { title, notes, start, end } = formValues

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent)
        }else{
            setFormValues(initEvent)

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeEvent, setFormValues])

    const handelInputChange = ({ target }) => {

        setFormValues({
            ...formValues,
            [target.name]: target.value
        })


    }

    const closeModal = () => {
        dispatch(uiCloseModal(true))
        dispatch(eventClearActiveEvent())
        setFormValues(initEvent)

    }

    const handelStartDateChange = (e) => {
        setDateStart(e)
        setFormValues({
            ...formValues,
            start: e
        })
    }
    const handelEndtDateChange = (e) => {
        setdateEndDate(e)
        setFormValues({
            ...formValues,
            end: e
        })
    }
    const handelSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment(start)
        const momentEnd = moment(end)

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('Error', 'La fecha fin debe de ser distinta a la fecha de inicio', 'error')
        }
        if (title.trim().length < 2) {
            return setTitleValid(false)
        }

        if (activeEvent) {
            dispatch(eventUpdate( formValues))
        }else{
               dispatch(eventAddNew({
            ...formValues,
            id: new Date().getTime(),
            user: {
                _id: '123',
                name: 'Lazaro'
            }
        }))
        }
     

        setTitleValid(true)
        closeModal()
    }

    return (
        <Modal
            isOpen={modalOpen}
            //    onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            closeTimeoutMS={200}
            className="modal"
            overlayClassName='modal-fondo'
        >
        {activeEvent ? <h1> Editar evento </h1> : <h1> Nuevo evento </h1>}
            <hr />
            <form
                onSubmit={handelSubmitForm}
                className="container">

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handelStartDateChange}
                        value={dateStart}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handelEndtDateChange}
                        minDate={dateStart}
                        value={dateEndDate}
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        value={title}
                        onChange={handelInputChange}
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handelInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
