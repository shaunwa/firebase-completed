import firebase from 'firebase/app';

export const searchRestaurants = async searchString => {
    const searchRestaurantsFunction = firebase.functions()
        .httpsCallable('searchRestaurants');
    const results = await searchRestaurantsFunction({ searchString });
    return results.data;
}