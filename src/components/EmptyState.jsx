import React from "react";
import { Link } from "react-router-dom";

function EmptyState(props) {
    const { heading, description, buttonText, buttonLink } = props;

    return (
        <div className="empty-state">
            <div className="empty-state__inner-container">
                <h1 className="empty-state__heading text-styles text-styles--h1">
                    {heading}
                </h1>
                <p className="empty-state__description">{description}</p>
                {(buttonLink || buttonText) === null ? null : (
                    <Link to={process.env.PUBLIC_URL + buttonLink}>
                        <button className="btn btn--primary empty-state__btn">
                            {buttonText}
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default EmptyState;
