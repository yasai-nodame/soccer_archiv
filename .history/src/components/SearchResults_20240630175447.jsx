import React from 'react';
import SearchResults from './SearchResults';

const SearchResultsPage = () => {
    const location = useLocation();
    const { state } = location;

    if (!state || !state.searchResults) {
        return (
            <div>
                <h1>検索結果ページ</h1>
                <p>検索結果が見つかりませんでした。</p>
            </div>
        );
    }

    const { searchResults } = state;

    return (
        <div>
            <h1>検索結果ページ</h1>
            <SearchResults searchResults={searchResults} />
        </div>
    );
};

export default SearchResultsPage;
