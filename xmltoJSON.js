const moment = require('moment');
const fs =  require('fs');
const xlm2json = require('xml2json');
const archivoTexto = "./soapRequest2.txt";
const despachosModel = require("./despachosModel");

const  xmlStrings = fs.readFileSync(archivoTexto).toString();
var del = '<!';
var xmlStrings2 = xmlStrings.split("\n").join("");
//console.log('XML sin espacios:',xmlStrings2);
console.log("XML ORIGINAL",xmlStrings);

function divString(str,del){
  
    var xmlArr = str.split(del);
    
    //console.log('XML:',xmlArr);
    for (i=0 ; i<xmlArr.length; i++){
       
       var l = xmlArr[i].indexOf(']]>',0)
       var l2 = xmlArr[i].length;
       var l3 = (l2-l);
       
       console.log(l, l2, l3);
        if(xmlArr[i].length == 75){
            console.log('Entra-----------------------------------------------------------------');
        }else{

        const xmlStr =  xmlArr[i].slice(0, xmlArr[i].length-l3);
        propiedadesEncabezado = ['PLANTA', 'TRANSPORTE', 'PATENTE', 'NRO_CAMION', 'FH_SALIDA_PLANTA', 'HORA_SALIDA_PLANTA', 'NRO_SELLO_1',
        'NRO_SELLO_2', 'NRO_SELLO_3', 'RUT_CHOFER', 'DIG_VERI_CHOFER', 'NOM_CHOFER'];
        propiedadesDetalle = ['TIPO_GUIA', 'NRO_GUIA', 'FORMULA', 'DESC_FAMILIA', 'DESC_COMP_FAMILIA', 'COD_CENTRO_COSTO', 'DESC_CENTRO_COSTO', 'COD_SECTOR',
        'DESC_SECTOR', 'KG_NETO_ALIMENTO', 'FECHA_DESP'];
        let encabezado = 0;
        let detalle = 0;
        const json = xlm2json.toJson(xmlStr);
        //const strtoJson = xmlStr.slice(0, xmlStr.length-5);
        //const json = xlm2json.toJson(strJson);
        if(json.hasOwnProperty('INSERTA_XML')){
            if(json.INSERTA_XML.hasOwnProperty('Encabezado') && json.INSERTA_XML.hasOwnProperty('Detalle')){
                for(key in json.INSERTA_XML.Encabezado){
                    propiedadesEncabezado.indexOf(key) >= 0 ? encabezado++ : '';
                }
                for(key in xml.INSERTA_XML.Detalle){
                    propiedadesDetalle.indexOf(key) >= 0 ? encabezado++ : '';
                }
            }
        }
        if(encabezado == propiedadesEncabezado.length || detalle == propiedadesDetalle.length){
            console.log('Faltan Propiedades');
        }else{

            console.log('despachos:',json,'\n');
        }
       
        }
    }
}

divString(xmlStrings2,del);

function saveDocument(json){
    const document = new despachosModel ({
        planta: "xml.INSERTA_XML.Encabezado.PLANTA", 
        transporte: "xml.INSERTA_XML.Encabezado.TRANSPORTE", 
        patente: "xml.INSERTA_XML.Encabezado.PATENTE",
        numeroCamion: "xml.INSERTA_XML.Encabezado.NRO_CAMION",
        fechaSalida: "2019-07-31T16:08:24.145Z",
        horasalida_planta: "xml.INSERTA_XML.Encabezado.HORA_SALIDA_PLANTA",
        numeroSello_1: "xml.INSERTA_XML.Encabezado.NRO_SELLO_1",
        numeroSello_2: "xml.INSERTA_XML.Encabezado.NRO_SELLO_2",
        numeroSello_3: "xml.INSERTA_XML.Encabezado.NRO_SELLO_3",
        rutChofer: "xml.INSERTA_XML.Encabezado.RUT_CHOFER",
        digitoVerificadorChofer: "xml.INSERTA_XML.Encabezado.DIG_VERI_CHOFER",
        nombreChofer: "xml.INSERTA_XML.Encabezado.NOM_CHOFER",
        detalle:  {
            descripcionFamilia: "xml.INSERTA_XML.Detalle.DESC_FAMILIA",
            fechaDespacho: "2019-07-31T16:08:24.145Z",
            tipoGuia: "xml.INSERTA_XML.Detalle.TIPO_GUIA",
            numeroGuia: "xml.INSERTA_XML.Detalle.NRO_GUIA",
            formula: "xml.INSERTA_XML.Detalle.FORMULA",
            descripcionFamilia: "xml.INSERTA_XML.Detalle.DESC_FAMILIA",
            descripcionCFamilia: "xml.INSERTA_XML.Detalle.DESC_COMP_FAMILIA",
            descripcionCentroCosto: "xml.INSERTA_XML.Detalle.DESC_CENTRO_COSTO",
            sector: "xml.INSERTA_XML.Detalle.COD_SECTOR",
            descripcionSector: "xml.INSERTA_XML.Detalle.DESC_SECTOR",
            kgNetoAlimento: "xml.INSERTA_XML.Detalle.KG_NETO_ALIMENTO",
            //fechaDespacho: moment("2019-07-31T16:08:24.145Z")._d
        }
    })
    //console.log('Document for save:',document);
    document.save(err => {
        if (err) {console.log(JSON.stringify(err));}
        else{
            console.log('Document Save');
        }
    })

}

saveDocument();
module.exports = divString, saveDocument;