MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
           DB db = mongoClient.getDB("yourdb_name");
           System.out.println("Connected to Database successfully");
           DBCollection coll = db.getCollection("your_collection name");
           System.out.println("Collection your_collection name selected successfully");

                DBCollection OR = db.getCollection("Input_Container");
                System.out.println("Collection Device_Details selected successfully");
                OR.drop();
                DBObject arg1 = null;
                //coll.update(query, update);
                DBCollection OR_UPLOAD = 
                db.createCollection("Input_Container", arg1);
                String path =" your file path";

                File myFile = new File(path);
                FileInputStream inputStream = new FileInputStream(myFile);
                XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
                int number=workbook.getNumberOfSheets();
                  System.out.println("NumberOfSheets "+number);

                  for(int i=0;i<number;i++)
                  {
                XSSFSheet sheet = workbook.getSheetAt(i);
                int col_value=sheet.getRow(0).getLastCellNum();
                int row_num= sheet.getLastRowNum();
                System.out.println("row_num "+row_num);
                List<String> DBheader = new ArrayList<String>();
                List<String> Data = new ArrayList<String>();

                for(int z=1;z<=row_num;z++){
                     DBheader.clear();
                     Data.clear();
                 for(int j=0;j<col_value;j++)
                {
                    if(sheet.getRow(0).getCell(j).toString()!=null || sheet.getRow(0)!=null)
                    {
                    String cel_value = sheet.getRow(0).getCell(j).toString();
                    DBheader.add(cel_value.trim());
                    }
                    else{
                        break;

                    }
                }
                for(int k=0;k<col_value;k++){
                    String data =" ";   
                    if(sheet.getRow(z).getCell(k)!=null)
                    {
                    data =  sheet.getRow(z).getCell(k).toString();
                    }
                    Data.add(data.trim());

                    }
                BasicDBObject doc = new BasicDBObject();
                System.out.println("Data.size() "+Data.size());

                int l=0;
                for(String headers:DBheader)
                { 
                if(l>Data.size()){break;}
                    doc.append(headers, Data.get(l));
                    l++;
                 }
                OR_UPLOAD.insert(doc);
                }

            }System.out.println("File Upload Done");
                  mongoClient.close();