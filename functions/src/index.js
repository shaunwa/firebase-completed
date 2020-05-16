import { functions as reservationFunctions } from './reservations';
import { functions as userFunctions } from './users';

export default {
    ...reservationFunctions,
    ...userFunctions,
};