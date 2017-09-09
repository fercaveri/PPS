using Microsoft.AspNetCore.Mvc;
using PPS.Data;
using PPS.Models;
using PPS.Models_Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace PPS.Controllers
{
  [Route("api/localidad")]
  public class LocalidadController : Controller
  {

    private ConectorDB _db;

    public LocalidadController(ConectorDB db)
    {
      _db = db;
    }

    // GET api/localidad/get
    [HttpGet]
    public IEnumerable<Localidad> Get()
    {
      var Localidades = _db.Localidades.Select(x => new Localidad(x.nombreLocalidad, x.provincia)).ToList();
      return Localidades;
    }

    // GET api/localidad?[nombreProvincia]
    [HttpGet("{nombreProvincia}")]
    public IEnumerable<Localidad> Get(String nombreProvincia)
    {
      String nombreSinGuion = "";
      foreach (Char c in nombreProvincia)
      {
        if (c == '-') { nombreSinGuion += ' '; }
        else { nombreSinGuion += c; }
      }
      var Localidades = _db.Localidades.Select(x => new Localidad(x.nombreLocalidad, x.provincia)).ToList();
      List<Localidad> localidadesEnProvincia = new List<Localidad>();
      foreach (Localidad l in Localidades)
      {
        if(l.provincia != null)
        {

          if (l.provincia.nombreProvincia.Equals(nombreSinGuion))
          {
            localidadesEnProvincia.Add(l);
          }
        }
      }
      return localidadesEnProvincia;
    }

    [HttpPost]
    public HttpResponseMessage Add([FromBody] LocalidadWeb localidad)
    {
      Console.WriteLine(localidad.nombre);
      Console.WriteLine(localidad.provincia);
      Provincia prov = _db.Provincias.Find(localidad.provincia);
      _db.Add(new Localidad(localidad.nombre, prov));
      _db.SaveChanges();
      return new HttpResponseMessage();
    }

  }
}
