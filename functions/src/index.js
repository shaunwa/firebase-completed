import { functions as reservationFunctions } from './reservations';
import { functions as restaurantFunctions } from './restaurants';
import { functions as userFunctions } from './users';

export default {
    ...reservationFunctions,
    ...restaurantFunctions,
    ...userFunctions,
};