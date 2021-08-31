import React from "react";
import { Link } from "react-router-dom";

function ProductCard(props) {
    const { product, favorites, currency, onTogglePopup, onFavorite } = props;
    const { id, name, price, sale } = product;
    const image = product["image-small"];

    return (
        <>
            <div className="product-card">
                <Link to={`${process.env.PUBLIC_URL}/products/id=${id}`}>
                    <img
                        className="product-card__image"
                        src={process.env.PUBLIC_URL + "/img/" + image + ".jpg"}
                        alt="Product"
                    />
                    <p className="product-card__name">{name}</p>
                    <div className="product-card__price-sale-container">
                        {sale ? (
                            <p className="product-card__price--sale">
                                {sale + currency}
                            </p>
                        ) : null}
                        {sale ? (
                            <p className="product-card__price--strike-through">
                                {price + currency}
                            </p>
                        ) : (
                            <p className="product-card__price">
                                {price + currency}
                            </p>
                        )}
                    </div>
                </Link>
                <button
                    className="btn btn--circular product-card__btn product-card__btn--buy"
                    onClick={() => onTogglePopup(product)}
                >
                    <img
                        alt="Buy"
                        src={process.env.PUBLIC_URL + "/icons/cart.svg"}
                    />
                </button>
                <button
                    className="btn btn--circular product-card__btn product-card__btn--favorite"
                    onClick={() => onFavorite(product)}
                >
                    {favorites
                        .map((item) => item.productID)
                        .includes(product.id) ? (
                        <img
                            alt="Remove Favorite"
                            src={
                                process.env.PUBLIC_URL + "/icons/heart-full.svg"
                            }
                        />
                    ) : (
                        <img
                            alt="Add Favorite"
                            src={process.env.PUBLIC_URL + "/icons/heart.svg"}
                        />
                    )}
                </button>
            </div>
        </>
    );
}

export default ProductCard;
