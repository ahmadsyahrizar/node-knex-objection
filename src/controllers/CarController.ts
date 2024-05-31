import { Request, Response } from "express";
import { CarsModel } from "../models/CarsModel";
import filterCars from "../utils/filter";
import { cars } from "../__data_mocks__/cars";
import { getAllCars } from "../services/carService";

export const getCars = async (_req: Request, res: Response) => {
    const resp = await getAllCars();
 //  const result = await pool.query("SELECT id, name, availability FROM cars");
 //  const data = result.rows;

  res.status(200).json({
    message: "OK",
    cars: resp
  });

 // res.render(path.join(__dirname, 'index'));
//  const data = { cars: JSON.parse(JSON.stringify(cars))}
//  console.log(data)
 
//  res.render('./index', data); 
}

export const getCarById = async (req: Request, res: Response) => {
 try {
  const getId: number = Number(req.params.id);
  const car = await CarsModel.query().findById(Number(getId)).throwIfNotFound();
  // const query = await pool.query(`SELECT * FROM cars WHERE id = ${getId}`);
  // const result = query.rows[0];
  res.status(200).json({
   car
  });

 } catch (error) {
  res.status(404).json({
   message: "Data Not Found"
  });
 }
}

export const updateCar = async (req: Request, res: Response) => {
 const getId: number = Number(req.params.id);
 const {
  name, price, startRent, finishRent
 } = req.body;
 const carById = filterCars(cars, getId);

 const updatedCarById = {
  ...carById,
  id: getId,
  name,
  price,
  startRent,
  finishRent,
  createdAt: '05/14/2024',
  updatedAt: '05/14/2024'
 };

 const filterUpdatedCar = cars.filter(({ id }) => id !== getId);
 filterUpdatedCar.push(updatedCarById);

 // mutable = merubah origin data kita.
 // immutable  = tidak merubah origin data kita.

 console.log({ filterUpdatedCar });
 res.status(204).json({
  status: "OK",
  message: "data updated succesfully",
  cars: filterUpdatedCar
 });
}

export const deleteCar = (req: Request, res: Response)=> {
 const getId = Number(req.params.id);
 const filterById = cars.filter(({id})=> id !== getId );

 res.status(200).json({
   status: "OK",
   message: "Item successfully deleted",
   cars: filterById
 });
}

export const createCar =  async (req: Request, res:Response) => {

 const idCar = Math.floor(Math.random() * 100);
   const {name, startRent, finishRent, availability} = req.body;

 //   const query  = await pool.query("INSERT INTO cars (id, name, start_date, end_date, availability) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
 //      [idCar, name, startRent, finishRent, availability]
 // );

 // const createdCar = query.rows;
   
   res.status(201).json({
     status: "OK",
     message: "Data successfully created!",
     // data: createdCar
   });

}