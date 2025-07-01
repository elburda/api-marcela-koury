import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { User } from "./models/userModels.js";
import Articulo from "./models/articulosModels.js";

dotenv.config();

const usuarios = [
  {
    nombre: "Nicolas",
    apellido: "Burda",
    email: "nicolasb@test.com",
    username: "nicolasb",
    password: "123456",
    rol: "admin"
  },
  {
    nombre: "Marcela",
    apellido: "Koury",
    email: "marcela@test.com",
    username: "marcek",
    password: "123456",
    rol: "vendedor"
  }
];

const articulos = [
  {
    title: "Remera básica blanca",
    tags: ["blanca", "verano", "oferta"],
    description: "Remera blanca de algodón 100%, cuello redondo",
    price: 7500,
    stock: 50
  },
  {
    title: "Pantalón de jean",
    tags: ["jean", "invierno"],
    description: "Pantalón de jean azul clásico",
    price: 16500,
    stock: 30
  },
  {
    title: "Camisa de lino",
    tags: ["verano", "formal"],
    description: "Camisa blanca de lino, manga larga",
    price: 14000,
    stock: 15
  },
  {
    title: "Falda plisada negra",
    tags: ["invierno", "elegante"],
    description: "Falda plisada negra, hasta la rodilla",
    price: 11000,
    stock: 20
  },
  {
    title: "Vestido de fiesta",
    tags: ["noche", "elegante"],
    description: "Vestido largo rojo para eventos",
    price: 27000,
    stock: 5
  },
  {
    title: "Short deportivo",
    tags: ["verano", "casual"],
    description: "Short liviano, ideal para entrenar",
    price: 7200,
    stock: 40
  },
  {
    title: "Top con breteles",
    tags: ["verano", "básico"],
    description: "Top blanco con breteles finos",
    price: 6300,
    stock: 60
  },
  {
    title: "Campera inflable",
    tags: ["invierno", "oferta"],
    description: "Campera inflable térmica negra",
    price: 24000,
    stock: 10
  },
  {
    title: "Sweater de lana",
    tags: ["invierno", "tejido"],
    description: "Sweater de lana gris con cuello redondo",
    price: 17500,
    stock: 18
  },
  {
    title: "Blazer negro",
    tags: ["formal", "trabajo"],
    description: "Blazer negro entallado con botón",
    price: 26000,
    stock: 12
  }
];

const runSeeder = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Conectado a MongoDB");

    for (const user of usuarios) {
      const existente = await User.findOne({ email: user.email });
      if (!existente) {
        const hashed = await bcrypt.hash(user.password, 10);
        await User.create({ ...user, password: hashed });
        console.log(`👤 Usuario ${user.email} creado`);
      } else {
        console.log(`🔁 Usuario ${user.email} ya existe`);
      }
    }

    const totalArticulos = await Articulo.countDocuments();
    if (totalArticulos === 0) {
      await Articulo.insertMany(articulos);
      console.log("🛍️  Artículos insertados");
    } else {
      console.log("📦 Ya hay artículos cargados, no se duplican");
    }

    mongoose.connection.close();
    console.log("✅ Seed finalizado");
  } catch (err) {
    console.error("❌ Error en el seeder:", err);
    mongoose.connection.close();
  }
};

runSeeder();
