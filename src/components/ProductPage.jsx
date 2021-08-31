import React from "react";

import BuyProductInterface from "./BuyProductInterface";
import ProductCardScrollContainer from "./ProductCardScrollContainer";
import OnBuyPopup from "./OnBuyPopup";

function ProductPage(props) {
    const {
        product,
        favorites,
        products,
        currency,
        buyProductInterface,
        popupOnBuyProduct,
        containerScrollPosition,
        onFavorite,
        onIncrementProduct,
        onInterfaceIncrementQuantity,
        onInterfaceDecrementQuantity,
        onInterfaceReset,
        onInterfaceSelectChange,
        onTogglePopup,
        onStoreScrollPosition,
    } = props;
    const { description, materials, cleaning, categories } = product;

    return (
        <div>
            <h1 className="text-styles text-styles--h1">{product.name}</h1>
            <div className="product-page__buy-interface-container">
                <BuyProductInterface
                    product={product}
                    favorites={favorites}
                    image={product["image-large"]}
                    currency={currency}
                    buyProductInterface={buyProductInterface}
                    popupOnBuyProduct={popupOnBuyProduct}
                    onFavorite={onFavorite}
                    onIncrementProduct={onIncrementProduct}
                    onInterfaceIncrementQuantity={onInterfaceIncrementQuantity}
                    onInterfaceDecrementQuantity={onInterfaceDecrementQuantity}
                    onInterfaceReset={onInterfaceReset}
                    onInterfaceSelectChange={onInterfaceSelectChange}
                />
            </div>
            <div className="product-page__info">
                <h2 className="text-styles text-styles--h2 product-page__h2">
                    More information
                </h2>
                <div className="product-page__info-grid">
                    <div className="product-page__info-element">
                        <h3 className="text-styles text-styles--h3">
                            Description:
                        </h3>
                        <ul>
                            {description.map((item) => {
                                return (
                                    <li key={description.indexOf(item)}>
                                        - {item}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="product-page__info-element">
                        <h3 className="text-styles text-styles--h3">
                            Materials:
                        </h3>
                        <p>{materials}</p>
                    </div>
                    <div className="product-page__info-element">
                        <h3 className="text-styles text-styles--h3">
                            How to clean:
                        </h3>
                        <p>{cleaning}</p>
                    </div>
                </div>
            </div>
            <ProductCardScrollContainer
                id={0}
                category={categories[0]}
                label="Similar Products"
                products={products.filter((p) => p !== product)}
                favorites={favorites}
                currency={currency}
                scrollPosition={containerScrollPosition[0]}
                onTogglePopup={onTogglePopup}
                onFavorite={onFavorite}
                onStoreScrollPosition={onStoreScrollPosition}
            />
            {popupOnBuyProduct.showPopup ? (
                <OnBuyPopup
                    product={popupOnBuyProduct.product}
                    favorites={favorites}
                    currency={currency}
                    buyProductInterface={buyProductInterface}
                    onFavorite={onFavorite}
                    onIncrementProduct={onIncrementProduct}
                    onTogglePopup={onTogglePopup}
                    onInterfaceIncrementQuantity={onInterfaceIncrementQuantity}
                    onInterfaceDecrementQuantity={onInterfaceDecrementQuantity}
                    onInterfaceReset={onInterfaceReset}
                    onInterfaceSelectChange={onInterfaceSelectChange}
                />
            ) : null}
        </div>
    );
}

export default ProductPage;
