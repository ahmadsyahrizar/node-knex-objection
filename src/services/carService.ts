import { create, get, getById } from "../repositories/carRepositories";

export const getAllCars = () => {
 return get();
}

// @ts-expect-error
export const createCar = (...params) => {
 return create(params)
}

export const getCarById = (id: number) => {
 return getById(id)
}


// 

//