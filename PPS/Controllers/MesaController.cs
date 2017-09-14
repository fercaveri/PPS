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

    // GET api/candidato?[nombre&apellido]
    [HttpGet("{localidad}")]
    public IEnumerable<Mesa> Get(int localidad)
    {
      var Mesas = _db.Mesas.Select(x => new Mesa(x.numero, x.localidad))
                          .Where(x => x.localidad.id == localidad).ToList();
      return Mesas;
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
