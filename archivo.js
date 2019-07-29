const xlxss = require('xlsx');
const file = xlxss.readFile('./usuarios.xlsx');

var result = {};
var jsonData = {};
file.SheetNames.forEach(function(sheetNames){
    var data = xlxss.utils.sheet_to_json(file.Sheets[sheetNames])
    if (data.length > 0){
        result = data;
    }
    jsonData = result;
});

//console.log(jsonData);

const encriptar = require('./bycrypt-helper');
const arregloFinal = [];
num = 1;
for(const item of jsonData){

    objetoAux = {};
    
    objetoAux2 = {};
    cargo = "";
    email = "";
    permisos = [];
    instalacion = [];
    funcion = "";
    objetoAux.usuario = item.Usuario;
    objetoAux.nombre = item.NOMBRE;
    objetoAux.apellido = item.APELLIDO;
    objetoAux.email = "";
   // console.log('Usuarios',objetoAux.usuario,objetoAux.nombre,objetoAux.apellido, num ++);
    //Set Email segun la planta
    //console.log(item)
    const Keys_Email = Object.keys(item);   
    if (Keys_Email.length > 6)
    {
        for(e=6; e<Keys_Email.length ; e++){

           if (Keys_Email[e].indexOf('PLA MAITENLAHUE') >=0){
            email = 'opmaitenlahue@agrosuper.com';
           }
           if (Keys_Email[e].indexOf('PLA ESTRELLA') >=0){
            email = 'oplaestrella@agrosuper.com ';
           }
           if (Keys_Email[e].indexOf('PLA LA MANGA') >=0){
            email = 'oplamanga@agrosuper.com';
           }
           if (Keys_Email[e].indexOf('PLA POCILLAS') >=0){
            email = 'oppocillas@agrosuper.com ';
           }
           if (Keys_Email[e].indexOf('PLA PERALILLO') >=0){
            email = 'opperalillo@agrosuper.com';
           }
           if (Keys_Email[e].indexOf('PLA VALDEBENITO') >=0){
            email = 'opvaldebenito@agrosuper.com ';
           }
           if (Keys_Email[e].indexOf('PLA RAMIRANA') >=0 || Keys_Email[e].indexOf('BDG RAMIRANA') >=0){
            email = 'operaplantaramirana@agrosuper.com';
           }
           if (Keys_Email[e].indexOf('PLA TANTEHUE') >=0){
            email = 'opeplantatantehue@agrosuper.com';
           }     
         }
    }
    objetoAux.email = email;
    
    //Set Cargos 
    //console.log(item)
    cargo = item.Funcion;    
    if(cargo.indexOf('SUBGERENTE BIOCORNECHE') && cargo.indexOf('GERENTE CERDOS')){
        funcion = cargo.concat(' U1');
    }else {

        funcion = cargo
    }

    objetoAux.cargo = funcion;
    objetoAux.rut = item.Rut;
    //console.log('Cargos:', objetoAux.cargo , objetoAux.rut, 'Num'+num++);
    objetoAux.password = encriptar.generate(item.password);
   
   //Asignacion de Permisos de acuerdo al ROL
   // console.log(item);
   const Key_Permisos = Object.keys(item);
    if(Key_Permisos.length > 6){
        for(i=6 ; i<Key_Permisos.length; i++){
            instalacion.push({
                instalacion : Key_Permisos[i],
                permisos : {
                    leer : item[Key_Permisos[i]].indexOf('Reportería') >=0 ? true : false,
                    escribir : item[Key_Permisos[i]].indexOf('Escribir') >=0 ? true : false,
                    editar : item[Key_Permisos[i]].indexOf('Editar') >=0 ? true : false,
                } 
            })
        }
     
    }
    objetoAux2 = instalacion;

    //console.log('Nombre: '+objetoAux.nombre, '- Planta: '+JSON.stringify(objetoAux2.instalaciones), ' Email: '+ objetoAux.email, '#'+num++);
    //console.log('-',objetoAux2.instalaciones);
    //console.log(JSON.stringify(objetoAux2));
    objetoAux.isAdmin = false;
    if(instalacion.length >= 10){

         objetoAux.isAdmin = true;
    }
    //console.log(objetoAux2);    
    objetoAux.instalaciones = objetoAux2;
    //console.log('Instalaciones: '+JSON.stringify(objetoAux.instalaciones));

    objetoAux.disabled = false;
   
    //console.log(JSON.stringify(objetoAux));
    
    arregloFinal.push(objetoAux);
    //console.log(arregloFinal);
    
}
//console.log('JSON', objetoAux);
console.log('RESULT JSON', JSON.stringify(arregloFinal));