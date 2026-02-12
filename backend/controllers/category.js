const { errorHandler } = require('../helpers/dbErrorHandler');
const Category = require('../models/category');

exports.create = async (req, res) => {
    try {
        const savedCategory = await Category.create(req.body);
        res.json({ savedCategory });
    }
    catch (err) {
        return res.status(400).json({
            error: errorHandler(err)
        })
    }
}

exports.updateCategory = async (req, res) => {
    console.log("Updating", req.category);

    const category = req.category;
    category.name = req.body.name;
    category.save()
        .then((data) => {
            res.json({ data, "message": "updated successfully!" });
        })
        .catch((err) => {
            console.log("Updating errr", err);

            return res.status(400).json({
                error: err
            })
        })
}

exports.read = (req, res) => {
    if (req.category) {
        res.status(200).json({ data: req.category });
    } else {
        res.status(400).json({
            error: "Category Not found"
        })
    }

}

exports.remove = (req, res) => {
    try {
        Category.findByIdAndDelete(req.params.categoryId);
        res.json({
            "message": "Category deleted successfully"
        })
    }
    catch (err) {
        res.status(400).json({
            error: "Error while deleting category"
        })
    }
}

exports.categoryById = (req, res, next) => {
    const categoryPromise = Category.findById(req.params.categoryId).exec();

    categoryPromise.then((data) => {
        req.category = data;
        next();
    })
        .catch((err) => {
            console.log("err", err);
            return res.status(400).json({
                error: "Category not found'"
            })
        })
}

exports.listAll = async (req, res) => {
    try {
        console.log("all ee--->");

        const all = await Category.find().exec();
        res.json(all);
    }
    catch (err) {
        console.log("ee--->", err);
        return res.status(400).json({
            error: err
        })
    }

}
