import{Router, Request, Response} from "express";
import { v4 as uuidv4 } from 'uuid';
import { cars } from "../__data_mocks__/cars";
import filterCars from "../utils/filter";
import { createCar, deleteCar, getCarById, getCars, updateCar } from "../controllers/CarController";

// import pool from "../db";

interface ArrList {
 id: number;
 name: string;
 price: string;
 startRent: string;
 finishRent: string;
 createdAt: string;
 updatedAt: string;
}

const router = Router();


// /v1/cars -> controller -> model -> views 
router.get("/", getCars);
router.get("/:id", getCarById);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);
router.post("/create", createCar);


export default router;