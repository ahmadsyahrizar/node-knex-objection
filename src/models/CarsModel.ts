import { Model, ModelObject } from "objection";

export class CarsModel extends Model {
  id!: number;
  name!: string;
  price!: string;
  start_date!: string;
  end_date!: string;
  availability!: boolean;

  static get tableName(){
   return "cars"
  }
}

export type Cars = ModelObject<CarsModel>