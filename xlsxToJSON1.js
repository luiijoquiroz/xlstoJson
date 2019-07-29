
   var workbook = XLSX.readFile(req.file.path);
   //console.log(workbook);
   var result = {};
   workbook.SheetNames.forEach(function (sheetName) {
       var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
       if (roa.length > 0) {
           result = roa;
       }
   });;
   //return result;
   //console.log(result);

   var jsonData = {};
   var dropdown = {};
   var attrTypes = result[0];
   //console.log(attrTypes);

   for (var i = 1; i < result.length; i++) {
       var obj = result[i];
       
       console.log(obj);
       
       for (var key in obj) {
           var attrName = key;
           var attrValue = obj[key];
           if (attrTypes[attrName]) {
               var type = attrTypes[attrName].toLowerCase().replace(/ /g, ''); // Means type is given                        
               //console.log(type);

               if (type === "selectbox") {
                   console.log(attrValue);
                   //var dropdown = attrValue;
                   //console.log(dropdown);
               }

           } else {
               //console.log(type); // Means type is not given
               jsonData = attrName + ":" + attrValue;
               //console.log(jsonData);
           }
       }
   }