import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Home";
import Categories from "./Categories";
import ShoppingCart from "./ShoppingCart";
import ProductPage from "./ProductPage";
import ProductsOverview from "./ProductsOverview";
import EmptyState from "./EmptyState";

function Content(props) {
    const {
        products,
        cart,
        favorites,
        categories,
        currency,
        displayedProducts,
        productsSortBy,
        productsFilterSliderValues,
        popupOnBuyProduct,
        buyProductInterface,
        containerScrollPosition,
        onIncrementProduct,
        onDecrementProduct,
        onFavorite,
        onRemoveProduct,
        onRemoveAllProducts,
        onSort,
        onSliderChange,
        onTogglePopup,
        onInterfaceIncrementQuantity,
        onInterfaceDecrementQuantity,
        onInterfaceReset,
        onInterfaceSelectChange,
        onStoreScrollPosition,
    } = props;

    return (
        <div className="content">
            <Switch>
                <Route
                    exact
                    path={process.env.PUBLIC_URL + "/"}
                    component={() => (
                        <Home
                            products={products}
                            categories={categories}
                            favorites={favorites}
                            currency={currency}
                            popupOnBuyProduct={popupOnBuyProduct}
                            buyProductInterface={buyProductInterface}
                            containerScrollPosition={containerScrollPosition}
                            onTogglePopup={onTogglePopup}
                            onFavorite={onFavorite}
                            onIncrementProduct={onIncrementProduct}
                            onInterfaceIncrementQuantity={
                                onInterfaceIncrementQuantity
                            }
                            onInterfaceDecrementQuantity={
                                onInterfaceDecrementQuantity
                            }
                            onInterfaceReset={onInterfaceReset}
                            onInterfaceSelectChange={onInterfaceSelectChange}
                            onStoreScrollPosition={onStoreScrollPosition}
                        />
                    )}
                />
                <Route
                    exact
                    path={process.env.PUBLIC_URL + "/cart"}
                    component={() => (
                        <ShoppingCart
                            products={products}
                            cart={cart}
                            cartItemsCount={cart.items
                                .map((item) => item.quantity)
                                .reduce((prev, next) => prev + next, 0)}
                            favorites={favorites}
                            currency={currency}
                            onIncrementProduct={onIncrementProduct}
                            onDecrementProduct={onDecrementProduct}
                            onRemoveProduct={onRemoveProduct}
                            onRemoveAllProducts={onRemoveAllProducts}
                        />
                    )}
                />
                <Route
                    exact
                    path={process.env.PUBLIC_URL + "/favorites"}
                    component={() =>
                        favorites.length === 0 ? (
                            <EmptyState
                                heading="You have no favorite items yet."
                                description="Mark items as favorites to have them displayed here."
                                buttonText="Browse in categories"
                                buttonLink="/categories"
                            />
                        ) : (
                            <ProductsOverview
                                category="Favorites"
                                products={products.filter((product) =>
                                    favorites
                                        .map((item) => item.productID)
                                        .includes(product.id)
                                )}
                                favorites={favorites}
                                currency={currency}
                                displayedProducts={displayedProducts}
                                productsSortBy={productsSortBy}
                                productsFilterSliderValues={
                                    productsFilterSliderValues
                                }
                                popupOnBuyProduct={popupOnBuyProduct}
                                buyProductInterface={buyProductInterface}
                                onIncrementProduct={onIncrementProduct}
                                onFavorite={onFavorite}
                                onSort={onSort}
                                onSliderChange={onSliderChange}
                                onTogglePopup={onTogglePopup}
                                onInterfaceIncrementQuantity={
                                    onInterfaceIncrementQuantity
                                }
                                onInterfaceDecrementQuantity={
                                    onInterfaceDecrementQuantity
                                }
                                onInterfaceReset={onInterfaceReset}
                                onInterfaceSelectChange={
                                    onInterfaceSelectChange
                                }
                            />
                        )
                    }
                />
                <Route
                    exact
                    path={process.env.PUBLIC_URL + "/categories"}
                    component={() => (
                        <Categories
                            products={products}
                            categories={categories}
                        />
                    )}
                />
                <Route
                    path={process.env.PUBLIC_URL + "/categories/:category"}
                    render={(routerProps) => (
                        <ProductsOverview
                            category={
                                categories
                                    .map((category) => category.name)
                                    .filter(
                                        (c) =>
                                            c
                                                .toLowerCase()
                                                .split(/[_\s]/)
                                                .join("-") ===
                                            routerProps.match.params.category
                                    )[0]
                            }
                            products={products.filter((product) =>
                                product.categories.includes(
                                    categories
                                        .map((category) => category.name)
                                        .filter(
                                            (c) =>
                                                c
                                                    .toLowerCase()
                                                    .split(/[_\s]/)
                                                    .join("-") ===
                                                routerProps.match.params
                                                    .category
                                        )[0]
                                )
                            )}
                            favorites={favorites}
                            currency={currency}
                            displayedProducts={displayedProducts}
                            productsSortBy={productsSortBy}
                            productsFilterSliderValues={
                                productsFilterSliderValues
                            }
                            popupOnBuyProduct={popupOnBuyProduct}
                            buyProductInterface={buyProductInterface}
                            onIncrementProduct={onIncrementProduct}
                            onFavorite={onFavorite}
                            onSort={onSort}
                            onSliderChange={onSliderChange}
                            onTogglePopup={onTogglePopup}
                            onInterfaceIncrementQuantity={
                                onInterfaceIncrementQuantity
                            }
                            onInterfaceDecrementQuantity={
                                onInterfaceDecrementQuantity
                            }
                            onInterfaceReset={onInterfaceReset}
                            onInterfaceSelectChange={onInterfaceSelectChange}
                        />
                    )}
                />
                <Route
                    exact
                    path={process.env.PUBLIC_URL + "/products"}
                    component={() => (
                        <ProductsOverview
                            category="All Products"
                            products={products}
                            favorites={favorites}
                            currency={currency}
                            displayedProducts={displayedProducts}
                            productsSortBy={productsSortBy}
                            productsFilterSliderValues={
                                productsFilterSliderValues
                            }
                            popupOnBuyProduct={popupOnBuyProduct}
                            buyProductInterface={buyProductInterface}
                            onIncrementProduct={onIncrementProduct}
                            onFavorite={onFavorite}
                            onSort={onSort}
                            onSliderChange={onSliderChange}
                            onTogglePopup={onTogglePopup}
                            onInterfaceIncrementQuantity={
                                onInterfaceIncrementQuantity
                            }
                            onInterfaceDecrementQuantity={
                                onInterfaceDecrementQuantity
                            }
                            onInterfaceReset={onInterfaceReset}
                            onInterfaceSelectChange={onInterfaceSelectChange}
                        />
                    )}
                />
                <Route
                    path={process.env.PUBLIC_URL + "/products/id=:productID"}
                    render={(routerProps) => (
                        <ProductPage
                            product={
                                products.filter(
                                    (p) =>
                                        p.id.toString() ===
                                        routerProps.match.params.productID.toString()
                                )[0]
                            }
                            currency={currency}
                            favorites={favorites}
                            products={products}
                            buyProductInterface={buyProductInterface}
                            popupOnBuyProduct={popupOnBuyProduct}
                            containerScrollPosition={containerScrollPosition}
                            onFavorite={onFavorite}
                            onIncrementProduct={onIncrementProduct}
                            onInterfaceIncrementQuantity={
                                onInterfaceIncrementQuantity
                            }
                            onInterfaceDecrementQuantity={
                                onInterfaceDecrementQuantity
                            }
                            onInterfaceReset={onInterfaceReset}
                            onInterfaceSelectChange={onInterfaceSelectChange}
                            onTogglePopup={onTogglePopup}
                            onStoreScrollPosition={onStoreScrollPosition}
                        />
                    )}
                />
            </Switch>
        </div>
    );
}

export default Content;
