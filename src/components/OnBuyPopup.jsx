import React, { useEffect } from "react";
import ReactDom from "react-dom";

import BuyProductInterface from "./BuyProductInterface";

function OnBuyPopup(props) {
    const {
        product,
        favorites,
        currency,
        buyProductInterface,
        popupOnBuyProduct,
        onFavorite,
        onIncrementProduct,
        onTogglePopup,
        onInterfaceIncrementQuantity,
        onInterfaceDecrementQuantity,
        onInterfaceReset,
        onInterfaceSelectChange,
    } = props;


    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => (document.body.style.overflow = "unset");
    });

    return ReactDom.createPortal(
        <div className="popup__bg" onClick={onTogglePopup}>
            <div className="popup" onClick={(event) => event.stopPropagation()}>
                <h1 className="text-styles text-styles--h1">{product.name}</h1>
                <div>
                    <BuyProductInterface
                        product={product}
                        favorites={favorites}
                        image={product["image-large"]}
                        currency={currency}
                        buyProductInterface={buyProductInterface}
                        popupOnBuyProduct={popupOnBuyProduct}
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
                    />
                </div>
                <button
                    className="btn btn--circular popup__close-btn"
                    onClick={onTogglePopup}
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

export default OnBuyPopup;
