import React from "react";
import { Link } from "react-router-dom";

function CategorieCard(props) {
    const { category, image, link } = props;

    return (
        <div className="category-card">
            <Link
                to={`${
                    process.env.PUBLIC_URL +
                    link.toLowerCase().split(/[_\s]/).join("-")
                }`}
            >
                <img
                    className="category-card__image"
                    src={process.env.PUBLIC_URL + "/img/" + image + ".jpg"}
                    alt={category + " image"}
                />
                <div className="category-card__name-bg" />
                <p className="category-card__name">{category}</p>
            </Link>
        </div>
    );
}

export default CategorieCard;
