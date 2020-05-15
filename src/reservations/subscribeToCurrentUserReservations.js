import { getCurrentUser } from '../auth';
import { subscribeToReservations } from './subscribeToReservations';

export const subscribeToCurrentUserReservations = cb => {
    const currentUser = getCurrentUser();
    if (!currentUser) return cb([]);
    return subscribeToReservations(currentUser.id, cb);
}