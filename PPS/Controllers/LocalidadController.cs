using Microsoft.AspNetCore.Mvc;
using PPS.Data;
using PPS.Models;
using PPS.WebModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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
      var Localidades = _db.Localidades.Select(x => new Localidad(x.id, x.nombreLocalidad, x.provincia)).ToList();
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
        if (l.provincia != null)
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
    public HttpResponseMessage Add([FromBody] LocalidadWEB localidad)
    {
      if (_db.Localidades.Find(localidad.id) == null)
      {
        Provincia prov = _db.Provincias.Find(localidad.provincia);
        _db.Add(new Localidad(localidad.nombre, prov));
        _db.SaveChanges();
        return new HttpResponseMessage(HttpStatusCode.OK);
      }
      return new HttpResponseMessage(HttpStatusCode.NotModified);
    }

    [HttpDelete]
    public HttpResponseMessage Delete(String nombre)
    {
      Localidad localidad = null;
      foreach (Localidad l in _db.Localidades)
      {
        if(l.nombreLocalidad == nombre)
        {
          localidad = l;
        }
      }
      if ( localidad != null)
      {
        _db.Localidades.Remove(localidad);
        _db.SaveChanges();
        return new HttpResponseMessage(HttpStatusCode.OK);
      }
      return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
    }
  }
}
