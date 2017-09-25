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
      var Localidades = _db.Localidades.Select(x => new Localidad(x.id, x.nombreLocalidad, x.provincia))/*.Where( x => x.nombreLocalidad!="")*/.ToList();
      return Localidades;
    }

    // GET api/localidad?[nombreProvincia]
    [HttpGet("{provincia}")]
    public IEnumerable<Localidad> Get(String provincia)
    {
      var Localidades = _db.Localidades.Select(x => new Localidad(x.id, x.nombreLocalidad, x.provincia)).Where(x => x.provincia.nombreProvincia == provincia && x.nombreLocalidad != "").ToList();
      return Localidades;

    }

    [HttpGet("{id}")]
    public IEnumerable<Localidad> Get(Boolean id)
    {
      var Localidades = _db.Localidades.Select(x => new Localidad(x.id, x.nombreLocalidad, x.provincia)).Where(x => x.nombreLocalidad != "").ToList();
      return Localidades;

    }

    [HttpPost]
    public HttpResponseMessage Add([FromBody] LocalidadWEB localidad)
    {
      Localidad loc = _db.Localidades.Select(x => new Localidad(x.nombreLocalidad, x.provincia)).Where(x => x.nombreLocalidad == localidad.nombre).FirstOrDefault();
      if (loc == null)
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
