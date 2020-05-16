import React, { useState, useEffect } from 'react';
import { ReservationsListItem } from './ReservationsListItem';
import { SignOutButton } from '../auth';
import {
    Button,
    Divider,
    Heading,
    HeadingSmall,
    HoveringButton,
    Link,
    MaxWidthContentSection,
    Modal,
    SelectionList,
} from '../ui';
import { ReservationDetailForm } from './ReservationDetailForm';
import { subscribeToCurrentUserReservations } from './subscribeToCurrentUserReservations';

/*
    This page displays all of the user's current reservations in a list
*/
export const ReservationsListPage = () => {
    const [reservations, setReservations] = useState([]);
    const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(undefined);

    const onItemSelected = reservation => {
        setSelectedReservation(reservation);
        setDetailModalIsOpen(true);
    }

    const onRequestCloseModal = () => {
        setSelectedReservation(undefined);
        setDetailModalIsOpen(false);
    }

    useEffect(() => {
        const unsubscribe = subscribeToCurrentUserReservations(results => {
            setReservations(results);
        });

        return unsubscribe;
    }, []);

    return (
        <>
        <MaxWidthContentSection>
            <div style={{ height: '64px' }}>
                <SignOutButton style={{ float: 'right' }} />
                <Link to='/edit-profile'>
                    <Button
                        style={{ float: 'right', marginRight: '8px' }}
                    >Profile</Button>
                </Link>
            </div>
            <Heading>MY RESERVATIONS</Heading>
            <Divider />
            {reservations.length > 0
                ? <SelectionList
                    items={reservations}
                    keyProperty='id'
                    onItemSelected={onItemSelected}
                    itemComponent={ReservationsListItem} />
                : <HeadingSmall
                    style={{ textAlign: 'center' }}
                    >You have no reservations yet!</HeadingSmall>}
        </MaxWidthContentSection>
        <Link to='/search'>
            <HoveringButton>+ New Reservation</HoveringButton>
        </Link>
        <Modal
            isOpen={detailModalIsOpen}
            onRequestClose={onRequestCloseModal}>
                <ReservationDetailForm
                    reservation={selectedReservation}
                    onClose={onRequestCloseModal} />
        </Modal>
        </>
    );
}