import React from "react";

import ProductCardGrid from "./ProductCardGrid";
import OnBuyPopup from "./OnBuyPopup";

function ProductsOverview(props) {
    const {
        products,
        favorites,
        category,
        currency,
        displayedProducts,
        productsSortBy,
        productsFilterSliderValues,
        popupOnBuyProduct,
        buyProductInterface,
        onIncrementProduct,
        onFavorite,
        onSort,
        onSliderChange,
        onTogglePopup,
        onInterfaceIncrementQuantity,
        onInterfaceDecrementQuantity,
        onInterfaceReset,
        onInterfaceSelectChange,
    } = props;

    return (
        <div>
            <h1 className="text-styles text-styles--h1">{category}</h1>
            <ProductCardGrid
                products={products.filter((product) =>
                    displayedProducts.includes(product.id)
                )}
                favorites={favorites}
                currency={currency}
                productsSortBy={productsSortBy}
                productsFilterSliderValues={productsFilterSliderValues}
                onTogglePopup={onTogglePopup}
                onFavorite={onFavorite}
                onSort={onSort}
                onSliderChange={onSliderChange}
            />
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

export default ProductsOverview;
