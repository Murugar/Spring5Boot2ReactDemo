import * as React from 'react';
import Item from "./Item";

const ItemList = ({items, onEdit, onDelete}) => (
    <div className="item-list">
        {items.map(item => <Item key={item.id} item={item} onEdit={onEdit} onDelete={onDelete}/>)}
    </div>
);

export default ItemList;