import React from 'react';
import ReactPaginate from 'react-paginate';

const MatchesPage = ({ matches }) => {
    const perPage = 5;

    // ページが変更されたときのハンドラー
    const handlePageChange = ({ selected }) => {
        console.log('Selected page:', selected);
    };

    return (
        <div className="page-container">
            <div className="content-container">
                {/* ここにページのメインコンテンツを配置 */}
                {matches.map((match, index) => (
                    <div key={index}>
                        {/* マッチデータの表示 */}
                        <img src={match.thumbnail} alt="" />
                        <h3>{match.category}</h3>
                        <h2>{match.title}</h2>
                    </div>
                ))}
            </div>
            <div className="pagination-container">
                {/* ここにページネーションコンポーネントを配置 */}
                <ReactPaginate
                    pageCount={Math.ceil(matches.length / perPage)}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageChange}
                    containerClassName='pagination'
                    activeClassName='active'
                    disableInitialCallback={true}
                    previousLabel={"← 前へ"}
                    nextLabel={"次へ →"}
                />
            </div>
        </div>
    );
};

export default MatchesPage;
