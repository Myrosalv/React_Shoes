import React from "react";
import { useEffect } from "react";

function BuyProductInterface(props) {
    const {
        product,
        favorites,
        image,
        currency,
        buyProductInterface,
        popupOnBuyProduct,
        onFavorite,
        onIncrementProduct,
        onInterfaceIncrementQuantity,
        onInterfaceDecrementQuantity,
        onInterfaceSelectChange,
        onInterfaceReset,
        onTogglePopup,
    } = props;
    const { price, sale, sizes } = product;
    const { quantity, selectedValue } = buyProductInterface;

    useEffect(() => {
        if (selectedValue === null) onInterfaceSelectChange(sizes[0]);
    });

    return (
        <div className="buy-interface">
            <div className="buy-interface__image">
                <div>
                    <img
                        src={process.env.PUBLIC_URL + "/img/" + image + ".jpg"}
                        alt="Product"
                    />
                </div>
            </div>
            <div className="buy-interface__main-container">
                <div className="buy-interface__label-btn-container">
                    <p className="buy-interface__label text-styles text-styles--label">
                        Price:
                    </p>
                    <div className="btn btn--container">
                        {sale ? (
                            <p className="buy-interface__price--sale">
                                {sale + currency}
                            </p>
                        ) : null}
                        {sale ? (
                            <p className="buy-interface__price--strike-through">
                                {price + currency}
                            </p>
                        ) : (
                            <p className="buy-interface__price">
                                {price + currency}
                            </p>
                        )}
                    </div>
                </div>
                <div className="buy-interface__container buy-interface__label-btn-container">
                    <div className="buy-interface__form-btn">
                        <p className="buy-interface__label text-styles text-styles--label">
                            Size:
                        </p>
                        <div className="btn btn--select">
                            <select
                                onChange={(event) =>
                                    onInterfaceSelectChange(event.target.value)
                                }
                                defaultValue={selectedValue}
                            >
                                {sizes.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    "/icons/down-arrow.svg"
                                }
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="buy-interface__form-btn">
                        <p className="buy-interface__label text-styles text-styles--label">
                            Quantity:
                        </p>
                        <div className="btn btn--plus-minus">
                            <div>
                                <button onClick={onInterfaceDecrementQuantity}>
                                    <img
                                        alt="Decrement Quantity"
                                        src={
                                            process.env.PUBLIC_URL +
                                            "/icons/remove.svg"
                                        }
                                    />
                                </button>
                                <p>{quantity}</p>
                                <button onClick={onInterfaceIncrementQuantity}>
                                    <img
                                        alt="Increment Quantity"
                                        src={
                                            process.env.PUBLIC_URL +
                                            "/icons/plus.svg"
                                        }
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <button
                        className="btn btn--circular"
                        onClick={() => onFavorite(product)}
                    >
                        {favorites
                            .map((item) => item.productID)
                            .includes(product.id) ? (
                            <img
                                alt="Remove Favorite"
                                src={
                                    process.env.PUBLIC_URL +
                                    "/icons/heart-full.svg"
                                }
                            />
                        ) : (
                            <img
                                alt="Add Favorite"
                                src={
                                    process.env.PUBLIC_URL + "/icons/heart.svg"
                                }
                            />
                        )}
                    </button>
                </div>

                <button
                    className="btn btn--primary buy-interface__label-btn-container buy-interface__buy-btn"
                    onClick={() => {
                        onIncrementProduct(product, selectedValue, quantity);
                        onInterfaceReset();
                        if (popupOnBuyProduct.showPopup) {
                            onTogglePopup();
                        }
                    }}
                >
                    Add {quantity} {quantity > 1 ? "items" : "item"} to cart
                </button>
            </div>
        </div>
    );
}

export default BuyProductInterface;
