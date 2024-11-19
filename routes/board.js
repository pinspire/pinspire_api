import { Router } from "express";

import{ addBoards, getAllBoards, getOneBoard} from "../controllers/board.js";


const boardRouter = Router();
//define routes
boardRouter.post("/boards", addBoards);

boardRouter.get("/boards", getAllBoards);

boardRouter.get("/boards/:id", getOneBoard);

export default boardRouter;
