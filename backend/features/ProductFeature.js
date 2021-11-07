class ProductFeature {
	constructor(query, queryStr) {
		this.query = query;
		this.queryStr = queryStr;
	}

	search() {
		let keyword = this.queryStr.keyword;
		if (keyword) {
			keyword = {
				name: {
					$regex: this.queryStr.keyword,
					$options: "i",
				},
			};
			this.query = this.query.find({ ...keyword });
		} else {
			this.query = this.query.find({});
		}
		return this;
	}

	filter() {
		let queryCopy = this.queryStr;

		let queryStr = JSON.stringify(queryCopy);
		queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

		this.query = this.query.find(JSON.parse(queryStr));

		return this;
	}

	pagination(page) {
		const currentPage = Number(this.queryStr.page) || 1;
		const skip = page * (currentPage - 1) || 0;
		this.query = this.query.limit(page).skip(skip);

		return this;
	}
}

export default ProductFeature;
