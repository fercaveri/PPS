using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

    // GET api/localidad/getmesas?[idLocalidad]
    [HttpGet]
    [Route("getmesas")]
    public int GetMesas(int id)
    {
      int numeroMesas = _db.Mesas.Count(x => x.localidad.id == id);
      return numeroMesas;

    }

    [HttpPost]
    public HttpResponseMessage Add([FromBody] LocalidadWEB localidad)
    {
      Localidad loc = _db.Localidades.Select(x => new Localidad(x.nombreLocalidad, x.provincia)).Where(x => x.nombreLocalidad == localidad.nombre).FirstOrDefault();
      if (loc == null)
      {
        Provincia prov = _db.Provincias.Find(localidad.provincia);
        Localidad nuevaLoc = new Localidad(localidad.nombre, prov);
        _db.Add(nuevaLoc);
        for (int i = 1; i < localidad.numeroMesas + 1; i++)
        {
          _db.Add(new Mesa(i, nuevaLoc));
        }
        _db.SaveChanges();
        return new HttpResponseMessage(HttpStatusCode.OK);
      }
      return new HttpResponseMessage(HttpStatusCode.NotModified);
    }

    [HttpPatch]
    public HttpResponseMessage Patch(int id, [FromBody] LocalidadWEB localidad)
    {
      if (localidad == null)
      {
        return new HttpResponseMessage(HttpStatusCode.BadRequest);
      }

      Localidad loc = _db.Localidades.Where(x => x.id == id).Include(x => x.provincia).FirstOrDefault();
      int numeroMesas = _db.Mesas.Count(x => x.localidad.id == id);

      if (localidad.nombre != null && loc.nombreLocalidad != localidad.nombre)
      {
        loc.nombreLocalidad = localidad.nombre;
      }

      if (localidad.provincia != "" && localidad.provincia != null && loc.provincia.nombreProvincia != localidad.provincia)
      {
        loc.provincia = _db.Provincias.Where(x => x.nombreProvincia == localidad.provincia).FirstOrDefault();
      }

      // SI QUIERO SACAR ALGUNAS MESAS
      if (numeroMesas > localidad.numeroMesas)
      {
        var mesas = _db.Mesas.Where(x => x.numero > localidad.numeroMesas);
        if (mesas.Any())
        {
          _db.Mesas.RemoveRange(mesas);
        }
      }

      // SI QUIERO AGREGAR MESAS
      else if (numeroMesas < localidad.numeroMesas)
      {
        for (int i = numeroMesas + 1; i <= localidad.numeroMesas; i++)
        {
          _db.Add(new Mesa(i, loc));
        }
      }

      _db.Update(loc);
      _db.SaveChanges();
      return new HttpResponseMessage(HttpStatusCode.OK);
    }

    [HttpDelete]
    public HttpResponseMessage Delete(int id)
    {
      Localidad localidad = _db.Localidades.Where(x => x.id == id).FirstOrDefault();
      if (localidad != null)
      {
        var mesas = _db.Mesas.Where(x => x.localidad.id == id);
        if (mesas.Any())
        {
          _db.Mesas.RemoveRange(mesas);
        }
        _db.Localidades.Remove(localidad);
        _db.SaveChanges();
        return new HttpResponseMessage(HttpStatusCode.OK);
      }
      return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
    }
  }
}
