import React from "react";

import ProductCardScrollContainer from "./ProductCardScrollContainer";
import OnBuyPopup from "./OnBuyPopup";

function Home(props) {
    const {
        categories,
        products,
        favorites,
        currency,
        popupOnBuyProduct,
        buyProductInterface,
        containerScrollPosition,
        onTogglePopup,
        onFavorite,
        onIncrementProduct,
        onInterfaceIncrementQuantity,
        onInterfaceDecrementQuantity,
        onInterfaceReset,
        onInterfaceSelectChange,
        onStoreScrollPosition,
    } = props;

    return (
        <div>
            <h1 className="text-styles text-styles--h1">
                Browse in Categories
            </h1>

            {categories.map((category, index) => {
                if (category.name !== null && index < 5) {
                    return (
                        <div key={index} className="home__scroll-container">
                            <ProductCardScrollContainer
                                id={index + 1}
                                category={category.name}
                                label={category.name}
                                products={products}
                                favorites={favorites}
                                currency={currency}
                                scrollPosition={
                                    containerScrollPosition[index + 1]
                                }
                                onTogglePopup={onTogglePopup}
                                onFavorite={onFavorite}
                                onStoreScrollPosition={onStoreScrollPosition}
                            />
                        </div>
                    );
                }
                return null;
            })}

            {popupOnBuyProduct.showPopup ? (
                <OnBuyPopup
                    product={popupOnBuyProduct.product}
                    favorites={favorites}
                    currency={currency}
                    buyProductInterface={buyProductInterface}
                    popupOnBuyProduct={popupOnBuyProduct}
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

export default Home;
