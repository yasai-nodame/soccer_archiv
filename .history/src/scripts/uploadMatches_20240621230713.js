import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const matchs = {
    
};

const uploadMatches = async () => {
    try {
        const matchsCollection = collection(db, 'matches');
        for (const match of matches) {
            await addDoc(matchesCollection, match);
        }
        console.log('Matches upload successfully');
    } catch (error) {
        console.error('Error uploading matches:', error);
    }
};

uploadMatches();