import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.scss";

import Navbar from "./components/Navbar";
import Content from "./components/Content";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import products from "./data/products.json";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: products,
            cart: {
                items: [],
                total: 0,
            },
            favorites: [],
            categories: [],
            currency: "UAN",
            displayedProducts: products.map((product) => product.id),
            productsSortBy: "default",
            productsFilterSliderValues: [0, 180],
            popupOnBuyProduct: { showPopup: false, product: null },
            buyProductInterface: { quantity: 1, selectedValue: null },
            containerScrollPosition: [0, 0, 0, 0, 0, 0],
        };
    }

    componentDidMount() {
        const products = [...this.state.products];
        products.forEach((product) => {
            if (product.sale !== null) {
                product.categories.push("Sale");
            }
        });

        this.setState({ products: products });

        const categorieSet = [
            ...new Set(
                [].concat.apply(
                    [],
                    this.state.products.map((item) => item.categories)
                )
            ),
        ];

        const categories = categorieSet.map((item) => {
            return {
                name: item,
                productCount: products.filter((product) =>
                    product.categories.includes(item)
                ).length,
            };
        });

        const categoriesSorted = categories.sort((prev, next) =>
            prev.productCount < next.productCount ? 1 : -1
        );

        this.setState({ categories: categoriesSorted });

        if (localStorage.getItem("cart") !== null) {
            this.setState({ cart: JSON.parse(localStorage.getItem("cart")) });
        }

        if (localStorage.getItem("favorites") !== null) {
            this.setState({
                favorites: JSON.parse(localStorage.getItem("favorites")),
            });
        }
    }

    handleIncrementProduct = (
        product,
        selectedValue = product.sizes[0],
        quantity = 1
    ) => {
        const cart = { ...this.state.cart };

        const cartItems = [...this.state.cart.items];

        if (cartItems.filter((p) => p.productID === product.id).length === 0) {
            cartItems.push({
                cartID: cartItems.length,
                productID: product.id,
                quantity: 0,
                selectedValue: selectedValue,
            });
        } else if (
            cartItems.filter((p) => p.productID === product.id).length > 0 &&
            cartItems
                .filter(
                    (p) =>
                        p.productID === product.id &&
                        p.selectedValue === selectedValue
                )
                .map((p) => p.selectedValue)[0] !== selectedValue
        ) {
            cartItems.push({
                cartID: cartItems.length,
                productID: product.id,
                quantity: 0,
                selectedValue: selectedValue,
            });
        } else {
            const index = cartItems.indexOf(
                cartItems.filter(
                    (item) =>
                        item.productID === product.id &&
                        item.selectedValue === selectedValue
                )[0]
            );
            cartItems[index] = {
                ...this.state.cart.items[index],
            };
        }

        const index = cartItems.indexOf(
            cartItems.filter(
                (item) =>
                    item.productID === product.id &&
                    item.selectedValue === selectedValue
            )[0]
        );

        cartItems[index].quantity += quantity;

        cart.items = cartItems;

        let cartTotal = this.state.cart.total;

        cartTotal += (product.sale ? product.sale : product.price) * quantity;

        cart.total = cartTotal;

        this.setState({ cart: cart }, () => {
            localStorage.setItem("cart", JSON.stringify(this.state.cart));
        });
    };

    handleDecrementProduct = (product, selectedValue) => {
        const cart = { ...this.state.cart };

        const cartItems = [...this.state.cart.items];

        const index = cartItems.indexOf(
            cartItems.filter(
                (item) =>
                    item.productID === product.id &&
                    item.selectedValue === selectedValue
            )[0]
        );

        if (cartItems[index].quantity === 1) {
            cartItems.splice(index, 1);
        } else {
            cartItems[index].quantity--;
        }


        cart.items = cartItems;

        let cartTotal = this.state.cart.total;

        cartTotal -= product.sale ? product.sale : product.price;

        cart.total = cartTotal;


        this.setState({ cart: cart }, () => {
            localStorage.setItem("cart", JSON.stringify(this.state.cart));
        });
    };

    handleRemoveProduct = (product, selectedValue) => {
        const cart = { ...this.state.cart };

        const cartItems = [...this.state.cart.items];


        const index = cartItems.indexOf(
            cartItems.filter(
                (item) =>
                    item.productID === product.id &&
                    item.selectedValue === selectedValue
            )[0]
        );

        const quantity = cartItems[index].quantity;

        cartItems.splice(index, 1);

        cart.items = cartItems;

        let cartTotal = this.state.cart.total;

        cartTotal -= (product.sale ? product.sale : product.price) * quantity;

        cart.total = cartTotal;

        this.setState({ cart: cart }, () => {
            localStorage.setItem("cart", JSON.stringify(this.state.cart));
        });
    };

    handleRemoveAllProducts = () => {

        const cart = { ...this.state.cart };

        const cartItems = [];

        cart.items = cartItems;

        const cartTotal = 0;


        cart.total = cartTotal;

        this.setState({ cart: cart }, () => {
            localStorage.setItem("cart", JSON.stringify(this.state.cart));
        });
    };

    handleFavorite = (product) => {
        const favorites = [...this.state.favorites];

        if (favorites.filter((p) => p.productID === product.id).length !== 1) {
            favorites.push({
                productID: product.id,
            });
        } else {
            const index = favorites.indexOf(
                favorites.filter((item) => item.productID === product.id)[0]
            );
            favorites.splice(index, 1);
        }

        this.setState({ favorites: favorites }, () => {
            localStorage.setItem(
                "favorites",
                JSON.stringify(this.state.favorites)
            );
        });
    };

    handleSort = (sortBy) => {
        const products = [...this.state.products];
        const productsSortBy = sortBy;

        if (productsSortBy === "default") {
            products.sort((prev, next) => {
                if (prev.id > next.id) return 1;
                else if (prev.id < next.id) return -1;
                else return 0;
            });
        } else {
            let sortValue;

            if (productsSortBy === "ascending") sortValue = 1;
            else if (productsSortBy === "descending") sortValue = -1;

            products.sort((prev, next) => {
                if (
                    (prev.sale ? prev.sale : prev.price) >
                    (next.sale ? next.sale : next.price)
                )
                    return sortValue;
                else if (
                    (prev.sale ? prev.sale : prev.price) <
                    (next.sale ? next.sale : next.price)
                )
                    return -sortValue;
                else return 0;
            });
        }

        this.setState({
            products: products,
            productsSortBy: productsSortBy,
        });
    };

    handleSliderChange = (sliderValues) => {
        let products = [...this.state.products];
        const productsFilterSliderValues = sliderValues;

        const displayedProducts = products
            .filter(
                (product) =>
                    (product.sale ? product.sale : product.price) >=
                    productsFilterSliderValues[0] &&
                    (product.sale ? product.sale : product.price) <=
                    productsFilterSliderValues[1]
            )
            .map((product) => product.id);

        this.setState({
            displayedProducts: displayedProducts,
            productsFilterSliderValues: productsFilterSliderValues,
        });
    };

    handleTogglePopup = (product = null) => {
        this.setState({
            popupOnBuyProduct: {
                showPopup: !this.state.popupOnBuyProduct.showPopup,
                product: product,
            },
        });
    };

    handleInterfaceIncrementQuantity = () => {
        const buyProductInterface = { ...this.state.buyProductInterface };

        buyProductInterface.quantity++;

        this.setState({ buyProductInterface: buyProductInterface });
    };

    handleInterfaceDecrementQuantity = () => {
        const buyProductInterface = { ...this.state.buyProductInterface };

        if (buyProductInterface.quantity > 1) buyProductInterface.quantity--;

        this.setState({ buyProductInterface: buyProductInterface });
    };

    handleInterfaceReset = () => {
        const buyProductInterface = { ...this.state.buyProductInterface };

        buyProductInterface.quantity = 1;
        buyProductInterface.selectedValue = null;

        this.setState({ buyProductInterface: buyProductInterface });
    };

    handleInterfaceSelectChange = (value) => {
        const buyProductInterface = { ...this.state.buyProductInterface };

        buyProductInterface.selectedValue = value;

        this.setState({ buyProductInterface: buyProductInterface });
    };

    handleStoreScrollPosition = (scrollContainerID, scrollPos) => {
        const containerScrollPosition = [...this.state.containerScrollPosition];

        containerScrollPosition[scrollContainerID] = scrollPos;

        this.setState({ containerScrollPosition: containerScrollPosition });
    };

    render() {
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
        } = this.state;

        return (
            <div className="App">
                <BrowserRouter>
                    <ScrollToTop />
                    <Navbar
                        cartItemsCount={cart.items
                            .map((item) => item.quantity)
                            .reduce((prev, next) => prev + next, 0)}
                    />
                    <Content
                        products={products}
                        cart={cart}
                        favorites={favorites}
                        categories={categories}
                        currency={currency}
                        displayedProducts={displayedProducts}
                        productsSortBy={productsSortBy}
                        productsFilterSliderValues={productsFilterSliderValues}
                        popupOnBuyProduct={popupOnBuyProduct}
                        buyProductInterface={buyProductInterface}
                        containerScrollPosition={containerScrollPosition}
                        onIncrementProduct={this.handleIncrementProduct}
                        onDecrementProduct={this.handleDecrementProduct}
                        onRemoveProduct={this.handleRemoveProduct}
                        onRemoveAllProducts={this.handleRemoveAllProducts}
                        onFavorite={this.handleFavorite}
                        onSort={this.handleSort}
                        onSliderChange={this.handleSliderChange}
                        onTogglePopup={this.handleTogglePopup}
                        onInterfaceIncrementQuantity={
                            this.handleInterfaceIncrementQuantity
                        }
                        onInterfaceDecrementQuantity={
                            this.handleInterfaceDecrementQuantity
                        }
                        onInterfaceReset={this.handleInterfaceReset}
                        onInterfaceSelectChange={
                            this.handleInterfaceSelectChange
                        }
                        onStoreScrollPosition={this.handleStoreScrollPosition}
                    />
                    <Footer />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
