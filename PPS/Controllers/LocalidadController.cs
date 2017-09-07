using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PPS.Data;
using PPS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
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

    // GET api/localidad
    [HttpGet]
    public IEnumerable<Localidad> All()
    {
      var Localidades= _db.Localidades.Select(x => new Localidad(x.nombre,x.provincia)).ToList();
      return Localidades;
    }

    // GET api/localidad?[nombreProvincia]
    [HttpGet]
    public IEnumerable<Localidad> Get(String nombreProvincia)
    {
      Console.WriteLine(nombreProvincia);
      String nombreSinGuion = "";
      foreach (Char c in nombreProvincia)
      {
        if (c == '-') { nombreSinGuion += ' '; }
        else { nombreSinGuion += c; }
      }
      var Localidades = _db.Localidades.Select(x => new Localidad(x.nombre, x.provincia)).ToList();
      List<Localidad> localidadesEnProvincia = new List<Localidad>();
      foreach (Localidad l in Localidades)
      {
        if (l.provincia.nombre.Equals(nombreSinGuion))
        {
          localidadesEnProvincia.Add(l);
        }
      }
      return localidadesEnProvincia;
    }

    [HttpPost]
    public HttpResponseMessage Add(Localidad localidad)
    {
      _db.Localidades.Add(localidad);
      _db.SaveChanges();
      return new HttpResponseMessage();
    }

  }
}
