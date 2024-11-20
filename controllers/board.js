import { BoardModel } from "../models/board.js";
import { addBoardValidator} from "../validators/board.js";

export const addBoards = async (req,res,next)=> {
    try {
        //validate the input
        const{error,value} = addBoardValidator.validate(req.body);
        if(error){
            return res.status(422).json(error)
        }
        // write input into database
        await BoardModel.create(value);

        res.status(201).json('Board has been added')
    } catch (error) {
        next(error);
        
    }
}

export const getOneBoard = async (req,res,next)=>{
    try {
        const board = await BoardModel.findById(req.params.id)
            if(!board){
                return res.status(422).json('Board not found')
        }
        
        res.status(201).json(board)
    } catch (error) {
        next(error);
        
    }
}

export const getAllBoards = async (req,res,next)=>{
    try {
        const { filter="{}", sort="{}", limit=0, skip=0} = req.query;

        const boards = await BoardModel
        .find(JSON.parse(filter))
        .sort(JSON.parse(sort))
        .limit(limit)
        .skip(skip);

        res.status(200).json(boards);
    } catch (error) {
        next(error);
        
    }
}