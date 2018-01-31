import * as React from "react";

const ItemForm = ({item, onChange, onSubmit, onReset}) => (
    <form onSubmit={onSubmit}>
        <div className="flex-col">
            <input name="name" placeholder="Enter name..." type="text" value={item.name} onChange={onChange}/>
        </div>
        <div className="flex-col">
            <textarea className="input-area" name="description" placeholder="Enter description..." maxLength="400" value={item.description} onChange={onChange}/>
        </div>
        <div className="flex-row flex-between">
            <div>
                Rate:
                <input name="rating" type="number" min="0" max="10" placeholder="0" step="1" value={item.rating} onChange={onChange}/>
            </div>
            <div className="flex-row flex-center">
                Custom date:<input type="checkbox" name="customTimestamp" checked={item.customTimestamp} onChange={onChange}/>
                {item.customTimestamp && <input type="datetime-local" name="timestamp" value={item.timestamp} onChange={onChange}/>}
            </div>
        </div>
        <div className="flex-row flex-end">
            <button className="form-btn" onClick={onReset}><i className="icon-ccw"/></button>
            <button className="form-btn" type="submit" value="Submit"><i className="icon-ok"/></button>
        </div>
    </form>
);

export default ItemForm;


