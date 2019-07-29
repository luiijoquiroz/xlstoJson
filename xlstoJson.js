

var xls = 'C:\Users\Tecnoandina\Documents\TecnoAndina_Dev\LuisQuiroz\Development\scriptExcel/npmLibro1.xlsx';
require('xls').parse(xls, function(err, data) {
	console.log('xls',data,err)
});