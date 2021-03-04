import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'

import {errorLogger} from '../../../utils/functions'
import {apiClient} from '../../../utils/api'
import {ApiCache} from '../../../utils/api_cache'
import Spinner from '../../base/Spinner/Spinner'
import {BookingListItem} from "./BookingList/BookingListItem";


import Button from "@material-ui/core/Button";
import {PageContentWrapper} from "../../base/Common/PageContentWrapper";

/*
const useStyles = makeStyles({
})
*/


const apiCache = ApiCache.getInstance()


const Bookings = () => {
    // const classes = useStyles();

    const [bookings, setBookings] = useState([]);
    const [apiLoading, setApiLoading] = useState(true);
    const history = useHistory();

    const handleEditClick = (id) => {
        history.push(`/dashboard/bookings/${id}`)
    }


    useEffect(() => {
        setBookings(apiCache.getBookings())
        setApiLoading(true)
        apiClient
            .getBookings()
            .then((bookings) => {
                setBookings(bookings);
                setApiLoading(false);
            })
            .catch((error) => {
                errorLogger(error)
            })
    }, [])


    const isDataEmpty = () => (!bookings || !bookings.length)
    const isLoadingInProgress = () => (isDataEmpty() && apiLoading)

    const welcomeMessage = () => {
        return (
            <>
                <p>When someone books a Room in your hotel, the reservation appears here</p>
                <p>In the meanwhile, try adding a manual reservation, because they are also kept here</p>
            </>
        )
    }

    return (
        <PageContentWrapper>
            {isLoadingInProgress() && <Spinner info="loading"/>}
            {isDataEmpty() && !isLoadingInProgress() && welcomeMessage()}
                <BookingsList bookings={bookings}/>
                    <Button
                        aria-label="edit"
                        onClick={() => handleEditClick('temporary')}
                        variant='contained'
                        color='primary'
                    >
                        + Add Reservation
                    </Button>
        </PageContentWrapper>
    )
}



const BookingsList = ({bookings})=>{
    return bookings.map((booking) => (
        <BookingListItem key={booking.id} booking={booking} roomTypes={[]} />
    ))
}


export default Bookings;
