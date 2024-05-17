import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("cars").del();

    // Inserts seed entries
    await knex("cars").insert([
        { id: 1, name: "TOYOTA",price: "Rp200.000;", start_date: "2024/05/20", end_date: "2024/05/26", availability: true  },
        { id: 2, name: "HYUNDAI",price: "Rp200.000;", start_date: "2024/05/20", end_date: "2024/05/26", availability: true  },
        { id: 3, name: "MG",price: "Rp200.000;", start_date: "2024/05/20", end_date: "2024/05/26", availability: true  },
        { id: 4, name: "DAIHATSU",price: "Rp200.000;", start_date: "2024/05/20", end_date: "2024/05/26", availability: false  },
    ]);
};
