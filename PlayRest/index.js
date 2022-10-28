// Cargamos librerias

const bodyParser = require("body-parser");
const express = require("express");
const { get } = require("lodash");

const utilidades = require("./utilidades");

// guardamos el fichero en una constante
const ficherojuegos = "Juegos/juegos.json";

//Cargar los juegos del fichero en una array antes de iniciar el servidor
let arrayjuegos = utilidades.cargar(ficherojuegos);

let app = express();
app.use(bodyParser.json());

//servicios

app.get("/juegos?:anyos?:tipo", (req, res) => {

  if(req.query["anyos"]==undefined & req.query["tipo"]==undefined)
  {
    
    res.status(200).send({ ok: true, juegos: arrayjuegos} );
  }


  else if(req.query["anyos"]<0)
      {
        res.status(400).send({ok:false, error:"edad negativa"});

      }
  else if(req.query["anyos"]==undefined || req.query["tipo"]==undefined)
  {
    
   
    if(req.query["anyos"]==undefined){
    let filtrarTipo = arrayjuegos.filter(
          (juego) => juego.tipo == req.query["tipo"]
        );
        res.status(200).send({ ok: true, juegos: filtrarTipo} );

    }
    else if(req.query["tipo"]==undefined)
     {
    let filtraranyos=arrayjuegos.
    filter( (juego) => juego.edadMinima == req.query["anyos"]);

      
     
      {
        res.status(200).send({ ok: true, juegos: filtraranyos} );

      }
      }
    
  
    }

   else
    {
      let filtradocompleto = arrayjuegos.filter((juego) =>juego
      .tipo == req.query["tipo"] && juego.edadMinima == req.query["anyos"]
          );
          if(filtradocompleto.length>0){
         
            res.status(200).send({ok:false, juegos: filtradocompleto})
         
        }
          else
          {

              res.status(400).send({ok:false, error:"no hay juegos"});
          }



    }
  


    

});

app.get("/juegos/:id", (req, res) => {
  let filtradoID = arrayjuegos.filter((juego) => juego.id == req.params["id"]);
  if (filtradoID.length > 0) {
    res.status(200).send({ ok: true, juegos: filtradoID });
  } else res.status(400).send({ ok: false, error: "id incorrecto" });

});

app.post("/juegos", function (req, res) {
  let comprobarId = arrayjuegos.filter((juego) => juego.id == req.body.id);

  if (comprobarId.length != 0) {
    res
      .status(400)
      .send({
        ok: false,
        error: "El juego ya se encuentra en la base de datos",
      });
  } else {
    let juego = {
      id: req.body.id,
      nombre:req.body.nombre,
      descripcion:req.body.descripcion,
      edadMinima:req.body.edadMinima,
      numeroJugadores:req.body.numeroJugadores,
      tipo: req.body.tipo,
      precioEuros:req.body.precioEuros

    };

    arrayjuegos.push(juego);
    utilidades.guardar(ficherojuegos, arrayjuegos);
    res.status(200).send({ ok: true });
  }
});

app.put("/juegos/:id", (req, res) => {
  let buscar = arrayjuegos.filter((juego) => juego.id == req.params["id"]);

  if (buscar.length > 0) {
    let juego;

    juego = buscar[0];

    juego.nombre = req.body.nombre;
    juego.descripcion = req.body.descripcion;
    juego.edadMinima = req.body.edadMinima;
    juego.numeroJugadores = req.body.numeroJugadores;
    juego.tipo = req.body.tipo;
    juego.precioEuros=req.body.precioEuros;
    utilidades.guardar(ficherojuegos, arrayjuegos);


    res.status(200).send({ ok: true });
  } else {
    res.status(400).send({ ok: false, error: "error, juego no encontrado" });
  }
});

app.delete("/juegos/:id", function (req, res) {
  let filtro = arrayjuegos.filter((juego) => juego.id != req.params["id"]);
  if (filtro.length != arrayjuegos.length) {
    arrayjuegos = filtro;
    utilidades.guardar(ficherojuegos, arrayjuegos);
    res.status(200).send({ ok: true });
  } else {
    res.status(400).send({ ok: false, error: "juego no encontrado" });
  }
});

//     Ponemos en marcha el servidor

app.listen(8080);

