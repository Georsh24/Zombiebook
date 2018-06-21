var mongoose = require("mongoose");

var armasSchema = mongoose.Schema({
    Nombre: {type: String, required: true, unique: true},
    Descripcion: {type: String, required: true},
    Fuerza: {type: Number, required:true},
    Categorias: {type: String},
    Municion: Boolean,
});

var donothing = () => {

}

armasSchema.methods.nombre = function() {
    return this.Nombre;
}

armasSchema.pre("save",function(done){
    var arma = this;
    if(!arma.Municion){
        arma.Municion = false;
        return done();
    }
    if(arma.Municion){
        return done();
    }
});

var Arma = mongoose.model("arma", armasSchema);
module.exports = Arma;