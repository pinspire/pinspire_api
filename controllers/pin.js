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
            user: req.params.id
        });
        res.status(201).json('Pin was created')
    } catch (error) {
        next(error);
    }
};

export const getPins = async (req, res, next) => {
    try {
        //getting query parameters for search filters
        const { filter = "{}", sort = "{}", limit = 0, skip = 0 } = req.query;

        //fetch pins from the database with the filter
        
        const pins = await PinModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip);
        
            res.status(201).json(pins)
        } catch (error) {
            next(error);
    
        }
    };

        // if (title) {
        //     //regex for case-insensitive title search
        //     filter.title = { $regex: title, $options: "i" };
        // }

        // if (category) {
        //     filter.category = category;
        // }

        // if (price) {
        //     filter.price = price;
        // }

        //return response
       

export const getOnePin = async (req, res, next) => {
    try {
        const{id}=req.params;
        //get pin by id from database
        const pin = await PinModel.findById(id);
        // if (!pin) {
        //     return res.status(404).json({
        //         message: "Pin not found"
        //     });
        // }
        res.json(pin);
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
            user: req.id
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
        res.status(201).json('Pin was updated')
    } catch (error) {
        next(error);

    }
};

export const deletePin = async (req, res, next) => {
    try {
        const deletedPin = await PinModel.findOneAndDelete(

            {
                _id: req.params.id,
                user: req.id
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
