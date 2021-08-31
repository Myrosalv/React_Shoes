import React, { useEffect } from "react";
import ReactDom from "react-dom";

function OnCheckoutPopup(props) {
    const {
        cart,
        cartItemsCount,
        currency,
        onTogglePopup,
        onRemoveAllProducts,
    } = props;

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => (document.body.style.overflow = "unset");
    });

    return ReactDom.createPortal(
        <div
            className="popup__bg"
            onClick={() => {
                onRemoveAllProducts();
                onTogglePopup();
            }}
        >
            <div className="popup" onClick={(event) => event.stopPropagation()}>
                <h1 className="text-styles text-styles--h1">
                    Checkout successful!
                </h1>
                <div className="checkout-popup">
                    <p className="checkout-popup__heading text-styles text-styles-p">
                        {"You have bought " +
                            cartItemsCount +
                            " " +
                            (cartItemsCount > 1 ? "items" : "item") +
                            " for a total of " +
                            cart.total.toFixed(2).replace("-0", "0") +
                            currency +
                            "."}
                    </p>
                    <button
                        className="btn btn--primary"
                        onClick={() => {
                            onRemoveAllProducts();
                            onTogglePopup();
                        }}
                    >
                        Dismiss
                    </button>
                </div>
                <button
                    className="btn btn--circular popup__close-btn"
                    onClick={() => {
                        onRemoveAllProducts();
                        onTogglePopup();
                    }}
                >
                    <img
                        src={process.env.PUBLIC_URL + "/icons/cancel.svg"}
                        alt="Cancel"
                    />
                </button>
            </div>
        </div>,
        document.getElementById("portal")
    );
}

export default OnCheckoutPopup;
