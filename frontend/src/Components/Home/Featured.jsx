import React from "react";

import Card from "../Shared/Card";

const Featured = ({ products, loading }) => {
    return (
        <section id="featured">
            <div className="featured__featured py-5">
                <h1 className="heading featured__heading pb-4 mb-5">Featured Products</h1>

                <div className="featured__products container px-3">
                    <div className="row">
                        {products.map((product, ind) => (
                            <Card
                                key={ind}
                                product={product}
                                styles="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 my-3"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Featured;
