
function generaDataStocksPabellon() {
    const pabellonData = []
    for (let i = 1; i <= 4; i++) {
        objectStocks = {};
        objectStocks.numero = "";
        //console.log(i);
        if (i > 0) {
            objectStocks.numero = i;
            objectStocks.silos = [];
            //SILOS
            for (let s = 1; s <= 2; s++) {
                silo = {};
                silo.numero = "";
                silo.numero = s;
                silo.peso = Math.floor(Math.random() * 12000)
                //console.log('N',s,'Silo',silo);
                objectStocks.silos.push(silo);
            }
            //console.log('Silos:',objectStocks.silos);
            objectStocks.horas = Math.floor(Math.random() * 100)
            objectStocks.horasMax = Math.floor(Math.random() * 150)
            objectStocks.cobb = Math.floor(Math.random() * 1000);
            objectStocks.cobbMax = Math.floor(Math.random() * 1500);
        }
        //console.log('Json',objectStocks,'\n');
        pabellonData.push(objectStocks);
    }
    //console.log('JsonPabellones:',JSON.stringify(pabellonData));
    console.log('JsonPabellones:', pabellonData);
    return pabellonData;
}
//generaDataStocksPabellon();

function intervalosDiarios(_dia) {

    fecha = new Date();
    _serie = new Date();
    dia = fecha.getDate();
    mes = fecha.getMonth() + 1;
    anio = fecha.getFullYear();
    _serie.setDate(_serie.getDate() + _dia);

    return _serie;
    
}
//intervalosDiarios();

function generaDataSeries() {

    objectSeries = {};
    objectSeries.serie1 = "Silo1";
    objectSeries.serie2 = "Silo2";
    objectSeries.data = [];
    for (d = 0; d <= 100; d++) {
        objAux = {};

        objAux.time = intervalosDiarios(d);
        objAux.serie1 = (d+1) * 100;
        objAux.serie2 = (d+3) * 100;
        objectSeries.data.push(objAux);
    }

    console.log('Series Data:',objectSeries)

    return objectSeries;
}
generaDataSeries();



module.exports = generaDataStocksPabellon;