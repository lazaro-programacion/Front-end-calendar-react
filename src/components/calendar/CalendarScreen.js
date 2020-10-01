import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar } from '../ui/Navbar'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { uiOpenModal } from '../../actions/ui'
import { eventSetActive, eventClearActiveEvent } from '../../actions/events'
import { AddNewFab } from '../../components/ui/AddNewFab'
import { DeleteEventFab } from '../../components/ui/DeleteEventFab'


moment.locale('es')

const localizer = momentLocalizer(moment)

export const CalendarScreen = () => {

    const [lastview, setlastview] = useState(localStorage.getItem('lastView') || 'month')
    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector(state => state.calendar)
   // console.log(events)

    const onDoubleClick = (e) => {
        // console.log(e)
        dispatch(uiOpenModal(true))
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e))
    }

    const onViewChange = (e) => {
        setlastview(e)
        console.log(e)
        localStorage.setItem('lastView', e)
    }

    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }
    }
    const onSelectedSlot = (e) => {
        dispatch(eventClearActiveEvent())
    }

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar

                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectedSlot}
                selectable={true}
                view={lastview}
                components={{
                    event: CalendarEvent

                }}
            />
            <AddNewFab />
            {  activeEvent && <DeleteEventFab />}
            <CalendarModal />
        </div>
    )
}
