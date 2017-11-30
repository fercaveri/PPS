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
  [Route("api/[controller]")]
  public class MesaController : Controller
  {

    private ConectorDB _db;

    public MesaController(ConectorDB db)
    {
      _db = db;
    }

    // GET api/candidato
    [HttpGet]
    public IEnumerable<Mesa> Get()
    {
      var Mesas = _db.Mesas.Select(x => new Mesa(x.numero, x.localidad)).ToList();
      return Mesas;
    }

    // GET api/mesa?localidad
    [HttpGet("{localidad}")]
    public IEnumerable<Mesa> Get(String localidad)
    {
      var Mesas = _db.Mesas.Select(x => new Mesa(x.id, x.numero, x.localidad))
                          .Where(x => x.localidad.nombreLocalidad == localidad).ToList();
      return Mesas;
    }

    [HttpGet]
    [Route("getcircuito")]
    public IEnumerable<Circuito> GetCircuito(int idLocalidad)
    {
      var Circuitos = _db.Circuitos.Select(x => new Circuito(x.id, x.numero, x.localidad))
                          .Where(x => x.localidad.id == idLocalidad).ToList();
      return Circuitos;
    }
    [HttpGet]
    [Route("getxcircuito")]
    public IEnumerable<Mesa> GetMesasCircuito(int idCircuito)
    {
      var Mesas = _db.Mesas.Select(x => new Mesa(x.id, x.numero, x.localidad, x.circuito))
                          .Where(x => x.circuito.id == idCircuito).ToList();
      return Mesas;
    }
    // GET api/mesa/votantes?localidad
    [HttpGet]
    [Route("cantidad")]
    public int CantidadMesas(int idLocalidad)
    {
      var cantidadMesas = _db.Mesas.Select(x => new Mesa(x.id, x.numero, x.localidad))
                          .Where(x => x.localidad.id == idLocalidad).Count();
      return cantidadMesas;
    }

    [HttpGet]
    [Route("cantidadCircuito")]
    public int CantidadCircuito(int idCircuito)
    {
      var cantidadMesas = _db.Mesas.Where(x => x.circuito.id == idCircuito).Count();
      return cantidadMesas;
    }

    // GET api/mesa/votantes?localidad
    [HttpGet]
    [Route("cantidadProvincia")]
    public int CantidadProvincia(String idProvincia)
    {
      var cantidadMesas = _db.Mesas.Where(x => x.localidad.provincia.nombreProvincia == idProvincia).Count();
      return cantidadMesas;
    }

    [HttpGet]
    [Route("cantidadPais")]
    public int CantidadPais()
    {
      var cantidadMesas = _db.Mesas.Select(x => new Mesa(x.id, x.numero, x.localidad)).Count();
      return cantidadMesas;
    }

    [HttpPost]
    public HttpResponseMessage Post([FromBody] MesaWEB obj)
    {

      //Localidad localidad = _db.Localidades.Find(obj.localidad);
      //if (localidad == null)
      //{
      //  Provincia pcia = _db.Provincias.Find(obj.localidad.provincia);
      //  if (pcia == null)
      //  {
      //    pcia = new Provincia(obj.localidad.provincia);
      //  }
      //  localidad = new Localidad(obj.localidad.nombre, pcia);
      //}
      //PartidoPolitico partido = _db.Partidos.Find(obj.partido);
      //Candidato candidato = new Candidato(obj.nombre, obj.apellido, localidad, cargo, obj.urlFoto, partido);
      //_db.Candidatos.Add(candidato);
      //_db.SaveChanges();
      return new HttpResponseMessage();
    }

    [HttpPatch]
    public HttpResponseMessage Edit(int id, [FromBody] CandidatoWEB cand)
    {
      Candidato candidato = _db.Candidatos.Find(id);
      if(candidato != null)
      {
        candidato.nombre = cand.nombre;
        candidato.apellido = cand.apellido;
        Cargo c;
        if (cand.cargo == 0) { c = Cargo.Concejal; }
        else if (cand.cargo == 1) { c = Cargo.DiputadoProvincial; }
        else if (cand.cargo == 2) { c = Cargo.DiputadoNacional; }
        else { c = Cargo.SenadorNacional; }
        candidato.cargo = c;
        candidato.urlFoto = cand.urlFoto;
        _db.Update(candidato);
        _db.SaveChanges();
        return new HttpResponseMessage(HttpStatusCode.OK);
      }
      return new HttpResponseMessage(HttpStatusCode.NotFound);
    }

    [HttpDelete]
    public HttpResponseMessage Delete(int id)
    {
      Candidato candidato = _db.Candidatos.Find(id);
      if (candidato != null)
      {
        _db.Candidatos.Remove(candidato);
        _db.SaveChanges();
        return new HttpResponseMessage(HttpStatusCode.OK);
      }
      return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
    }
  }
}
