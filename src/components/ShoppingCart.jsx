import React, { Component } from "react";

import CartItem from "./CartItem";
import OnCheckoutPopup from "./OnCheckoutPopup";
import EmptyState from "./EmptyState";

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
        };
    }

    handleTogglePopup = () => {
        this.setState({
            showPopup: !this.state.showPopup,
        });
    };

    render() {
        const {
            products,
            cart,
            cartItemsCount,
            favorites,
            currency,
            onIncrementProduct,
            onDecrementProduct,
            onRemoveProduct,
            onRemoveAllProducts,
        } = this.props;
        const { showPopup } = this.state;
        const { items, total } = cart;

        const btnText =
            favorites.length > 0
                ? "See your favorites"
                : "Browse in categories";
        const btnLink = favorites.length > 0 ? "/favorites" : "/categories";

        return items.length === 0 ? (
            <EmptyState
                heading="Your cart is empty."
                description="Add items to your cart to have them displayed here."
                buttonText={btnText}
                buttonLink={btnLink}
            />
        ) : (
            <div className="shopping-cart">
                <h1 className="text-styles text-styles--h1">Shopping Cart</h1>
                <div className="shopping-cart__card-checkout-container">
                    <div className="shopping-cart__items-checkout-container">
                        <div className="shopping-cart__items-count-remove-container">
                            <h2 className="text-styles text-styles--h2">
                                {cartItemsCount}{" "}
                                {cartItemsCount > 1 ? "Items" : "Item"}
                            </h2>
                            <button
                                className="btn btn--icon-text"
                                onClick={() => onRemoveAllProducts()}
                            >
                                <span>Remove all items</span>
                                <img
                                    alt="Remove item"
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/icons/trash.svg"
                                    }
                                />
                            </button>
                        </div>
                        <div className="shopping-cart__item-card-container">
                            {items.map((item) => {
                                return (
                                    <CartItem
                                        key={item.cartID}
                                        item={item}
                                        product={
                                            products.filter(
                                                (p) => p.id === item.productID
                                            )[0]
                                        }
                                        image={
                                            products.filter(
                                                (p) => p.id === item.productID
                                            )[0]["image-small"]
                                        }
                                        currency={currency}
                                        onIncrementProduct={onIncrementProduct}
                                        onDecrementProduct={onDecrementProduct}
                                        onRemoveProduct={onRemoveProduct}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="shopping-cart__checkout">
                        <div className="shopping-cart__h2">
                            <h2 className="text-styles text-styles--h2">
                                Checkout
                            </h2>
                        </div>
                        <div className="shopping-cart__totals-btn-container">
                            <div className="shopping-cart__totals-container">
                                <div className="shopping-cart__total-value-container">
                                    <h3 className="shopping-cart__total text-styles text-styles--h3">
                                        Subtotal:
                                    </h3>
                                    <p>
                                        {total.toFixed(2).replace("-0", "0") +
                                            currency}
                                    </p>
                                </div>
                                <div className="shopping-cart__total-value-container">
                                    <h3 className="shopping-cart__total text-styles text-styles--h3">
                                        Delivery:
                                    </h3>
                                    <p>
                                        {(0).toFixed(2).replace("-0", "0") +
                                            currency}
                                    </p>
                                </div>
                                <div className="shopping-cart__total-value-container">
                                    <h3 className="shopping-cart__total text-styles text-styles--h3">
                                        Total:
                                    </h3>
                                    <p className="shopping-cart__total">
                                        {total.toFixed(2).replace("-0", "0") +
                                            currency}
                                    </p>
                                </div>
                            </div>

                            <button
                                className="btn btn--primary shopping-cart__buy-btn"
                                onClick={() => {
                                    this.handleTogglePopup();
                                }}
                            >
                                Buy {cartItemsCount}{" "}
                                {cartItemsCount > 1 ? "Items" : "Item"}
                            </button>
                        </div>

                        {showPopup ? (
                            <OnCheckoutPopup
                                cart={cart}
                                cartItemsCount={cartItemsCount}
                                currency={currency}
                                showPopup={showPopup}
                                onTogglePopup={this.handleTogglePopup}
                                onRemoveAllProducts={onRemoveAllProducts}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default ShoppingCart;
