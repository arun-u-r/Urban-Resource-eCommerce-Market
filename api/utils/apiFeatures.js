class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  //Search product by name
  search() {
    let keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword, //Regular expression to perform a pattern match of the field
            $options: "i", // case insensitive
          },
        }
      : {};

    this.query.find({ ...keyword });
    return this;
  }

  //filter by category
  filter() {
    const queryStringCopy = { ...this.queryString };
    //before
    // console.log(queryStringCopy);

    //removing fields from query
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((field) => delete queryStringCopy[field]);
    //after
    // console.log(queryStringCopy);

    let queryString = JSON.stringify(queryStringCopy);
    //converting gt to $$gt etc..
    queryString = queryString.replace(/\b(gt|gte|lt|lte)/g,match  => `$${match}`); 

    this.query.find(JSON.parse(queryString));

    return this;
  }

  //Pagiantion
  paginate(resultPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

export default APIFeatures;
