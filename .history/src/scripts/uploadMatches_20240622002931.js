import { db } from '../../src/firebase.js';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';

const matches = [
    { id: 1, date: '2024-6-11', category: 'プレミアリーグ', title: 'チェルシー×アーセナル', matchday: '第1節' },
    { id: 2, date: '2024-6-11', category: 'プレミアリーグ', title: 'フラム×リヴァプール', matchday: '第1節' },
    // 他のmatchesのデータも同様に定義
];

const uploadMatches = async () => {
    const matchesCollection = collection(db, 'matches');

    try {
        // コレクションから全てのドキュメントを取得
        const querySnapshot = await getDocs(matchesCollection);

        // 各ドキュメントに対してデータをマージして更新
        querySnapshot.forEach(async (doc) => {
            const matchData = matches.find(match => match.id === parseInt(doc.id));
            if (matchData) {
                // マージオプションで既存データとマージして更新
                await setDoc(doc.ref, matchData, { merge: true });
            }
        });

        console.log('Matches uploaded successfully');
    } catch (error) {
        console.error('Error uploading matches: ', error);
    }
};

uploadMatches();
