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
  public class CandidatoController : Controller
  {

    private ConectorDB _db;

    public CandidatoController(ConectorDB db)
    {
      _db = db;
    }

    // GET api/candidato
    [HttpGet]
    public IEnumerable<Candidato> Get()
    {
      var Candidatos = _db.Candidatos.Select(x => new Candidato(x.id, x.nombre, x.apellido, x.localidad, x.cargo, x.urlFoto, x.partido)).ToList();
      return Candidatos;
    }

    // GET api/candidato?[nombre&apellido]
    [HttpGet("{localidad}")]
    public IEnumerable<Candidato> Get(String localidad)
    {
      var Candidatos = _db.Candidatos.Select(x => new Candidato(x.id, x.nombre, x.apellido, x.localidad, x.cargo, x.urlFoto, x.partido))
                          .Where(x => x.localidad.nombreLocalidad == localidad || x.cargo != 0).ToList();
      return Candidatos;
    }

    [HttpPost]
    public HttpResponseMessage Post([FromBody] CandidatoWEB obj)
    {
      Cargo cargo = (Cargo)obj.cargo;

      Localidad localidad = _db.Localidades.Find(obj.localidad.id);
      if (localidad == null)
      {
        Provincia pcia = _db.Provincias.Find(obj.localidad.provincia);
        if (pcia == null)
        {
          pcia = new Provincia(obj.localidad.provincia);
        }
        localidad = new Localidad(obj.localidad.nombre, pcia);
      }
      PartidoPolitico partido = _db.Partidos.Find(obj.partido);
      var Candidatos = _db.Candidatos.Select(x => new Candidato(x.id, x.nombre, x.apellido, x.localidad, x.cargo, x.urlFoto, x.partido))
                          .Where( x => x.partido.nombre == partido.nombre && x.cargo == cargo).FirstOrDefault();
      if(Candidatos == null || obj.cargo == 0)
      {
        Candidato candidato = new Candidato(obj.nombre, obj.apellido, localidad, cargo, obj.urlFoto, partido);
        _db.Candidatos.Add(candidato);
        _db.SaveChanges();
        return new HttpResponseMessage(HttpStatusCode.OK);
      }
      return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
      
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
        //candidato.localidad = _db.Localidades.Find(cand.localidad.id);
        candidato.urlFoto = cand.urlFoto;
        candidato.partido = _db.Partidos.Find(cand.partido);
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
