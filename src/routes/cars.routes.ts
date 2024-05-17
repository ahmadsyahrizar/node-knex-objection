import{Router, Request, Response} from "express";
import { v4 as uuidv4 } from 'uuid';
import { cars } from "../__data_mocks__/cars";
import filterCars from "../utils/filter";
import pool from "../db";

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

// GET cars;
router.get("/", async (_req: Request, res: Response)=> {
   const result = await pool.query("SELECT id, name, availability FROM cars");
   const data = result.rows;

  res.status(200).json({
    message: "OK",
   cars: data
  });
});

// GET specific car.
router.get("/:id", async (req:Request, res:Response) => {
  const getId: number = Number(req.params.id);
  const query = await pool.query(`SELECT * FROM cars WHERE id = ${getId}`);

  const result = query.rows[0];
  // const carById = filterCars(cars, getId);

  res.status(200).json({
   car: result
  });
});

// UPDATE / EDIT.
router.put("/:id", (req: Request, res: Response) => {
 const getId: number = Number(req.params.id);
 const {
  name, price, startRent, finishRent
 } = req.body;
 const carById = filterCars(cars, getId);

 const updatedCarById  = {...carById,
  id: getId,
  name,
  price,
  startRent,
  finishRent,
  createdAt: '05/14/2024',
  updatedAt: '05/14/2024'
 };

 const filterUpdatedCar = cars.filter(({id})=> id !== getId);
 filterUpdatedCar.push(updatedCarById);

 // mutable = merubah origin data kita.
 // immutable  = tidak merubah origin data kita.

 console.log({filterUpdatedCar});
 res.status(204).json({
  status: "OK",
  message: "data updated succesfully",
  cars: filterUpdatedCar
 });
});

//  delete
router.delete("/:id", (req: Request, res: Response)=> {
  const getId = Number(req.params.id);
  const filterById = cars.filter(({id})=> id !== getId );

  res.status(200).json({
    status: "OK",
    message: "Item successfully deleted",
    cars: filterById
  });
});


// create
router.post("/create", async (req: Request, res:Response) => {

  const idCar = Math.floor(Math.random() * 100);
    const {name, startRent, finishRent, availability} = req.body;

    const query  = await pool.query("INSERT INTO cars (id, name, start_date, end_date, availability) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
       [idCar, name, startRent, finishRent, availability]
  );

  const createdCar = query.rows;
    
    res.status(201).json({
      status: "OK",
      message: "Data successfully created!",
      data: createdCar
    });

});


export default router;