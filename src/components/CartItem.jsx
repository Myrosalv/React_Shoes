import React from "react";
import { Link } from "react-router-dom";

function CartItem(props) {
    const {
        item,
        product,
        image,
        currency,
        onIncrementProduct,
        onDecrementProduct,
        onRemoveProduct,
    } = props;
    const { quantity, selectedValue } = item;
    const { id, name, price, sale } = product;

    return (
        <div className="cart-item-card">
            <Link to={`${process.env.PUBLIC_URL}/products/id=${id}`}>
                <div className="cart-item-card__image">
                    <div>
                        <img
                            src={
                                process.env.PUBLIC_URL +
                                "/img/" +
                                image +
                                ".jpg"
                            }
                            alt="Product"
                        />
                    </div>
                </div>
            </Link>

            <div className="cart-item-card__body">
                <Link to={`${process.env.PUBLIC_URL}/products/id=${id}`}>
                    <p className="cart-item-card__name">{name}</p>
                </Link>
                <div className="cart-item-card__price-size-container">
                    <div className="cart-item-card__price">
                        {sale ? (
                            <p className="cart-item-card__price--sale">
                                {sale + currency}
                            </p>
                        ) : null}
                        {sale ? (
                            <p className="cart-item-card__price--strike-through">
                                {price + currency}
                            </p>
                        ) : (
                            <p className="cart-item-card__price">
                                {price + currency}
                            </p>
                        )}
                    </div>
                    <p className="cart-item-card__size">
                        Size: {selectedValue}
                    </p>
                </div>
            </div>
            <button
                className="btn btn--circular cart-item-card__remove-btn"
                onClick={() => onRemoveProduct(product, selectedValue)}
            >
                <img
                    alt="Remove item"
                    src={process.env.PUBLIC_URL + "/icons/trash.svg"}
                />
            </button>
            <div className="btn btn--plus-minus cart-item-card__plus-minus-btn">
                <div>
                    <button
                        onClick={() =>
                            onDecrementProduct(product, selectedValue)
                        }
                    >
                        <img
                            alt="Decrement Quantity"
                            src={process.env.PUBLIC_URL + "/icons/remove.svg"}
                        />
                    </button>
                    <p>{quantity}</p>
                    <button
                        onClick={() =>
                            onIncrementProduct(product, selectedValue)
                        }
                    >
                        <img
                            alt="Increment Quantity"
                            src={process.env.PUBLIC_URL + "/icons/plus.svg"}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
