import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";

import MetaData from "../HOCS/MetaData";
import Card from "../Components/Product/Card";
import Loader from "../Utils/Loader";
import { getAllProducts } from "../Data/reducers/product.reducer";

const Products = () => {
	const dispatch = useDispatch();
	const alert = useAlert();

	const { products, productsCount, page, loading, error } = useSelector((state) => state.product);

	const [keyword, setKeyword] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const dynamicProductsCount = keyword.trim() ? products?.length : productsCount;

	useEffect(() => {
		if (error) {
			alert.error(error);
		}
		const payload = {
			keyword,
			currentPage,
		};
		dispatch(getAllProducts(payload));
	}, [dispatch, keyword, currentPage, alert, error]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
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
								</div>
								<div className="col-md-9 col-sm-6 col-12">
									<div className="row my-4">
										<h4 className="py-2">{dynamicProductsCount} Products Available</h4>
										{products?.map((product, ind) => (
											<Card product={product} key={ind} style="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-11 my-3" />
										))}
									</div>

									{productsCount > page && (
										<div className="row">
											<div className="product__pagination">
												<Pagination
													activePage={currentPage}
													itemsCountPerPage={page}
													totalItemsCount={dynamicProductsCount}
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
