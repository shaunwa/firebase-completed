import firebase from 'firebase/app';

export const getRecommendations = async () => {
    const getRecommendationsFunction = firebase.functions()
        .httpsCallable('getRecommendations');
    const results = await getRecommendationsFunction();
    return results.data;
}