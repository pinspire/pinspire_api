import { CategoryModel } from "../models/category.js";
import { addCategoryValidator } from "../validators/category.js";

export const addCategories = async (req, res, next) => {
    try {
        //validate category input
        const { error, value } = addCategoryValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        //write input to the database
        await CategoryModel.create(value);

        res.status(201).json('Category has been added');
    } catch (error) {
        next(error);

    }
}

export const getOneCategory = async (req, res, next) => {
    try {
        const category = await CategoryModel.findById(req.params.id);
        if (!category) {
            return res.status(404).json('Image not found');
        }
        res.status(200).json(category);
    } catch (error) {
        next(error);

    }
}

export const getAllCategories = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 0, skip = 0 } = req.query;

        //fetch input from the database
        const categories = await CategoryModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip);


        //return response
        res.status(200).json(categories);
    } catch (error) {
        next(error);

    }
}