using Microsoft.AspNetCore.Mvc;
using PPS.Data;
using PPS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Controllers
{

  [Route("api/[controller]")]
  public class LocalidadController : Controller
  {

    private ConectorDB _db;

    public LocalidadController(ConectorDB db)
    {
      _db = db;
    }

    // GET api/localidad/[nombreProvincia]
    [HttpGet]
    public IEnumerable<Localidad> Get(String nombreProvincia)
    {
      
      var Localidades = _db.Localidades.Select(x => new Localidad(x.nombre,x.provincia)).ToList();
      List<Localidad> localidadesEnProvincia = new List<Localidad>();
      foreach(Localidad l in Localidades)
      {
        if(l.nombre.Equals("San Miguel")){
          localidadesEnProvincia.Add(l);
        }
      }
      return localidadesEnProvincia;
    }
  }
}
