import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const searchRestaurants = functions.https.onCall(async (data, context) => {
    const { searchString } = data;
    const store = admin.firestore();

    const querySnapshot = await store.collection('restaurants')
        .where('name', '==', searchString)
        .get();

    const restaurants = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
    }));

    return restaurants;
});