import mongoose from "mongoose";
import { type } from "os";

const articuloSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true
    },
    tags: [String],
    description: {
    type: String
    },
    price: {
    type: Number,
    required: true
    },
    size: {
    type: String
    },
    color: {
    type: String
    },
    stock: {
    type: Number,
    default: 0
    }
})

// articuloSchema.pre('save', function(next){
//     this.title = this.title.trim();
//     this.tags = this.tags.trim();
//     this.description = this.description.trim();
//     this.size = this.size.trim();
//     this.color = this.color.trim();
//     next()

// })
// //LOGs//
// articuloSchema.post('save', function(doc,next){
//     console.log('Articulo Guardado:${doc.title}')
//     next()
// })

// articuloSchema.pre('findOneAndUpdate', function(next){
//     const update = this.getUpdate;
//     if(update.tags && Array.isArray(update.tags)){
//         update.tags = update.tags.map(tag => tag.toLowerCase().trim())
//         this.setUpdate(update)
//     }
//     next()
// })

// articuloSchema.pre('save', function(doc,next){
//     if(!this.description || this.description.trim().length === 0){
//         return next(new Error('La descripcion no debe estar vacia'))
//     }
//     this.description = this.description.trim()
//     next()
// })

export default mongoose.model('articulos',articuloSchema)

// const dataPath = path.resolve('data/articulos.json');

// export async function getAllArticulos() {
//     const data = await fs.readFile(dataPath, 'utf-8');
//     return JSON.parse(data);

// }

// export async function saveAllArticulos(articulos) {
//     await fs.writeFile(dataPath, JSON.stringify(articulos));

// }

