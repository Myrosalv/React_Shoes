import React from "react";
import { NavLink } from "react-router-dom";

const closeNavbar = () => {
    const checkbox = document.getElementById("hamburger");
    if (checkbox.checked) checkbox.checked = false;
};

function Navbar(props) {
    return (
        <nav className="nav">
            <div className="nav__links">
                <input
                    className="nav__hamburger-checkbox"
                    id="hamburger"
                    type="checkbox"
                />
                <label className="nav__hamburger-icon" htmlFor="hamburger">
                    <img
                        className="nav__hamburger-img"
                        src={
                            process.env.PUBLIC_URL + "/icons/left-alignment.svg"
                        }
                        alt=""
                    />
                </label>

                <NavLink
                    onClick={closeNavbar}
                    className="nav__logo-link"
                    to={process.env.PUBLIC_URL + "/"}
                >
                    <span className="nav__logo">
                        sneakr<span>.</span>
                    </span>
                </NavLink>
                <div className="nav__links nav__text-links">
                    <NavLink
                        onClick={closeNavbar}
                        to={process.env.PUBLIC_URL + "/"}
                    >
                        <span className="nav__link">Home</span>
                    </NavLink>
                    <NavLink
                        onClick={closeNavbar}
                        to={process.env.PUBLIC_URL + "/categories"}
                    >
                        <span className="nav__link">Categories</span>
                    </NavLink>
                    <NavLink
                        onClick={closeNavbar}
                        to={process.env.PUBLIC_URL + "/products"}
                    >
                        <span className="nav__link">Products</span>
                    </NavLink>
                    <NavLink
                        onClick={closeNavbar}
                        to={process.env.PUBLIC_URL + "/categories/sale"}
                    >
                        <span className="nav__link">Sale</span>
                    </NavLink>
                </div>
            </div>
            <div className="nav__icons">
                <NavLink
                    onClick={closeNavbar}
                    to={process.env.PUBLIC_URL + "/favorites"}
                >
                    <img
                        className="nav__icon"
                        src={process.env.PUBLIC_URL + "/icons/heart.svg"}
                        alt="Favorites"
                    />
                </NavLink>

                <NavLink
                    onClick={closeNavbar}
                    to={process.env.PUBLIC_URL + "/cart"}
                >
                    <div className="nav__cart">
                        <img
                            className="nav__icon"
                            src={process.env.PUBLIC_URL + "/icons/cart.svg"}
                            alt="Cart"
                        />
                        <div className="nav__item-indicator">
                            <p>
                                {props.cartItemsCount < 100
                                    ? props.cartItemsCount
                                    : 99}
                            </p>
                        </div>
                    </div>
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;
