import * as React from "react";
import 'whatwg-fetch';
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";
import DateFormatter from "./utils/formatDate";
import SearchForm from "./components/SearchForm";

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            editing: false,
            searching: false,
            searchDataScheme: {
                name: "",
                sort: "timestamp",
                order: "ascending"
            },
            searchData: {
                name: "",
                sort: "timestamp",
                order: "ascending"
            },
            itemScheme: {
                name: "",
                description: "",
                rating: 0,
                timestamp: "",
                customTimestamp: false
            },
            currentItem: {
                name: "",
                description: "",
                rating: 0,
                timestamp: "",
                customTimestamp: false
            },
            items: []
        };


        this.onCurrentItemChange = this.onCurrentItemChange.bind(this);
        this.onCurrentItemSubmit = this.onCurrentItemSubmit.bind(this);
        this.onItemEditButtonClick = this.onItemEditButtonClick.bind(this);
        this.onItemDeleteButtonClick = this.onItemDeleteButtonClick.bind(this);
        this.onSearchFormChange = this.onSearchFormChange.bind(this);
        this.onSearchFormSubmit = this.onSearchFormSubmit.bind(this);
        this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
        this.onAddButtonClick = this.onAddButtonClick.bind(this);
        this.onItemFormExit = this.onItemFormExit.bind(this);
        this.onSearchFormExit = this.onSearchFormExit.bind(this);
        this.onCurrentItemReset = this.onCurrentItemReset.bind(this);
        this.onSearchDataReset = this.onSearchDataReset.bind(this);
        this.setItems = this.setItems.bind(this);

       
    }

    componentDidMount() {
        this.getItemsFromServer(this.setItems);
    }

    getItemsFromServer(callback) {
        fetch("/api/items?name=" + this.state.searchData.name + "&sort=" + this.state.searchData.sort + "&order=" + this.state.searchData.order)
            .then(res => res.json())
            .then(json => callback(json))
            .catch(e => console.log(e));
    }

    postItemToServer(item, callback) {
        fetch("api/items", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(res => callback(res))
            .catch(e => console.error(e));
    }

    deleteItemOnServer(item, callback) {
        fetch("api/items", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(res => callback(res))
            .catch(e => console.error(e));
    }

    onCurrentItemChange(e) {
        const target = e.target;
        const name = target.name;
        const value = (target.type === 'checkbox') ? target.checked : target.value;

        this.setState({
            currentItem: {...this.state.currentItem, [name]: value}
        });

    }

    onCurrentItemReset(e) {
        e.preventDefault();
        this.setCurrentItem({...this.state.itemScheme, id: this.state.currentItem.id});
    }

    onCurrentItemSubmit(e) {
        e.preventDefault();
        let item = this.state.currentItem;
        item = {
            ...item,
            timestamp: item.customTimestamp && item.timestamp ? new Date(item.timestamp).getTime() : new Date().getTime()
        };

        this.postItemToServer(item, () => this.getItemsFromServer(this.setItems));

        this.setCurrentItem(this.state.itemScheme);

        this.setState({editing: false});
    }

    onItemEditButtonClick(item) {
        this.setCurrentItem({...item, timestamp: DateFormatter.formatToLocal(item.timestamp), customTimestamp: true});
        this.setState({editing: true});
        console.log(this.state.currentItem);
    }

    onItemDeleteButtonClick(item) {
        this.deleteItemOnServer(item, () => this.getItemsFromServer(this.setItems));
    }

    setCurrentItem(item) {
        this.setState({currentItem: item});
    }

    setItems(items) {
        this.setState({items: items});
    }

    onSearchFormChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        this.setState({searchData: {...this.state.searchData, [name]: value}});
    }

    onSearchFormSubmit(e) {
        e.preventDefault();
        this.getItemsFromServer(this.setItems);
        this.setState({searching: false});
    }

    onSearchButtonClick(e) {
        this.setState({searching: true});
    }

    onAddButtonClick(e) {
        this.setState({editing: true, currentItem: this.state.itemScheme});
    }

    onSearchFormExit(e) {
        this.setState({searching: false});
    }

    onItemFormExit(e) {
        this.setState({editing: false});
    }

    onSearchDataReset(e) {
        e.preventDefault();
        this.setState({searchData: this.state.searchDataScheme});
    }

    render() {
        return (
            <div className="center">
                <div className="content-wrapper">
                    <ItemList items={this.state.items}
                              onEdit={this.onItemEditButtonClick}
                              onDelete={this.onItemDeleteButtonClick}/>
                </div>
                <div className="bottom-menu-wrapper">
                    <div className="bottom-menu">
                        <button className="bottom-btn"
                                onClick={this.onSearchButtonClick}>
                            <i className="icon-search"/>
                        </button>
                        <button className="bottom-btn"
                                onClick={this.onAddButtonClick}>
                            <i className="icon-plus"/>
                        </button>
                    </div>
                </div>

                {this.state.searching &&
                <div className="modal">
                    <div className="modal-content search-box">
                        <button className="item-btn exit"
                                onClick={this.onSearchFormExit} n>
                            <i className="icon-cancel"/>
                        </button>
                        <SearchForm data={this.state.searchData}
                                    onChange={this.onSearchFormChange}
                                    onSubmit={this.onSearchFormSubmit}
                                    onReset={this.onSearchDataReset}/>
                    </div>
                </div>}

                {this.state.editing &&
                <div className="modal">
                    <div className="modal-content save-box">
                        <button className="item-btn exit"
                                onClick={this.onItemFormExit}>
                            <i className="icon-cancel"/>
                        </button>
                        <ItemForm item={this.state.currentItem}
                                  onChange={this.onCurrentItemChange}
                                  onSubmit={this.onCurrentItemSubmit}
                                  onReset={this.onCurrentItemReset}/>
                    </div>
                </div>}
            </div>
        );
    }
}


export default App;