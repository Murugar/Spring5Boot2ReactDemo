import * as React from 'react';

const SearchForm = ({data, onChange, onSubmit, onReset}) => (
    <form onSubmit={onSubmit}>
        <div className="flex-col">
            <input name="name" placeholder="Search by name..." type="text" value={data.name} onChange={onChange}/>
        </div>
        <div className="flex-row flex-between">
            <div className="search-box">
                Sort by:
                <select name="sort" defaultValue="timestamp" value={data.sort} onChange={onChange}>
                    <option value="timestamp">date</option>
                    <option value="rating">rating</option>
                </select>
            </div>
            <div className="search-box">
                Order:
                <select name="order" defaultValue="descending" value={data.order} onChange={onChange}>
                    <option value="descending">descending</option>
                    <option value="ascending">ascending</option>

                </select>
            </div>
            <div>
                <button className="form-btn" onClick={onReset}><i className="icon-ccw"/></button>
                <button className="form-btn" type="submit" value="Submit"><i className="icon-search"/></button>
            </div>
        </div>
    </form>
);

export default SearchForm;