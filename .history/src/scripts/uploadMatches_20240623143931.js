import { db } from '../../src/firebase.js';
import { collection, doc, setDoc } from 'firebase/firestore';

const matches = [
    { id: 1, date: '2024-6-11', category: 'プレミアリーグ', title: 'チェルシー×アーセナル', matchday: '第1節' },
    { id: 2, date: '2024-6-11', category: 'プレミアリーグ', title: 'フラム×リヴァプール', matchday: '第1節' },
    { id: 3, date: '2024-6-12', category: 'プレミアリーグ', title: 'マンC×エヴァートン', matchday: '第1節' },
    { id: 4, date: '2024-6-12', category: 'FAカップ', title: 'レスターシティ×トッテナム' },
    { id: 5, date: '2024-6-13', category: 'プレミアリーグ', title: 'ウルブス×マンU', matchday: '第1節' },
    { id: 6, date: '2024-6-13', category: 'FAカップ', title: 'ボーンマス×ノッティンガムフォレスト' },
    { id: 7, date: '2024-6-14', category: 'プレミアリーグ', title: 'ニューカッスル×クリスタル・パレス', matchday: '第1節' },
    { id: 8, date: '2024-6-14', category: 'プレミアリーグ', title: 'ブライトン×ブレントフォード', matchday: '第1節' },
    { id: 9, date: '2024-6-14', category: 'プレミアリーグ', title: 'ウエストハム×アストンヴィラ', matchday: '第1節' },
    { id: 10, date: '2024-6-15', category: 'プレミアリーグ', title: 'アーセナル×ブレントフォード', matchday: '第2節' },
    { id: 11, date: '2024-6-15', category: 'プレミアリーグ', title: 'ウルブス×エヴァートン', matchday: '第2節' },
    { id: 12, date: '2024-6-15', category: 'プレミアリーグ', title: 'マンU×マンC', matchday: '第2節' },
    { id: 13, date: '2024-6-15', category: 'プレミアリーグ', title: 'トッテナム×ルートンタウン', matchday: '第2節' },
    { id: 14, date: '2024-6-15', category: 'プレミアリーグ', title: 'リヴァプール×ボーンマス', matchday: '第2節' },
    { id: 15, date: '2024-6-15', category: 'プレミアリーグ', title: 'フラム×ノッティンガムフォレスト', matchday: '第2節' },
    { id: 16, date: '2024-6-15', category: 'プレミアリーグ', title: 'バーンリー×チェルシー', matchday: '第2節' },
    { id: 17, date: '2024-6-15', category: 'プレミアリーグ', title: 'ウエストハム×ニューカッスル', matchday: '第2節' },
    { id: 18, date: '2024-6-15', category: 'プレミアリーグ', title: 'クリスタルパレス×アストンヴィラ', matchday: '第2節' },
    { id: 19, date: '2024-6-15', category: 'プレミアリーグ', title: 'トッテナム×ルートンタウン', matchday: '第2節' },
    { id: 20, date: '2024-6-15', category: 'プレミアリーグ', title: 'リヴァプール×ボーンマス', matchday: '第2節' },
    { id: 21, date: '2024-6-15', category: 'プレミアリーグ', title: 'フラム×ノッティンガムフォレスト', matchday: '第2節' },
    { id: 22, date: '2024-6-15', category: 'プレミアリーグ', title: 'バーンリー×チェルシー', matchday: '第2節' },
    { id: 23, date: '2024-6-15', category: 'プレミアリーグ', title: 'ウエストハム×ニューカッスル', matchday: '第2節' },
    { id: 24, date: '2024-6-15', category: 'プレミアリーグ', title: 'クリスタルパレス×アストンヴィラ', matchday: '第2節' },
    { id: 25, date: '2024-6-15', category: 'プレミアリーグ', title: 'クリスタルパレス×アストンヴィラ', matchday: '第2節' },
    { id: 26, date: '2024-6-15', category: 'FAカップ', title: 'ウエストハム×ニューカッスル' },
    { id: 27, date: '2024-6-15', category: 'FAカップ', title: 'クリスタルパレス×アストンヴィラ' },
    { id: 28, date: '2024-6-15', category: 'FAカップ', title: 'トッテナム×ルートンタウン' },
    { id: 29, date: '2024-6-15', category: 'FAカップ', title: 'リヴァプール×ボーンマス' },
    { id: 30, date: '2024-6-15', category: 'FAカップ', title: 'フラム×ノッティンガムフォレスト' },
    { id: 31, date: '2024-6-15', category: 'FAカップ', title: 'バーンリー×チェルシー' },
    { id: 32, date: '2024-6-15', category: 'FAカップ', title: 'ウエストハム×ニューカッスル' },
    { id: 33, date: '2024-6-15', category: 'FAカップ', title: 'クリスタルパレス×アストンヴィラ' },
    { id: 34, date: '2024-6-15', category: 'FAカップ', title: 'クリスタルパレス×アストンヴィラ' },
    { id: 35, date: '2024-6-15', category: 'プレミアリーグ', title: 'クリスタルパレス×アストンヴィラ', matchday: '第2節' },
    { id: 36, date: '2024-6-15', category: 'プレミアリーグ', title: 'クリスタルパレス×アストンヴィラ', matchday: '第2節' },
];

const uploadMatches = async () => {
    const matchesCollection = collection(db, 'matches');

    try {
        // コレクションから全てのドキュメントを取得
        const snapshot = await getDocs(matchesCollection);
        
        // 各ドキュメントに対してデータをマージして更新
        snapshot.forEach(async (doc) => {
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

// uploadMatches();
