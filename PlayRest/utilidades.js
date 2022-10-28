const fs =require("fs");

// cargar juegos recibe una ruta y devuelve un objeto js   
let cargarjuego=(archivo)=>
{

  try {

    let json=fs.readFileSync(archivo, 'utf-8');
  
    let archivojs = JSON.parse(json);
    return archivojs;
    
  } 
  
  catch (error) {

  let archivojs=[];
  
  return archivojs; 

  }
    
 

  


}

//recibe el nombre de un fichero y un array js. El array es transformado en json y con él se reescribe el fichero
  let guardarJuego=(juegosjson, arrayjuegosjs)=>
{
    try {

	juegosjsonFinal=JSON.stringify(arrayjuegosjs);
	      
	    fs.writeFileSync(juegosjson, juegosjsonFinal );

    }
    catch (error) {
	
        console.log("error al guardar el juego");

        }
   

   

}

//exportamos 
module.exports  ={

   cargar : cargarjuego,

    guardar: guardarJuego,



}
