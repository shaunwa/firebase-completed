import firebase from 'firebase/app';

export const getRestaurant = async id => {
    const restaurantDoc = await firebase.firestore()
        .collection('restaurants')
        .doc(id)
        .get();

    const restaurant = restaurantDoc.data();

    return {
        ...restaurant,
        id,
    };
}