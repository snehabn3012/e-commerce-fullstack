const { errorHandler } = require('../helpers/dbErrorHandler');
const Product = require('../models/product');
const { formidable } = require('formidable')
const _ = require('lodash');
const fs = require('fs');


exports.productById = async (req, res, next, id) => {
    try {
        const product = await Product.findById(id).exec();
        if (!product) {
            throw 'Product not found'
        }
        console.log("product", product);
        req.product = product;
        next();
    }

    catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}

exports.read = (req, res) => {
    // Send image seperately bcz images are huge
    req.product.photo = undefined;
    res.json(req.product);
}

exports.create = (req, res) => {
    try {
        const form = formidable({ multiples: true });
        form.keepExtensions = true;

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: 'Image could not be uploaded'
                })
            }

            // Iterate over the fields
            const _fields = {};
            Object.keys(fields).forEach(key => {
                _fields[key] = fields[key][0];
            })

            //check for all fields
            const { name, description, price, category, quantity, shipping } = _fields

            if (!name || !description || !price || !category || !quantity || !shipping) {
                return res.status(400).json({
                    error: "All fields are required"
                });
            }

            Product.create(_fields).then((createdProduct) => {
                if (files.photo) {

                    console.log("FILES PHOTO: ", files.photo[0].filepath);
                    if (files.photo.size > 1000000) { // 1kb = 1000, 1mb = 1000000
                        return res.status(400).json({
                            error: "Image should be less than 1mb in size",
                        });
                    }
                    // Read the file and save it to the database
                    try {
                        createdProduct.photo.data = fs.readFileSync(files.photo[0].filepath); // Correct property is 'filepath'
                        createdProduct.photo.contentType = files.photo[0].mimetype; // Correct property is 'mimetype'
                    } catch (error) {
                        console.log("error", error)
                        return res.status(500).json({
                            error: "Failed to read the file.",
                        });
                    }
                }
                createdProduct.save()
                    .then((result) => {
                        res.json({ result, data: "Successfully created" });
                    })
                    .catch((err) => {
                        throw err;
                    })
            })

        })
    }
    catch (err) {
        console.log('Product creation error: ', err);
        return res.status(500).json({
            error: 'An unexpected error occurred during product creation.',
        });
    }
}

exports.remove = (req, res) => {
    console.log("req", req);
    try {
        Product.findByIdAndDelete(req.params.productId);
        res.json({
            "message": "Product deleted successfully"
        })

    }
    catch (err) {
        console.log("delete err", err);
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
}

exports.update = async (req, res) => {
    try {
        const form = formidable({ multiples: true });
        form.keepExtensions = true;

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: 'Image could not be uploaded'
                })
            }

            // Iterate over the fields
            const _fields = {};
            Object.keys(fields).forEach(key => {
                _fields[key] = fields[key][0];
            })

            //check for all fields
            const { name, description, price, category, quantity, shipping } = _fields

            if (!name || !description || !price || !category || !quantity || !shipping) {
                return res.status(400).json({
                    error: "All fields are required"
                });
            }

            let product = req.product;
            product = _.extend(product, _fields);

            if (files.photo) {
                console.log("FILES PHOTO: ", files.photo);
                if (files.photo.size > 1000000) { // 1kb = 1000, 1mb = 1000000
                    return res.status(400).json({
                        error: "Image should be less than 1mb in size",
                    });
                }
                // Read the file and save it to the database
                try {
                    createdProduct.photo.data = fs.readFileSync(files.photo.filepath); // Correct property is 'filepath'
                    createdProduct.photo.contentType = files.photo.mimetype; // Correct property is 'mimetype'
                } catch (error) {
                    return res.status(500).json({
                        error: "Failed to read the file.",
                    });
                }
            }

            product.save()
                .then((result) => {
                    res.json({ result });
                })
                .catch((err) => {
                    throw err;
                })


        })
    }
    catch (err) {
        console.log("product update err===>", err);
        return res.status(400).json({
            error: errorHandler(err)
        })
    }
}

/**
 * sell / arrival
 * show the most popular products
 * By sell - /products?sortBy=sold&order=desc&limit=4
 * 
 * show new arrival seperately
 * By arrival - /products?sortBy=createdAt&order=desc&limit=4
 * 
 * if no params are sent then all products are returned
 */
exports.list = (req, res) => {
    let order = req.query.order || 'desc';
    let sortBy = req.query.sortBy || '_id';
    let limit = req.query.limit || 6;

    const allProductsPromise = Product.find().select("-photo")
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec();

    allProductsPromise
        .then((data) => {
            res.status(200).send({ data });
        })
        .catch((err) => {
            console.log("err", err);
            res.status(400).json({
                error: errorHandler(err)
            })
        })
};

/**
 * It will find the products based on the req product category
 * Other products that has the same category, will be returned
 */
exports.listRelated = (req, res) => {
    let limit = req.query.limit || 6;

    const relatedProductsPromise = Product.find({ _id: { $ne: req.product }, category: req.product.category })
        .select("-photo")
        .populate('category', '_id name')
        .limit(limit)
        .exec();

    relatedProductsPromise
        .then((products) => {
            res.status(200).send({ products });
        })
        .catch((err) => {

            return res.status(400).json({
                error: err || "Product not found"
            })
        })
};

exports.listCategories = (req, res) => {
    Product.distinct("category", {}).then((data) => {
        res.json({ data })
    })
        .catch((err) => {
            return res.status(400).json({
                error: err || "Product categories not found"
            })
        })
}

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

exports.listBySearch = (req, res) => {
    let order = req.body.order || "desc";
    let sortBy = req.body.sortBy || "_id";
    let limit = req.body.limit || 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    const productsPromise = Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec();

    productsPromise
        .then((data) => {
            res.json({
                size: data.length,
                data
            });
        })
        .catch((err) => {
            return res.status(400).json({
                error: err || "Products not found"
            });
        })
};

exports.photo = (req, res, next) => {
    if (req.product?.photo?.data) {
        res.set('Content-Type', req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}

exports.listSearch = (req, res) => {
    // create query object to hold search value and category value
    const query = {};
    // assign search value to query.name
    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: 'i' }
        // asseign category value to query.category 
        if (req.query.category && req.query.category !== 'All') {
            query.category = req.query.category;
        }
        // find the prodducts based on query object with 2 properties
        // Search and category
        Product.find(query)
            .select("-photo")
            .then((products) => {
                res.json(products)
            })
            .catch((err) => {
                return res.status(400).json({
                    error: err
                })
            })
    }

}

exports.decreaseQuantity = (req, res, next) => {
    let bulkOps = req.body.order.products.map((item) => {
        return {
            updateOne: {
                filter: {
                    _id: item._id
                },
                update: {
                    $inc:
                    {
                        quantity: -item.count,
                        sold: +item.count
                    }
                }
            }
        }
    })

    Product.bulkWrite(bulkOps, {})
        .then((data) => {
            next();
        })
        .catch((err) => {
            return res.status(400).json({
                error: err
            })
        })
}