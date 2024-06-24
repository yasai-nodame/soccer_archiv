// Navbar.jsx

import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { db } from '../../firebase'; // Firebaseの初期化ファイルのパスに適宜変更

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (event) => {
        event.preventDefault();
        
        // Firestoreで検索するクエリ
        const query = searchTerm.trim().toLowerCase();
        if (query === '') {
            setSearchResults([]);
            return;
        }

        try {
            const snapshot = await db.collection('matches')
                .where('title', '>=', query)
                .where('title', '<=', query + '\uf8ff')
                .get();

            const results = snapshot.docs.map(doc => doc.data().title);
            setSearchResults(results);
        } catch (error) {
            console.error('Error searching matches:', error);
        }
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <nav className='navbar'>
            <Link to='/' className='logo'>
                Logo
            </Link>
            <form onSubmit={handleSearch} className='search-box'>
                <input
                    type='text'
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type='submit'>Search</button>
            </form>
            <div className='search-results'>
                {searchResults.length > 0 && (
                    <ul>
                        {searchResults.map((title, index) => (
                            <li key={index}>{title}</li>
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
