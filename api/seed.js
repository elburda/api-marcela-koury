
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { User } from "./models/userModels.js";
import Articulo from "./models/articulosModels.js";
import { Local } from "./models/localModels.js";

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
  },
  {
    nombre: "Paula",
    apellido: "Koury",
    email: "paula@test.com",
    username: "pau",
    password: "123456",
    rol: "vendedor"
  },
  {
    nombre: "Lorenzo",
    apellido: "Burda",
    email: "lorenzo@test.com",
    username: "loren",
    password: "123456",
    rol: "vendedor"
  },
  {
    nombre: "Merlina",
    apellido: "Linda",
    email: "merlina@test.com",
    username: "merlina",
    password: "123456",
    rol: "vendedor"
  },
  {
    nombre: "Dario",
    apellido: "Burda",
    email: "dario@test.com",
    username: "juanp",
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
    title: "Buzo con capucha",
    tags: ["invierno", "casual"],
    description: "Buzo gris con capucha y bolsillo delantero",
    price: 18500,
    stock: 25
  },
  {
    title: "Chaleco inflable",
    tags: ["invierno", "oferta"],
    description: "Chaleco inflable sin mangas, térmico y liviano",
    price: 16000,
    stock: 18
  },
  {
    title: "Remera estampada",
    tags: ["verano", "casual"],
    description: "Remera negra con diseño gráfico frontal",
    price: 8900,
    stock: 35
  },
  {
    title: "Top deportivo",
    tags: ["deporte", "verano"],
    description: "Top con soporte ideal para entrenamiento",
    price: 7900,
    stock: 30
  },
  {
    title: "Jogging de algodón",
    tags: ["invierno", "casual"],
    description: "Pantalón jogging gris con puño y bolsillos",
    price: 12800,
    stock: 20
  },
  {
    title: "Camisa a cuadros",
    tags: ["otoño", "informal"],
    description: "Camisa de franela con diseño de cuadros rojos y negros",
    price: 14500,
    stock: 15
  },
  {
    title: "Pollera de jean",
    tags: ["verano", "casual"],
    description: "Pollera corta de jean celeste gastado",
    price: 13200,
    stock: 22
  },
  {
    title: "Vestido floral",
    tags: ["verano", "evento"],
    description: "Vestido liviano con estampado floral, manga corta",
    price: 15800,
    stock: 10
  },
  {
    title: "Campera de cuero sintético",
    tags: ["invierno", "urbano"],
    description: "Campera negra entallada estilo biker",
    price: 28500,
    stock: 8
  },
  {
    title: "Blusa con volados",
    tags: ["primavera", "formal"],
    description: "Blusa blanca con volados en mangas y cuello",
    price: 9800,
    stock: 16
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

    // Limpiar datos previos
    await User.deleteMany();
    await Local.deleteMany();
    console.log("🧹 Datos anteriores eliminados");

    // Crear usuarios
    const vendedores = {};
    for (const user of usuarios) {
      const hashed = await bcrypt.hash(user.password, 10);
      const nuevo = await User.create({ ...user, password: hashed });
      vendedores[user.email] = nuevo;
      console.log(`👤 Usuario ${user.email} creado`);
    }

    // Insertar artículos
    await Articulo.deleteMany();
    await Articulo.insertMany(articulos);
    console.log("🛍️  Artículos insertados");

    // Crear locales
    const locales = [
      {
        nombre: "Local Centro",
        direccion: "Av. Principal 123",
        vendedores: [vendedores["marcela@test.com"]?._id]
      },
      {
        nombre: "Local Norte",
        direccion: "Calle Norte 456",
        vendedores: [vendedores["marcela@test.com"]?._id]
      },
      {
        nombre: "Local Sur",
        direccion: "Av. Sur 789",
        vendedores: [vendedores["dario@test.com"]?._id]
      },
      {
        nombre: "Local Compartido",
        direccion: "Diagonal 1010",
        vendedores: [
          vendedores["marcela@test.com"]?._id,
          vendedores["dario@test.com"]?._id
        ]
      }
    ];

    const localesCreados = await Local.insertMany(locales);
    console.log("🏪 Locales creados");

    // Asignar localAsignado a cada vendedor (solo el primero que lo tenga)
    for (const vendedor of Object.values(vendedores)) {
      if (vendedor.rol === "vendedor") {
        const localEncontrado = localesCreados.find((l) =>
          l.vendedores.some((v) => v.equals(vendedor._id))
        );
        if (localEncontrado) {
          vendedor.localAsignado = localEncontrado._id;
          await vendedor.save();
          console.log(`🔗 ${vendedor.email} asignado a ${localEncontrado.nombre}`);
        }
      }
    }

    mongoose.connection.close();
    console.log("✅ Seed finalizado");
  } catch (err) {
    console.error("❌ Error en el seeder:", err);
    mongoose.connection.close();
  }
};

runSeeder();
