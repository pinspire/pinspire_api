import { PinModel } from "../models/pin.js";
import { addPinValidator, updatePinValidator } from "../validators/pin.js";



export const addPin = async (req, res, next) => {
    try {
        //validate user input
        const { error, value } = addPinValidator.validate({
            ...req.body,
            image: req.file?.filename
        });
        //write pins to the database
        if (error) {
            return res.status(422).json(error);
        }
        //respond to request
        await PinModel.create({
            ...value,
            user: req.auth.id
        });
        res.status(201).json('Pin was created')
    } catch (error) {
        next(error);
    }
};

export const getPins = async (req, res, next) => {
    try {
        //getting query parameters for search filters
        const { title, category, price, limit = 0, skip = 0 } = req.query;

        //build a filter object based on the query parameters
        let filter = {};
        if (title) {
            //regex for case-insensitive title search
            filter.title = { $regex: title, $options: "i" };
        }

        if (category) {
            filter.category = category;
        }

        if (price) {
            filter.price = price;
        }

        //fetch pins from the database with the filter
        const pins = await PinModel
            .find(filter)
            .limit(limit)
            .skip(skip);

        //return response
        res.status(201).json('Pin was created')
    } catch (error) {
        next(error);

    }
};

export const getOnePin = async (req, res, next) => {
    try {
        const userCon = await PinModel.findById(req.params.id);
        if (!userCon) {
            return res.status(404).json({
                message: "Pin not found"
            });
        }
        res.status(201).json('Pin was created')
    } catch (error) {
        next(error);
    }
};

export const updatePin = async (req, res, next) => {
    try {
        //validate the input
        const { error, value } = updatePinValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        //write updated pins to the database
        const updatePin = await PinModel.findOneAndUpdate({
            _id: req.params.id,
            user: req.auth.id
        },
            value,
            { new: true }
        );

        if (!updatePin) {
            return res.status(404).json({
                message: "Pin not found"
            });
        }
        //respond to request
        res.status(201).json('Pin was created')
    } catch (error) {
        next(error);

    }
};

export const deletePin = async (req, res, next) => {
    try {
        const deletedPin = await PinModel.findOneAndDelete(

            {
                _id: req.params.id,
                user: req.auth.id
            },
        );
        if (!deletedPin) {
            return res.status(404).json({
                message: "Pin not found"
            });
        }
        res.status(201).json('Pin was deleted successfully')
    } catch (error) {
        next(error);

    }
};
