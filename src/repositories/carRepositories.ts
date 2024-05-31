import { CarsModel } from "../models/CarsModel";

export const get = () => {
 return CarsModel.query();
}

// @ts-expect-error
export const create = (...args) => {
 // @ts-expect-error
 return CarsModel.query().create(args)
}

export const getById = (id: number) => {
 return CarsModel.query().findById(id)
}

//

//