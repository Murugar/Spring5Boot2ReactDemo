import * as React from "react";
import DateFormatter from "../utils/formatDate";


class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemClass: '',
            buttonClass: '',
            ratingClass: '',
        };

        this.toggleOpened = this.toggleOpened.bind(this);
        this.setRatingColor = this.setRatingColor.bind(this);
    }

    componentDidMount() {
        this.setRatingColor(this.props.item.rating);
    }

    componentWillReceiveProps(nextProps) {
        this.setRatingColor(nextProps.item.rating);
    }

    setRatingColor(rating) {
        this.setState({ratingClass: (rating > 7 ? 'good' : rating > 3 ? 'medium' : 'bad')});
    }

    toggleOpened() {
        let itemClass = this.state.itemClass;

        let buttonClass = this.state.buttonClass;

        itemClass = itemClass ? '' : 'opened';

        buttonClass = buttonClass ? '' : 'opened';

        this.setState({
            itemClass: itemClass,
            buttonClass: buttonClass
        });
    }

    render() {
        const item = this.props.item;
        const onEdit = this.props.onEdit;
        const onDelete = this.props.onDelete;
        return (
            <div className={"item " + this.state.itemClass}>
                <div className="flex-row">
                    <div className="full">
                        <div className="flex-row">
                            <div className="item-name">{item.name}</div>
                        </div>
                        <div className="item-date">{DateFormatter.formatToString(item.timestamp)}</div>
                    </div>
                    <div className="flex-row flex-end">
                        <div className={"item-rating " + this.state.ratingClass}>{item.rating}</div>
                        <div className="flex-col">
                            <button className="item-btn delete" onClick={() => onDelete(item)}><i
                                className="icon-trash-empty"/>
                            </button>
                            <button className="item-btn edit" onClick={() => onEdit(item)}><i className="icon-wrench"/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="item-desc-opener flex-row">
                    <div className="line"/>
                    <button className={"item-btn opener " + this.state.buttonClass} onClick={this.toggleOpened}><i
                        className="icon-down-open"/>
                    </button>
                    <div className="line"/>
                </div>
                <div className="item-description">{item.description}</div>
            </div>
        );
    }
}


export default Item;
