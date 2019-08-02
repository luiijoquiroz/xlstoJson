var mongoose = require('mongoose')

const despachosSchema = new mongoose.Schema({
    planta: String, 
    transporte: String, 
    patente: String,
    numeroCamion: String, 
    fechaSalida: String,
    horasalida_planta: String,
    numeroSello_1: String,
    numeroSello_2: String,
    numeroSello_3: String,
    rutChofer: String,
    digitoVerificadorChofer: String,
    nombreChofer: String,
    detalle:  {
        descripcionFamilia: String,
        fechaDespacho: Date,
        tipoGuia: String,
        numeroGuia: String,  
        formula: String,
        descripcionFamilia:  String,
        descripcionCFamilia: String,
        centroCosto: String,
        descripcionCentroCosto: String,
        sector: String,
        descripcionSector: String,
        kgNetoAlimento: String,
        fechaDespacho: Date,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    updatedBy: String
});
module.exports = mongoose.model('despacho', despachosSchema);
