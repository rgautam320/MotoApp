import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { Slider } from "@material-ui/core";

import MetaData from "../../HOCS/MetaData";
import Card from "../../Components/Product/Card";
import { Loader } from "../../Utils/Loader";
import { getAllProducts } from "../../Data/reducers/product.reducer";

const Products = ({ location }) => {
	const dispatch = useDispatch();
	const alert = useAlert();

	const categories = ["Laptop", "Mobile", "AC", "Fridge", "TV"];

	const { products, page, loading, error, filteredProductCount } = useSelector((state) => state.product);

	const [keyword, setKeyword] = useState(location?.search?.split("?search=")[1] || "");
	const [currentPage, setCurrentPage] = useState(1);
	const [value, setValue] = useState([0, 99999]);
	const [category, setCategory] = useState("");
	const [rating, setRating] = useState(0);

	useEffect(() => {
		if (error) {
			alert.error(error);
		}
		const payload = {
			keyword: keyword,
			currentPage: currentPage,
			price: value,
			category: category,
			rating: rating,
		};
		window.scrollTo(0, 0);
		dispatch(getAllProducts(payload));
	}, [dispatch, keyword, currentPage, alert, error, value, category, rating]);

	return (
		<>
			<MetaData title="Moto App | Products" />
			<div className="container">
				<div className="products_products">
					<h1 className="heading products__heading">Products</h1>
					<input className="products__search" type="text" placeholder="Search Something" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
					<hr />
					{loading ? (
						<Loader />
					) : (
						<>
							<div className="row">
								<div className="col-md-3 col-sm-6 col-12">
									<h3 className="sub-heading pt-4 text-center">Apply Filters</h3>
									<div className="products__priceFilter">
										<h5 className="pb-3">Price Range</h5>
										<Slider value={value} onChange={(e, price) => setValue(price)} valueLabelDisplay="auto" aria-labelledby="range-slider" min={0} max={99999} />
										<div className="d-flex justify-content-around">
											<span>Min: {value[0]}</span>
											<span>Max: {value[1]}</span>
										</div>
									</div>
									<div className="products__category">
										<h5>Categories</h5>
										{categories?.map((val, ind) => (
											<button key={ind} onClick={() => setCategory(val)}>
												{val}
											</button>
										))}
									</div>
									<div className="products__ratingFilter">
										<h5>Ratings</h5>
										<Slider value={rating} onChange={(e, rate) => setRating(rate)} valueLabelDisplay="auto" aria-labelledby="continuous-slider" min={0} max={5} />
										<p className="text-center">
											Rating {">="} {rating}
										</p>
									</div>
								</div>
								<div className="col-md-9 col-sm-6 col-12">
									<div className="row my-4">
										<h4 className="py-2">{filteredProductCount} Products Available</h4>
										{products?.map((product, ind) => (
											<Card product={product} key={ind} styles="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 my-3" />
										))}
									</div>
									{filteredProductCount > page && (
										<div className="row">
											<div className="product__pagination">
												<Pagination
													activePage={currentPage}
													itemsCountPerPage={page}
													totalItemsCount={filteredProductCount}
													onChange={(e) => setCurrentPage(e)}
													nextPageText="Next"
													prevPageText="Prev"
													firstPageText="First"
													lastPageText="Last"
													itemClass="page-item"
													linkClass="page-link"
													activeClass="pageItemActive"
													activeLinkClass="products__active"
												/>
											</div>
										</div>
									)}
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default Products;
