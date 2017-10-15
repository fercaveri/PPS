using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PPS.Data;
using PPS.Models;
using PPS.WebModels;
using System.Net.Http;
using System.Net;
using Microsoft.EntityFrameworkCore;

namespace PPS.Controllers
{
  [Route("api/[controller]")]
  public class PartidoPoliticoController : Controller
  {
    private ConectorDB _db;

    public PartidoPoliticoController(
        ConectorDB db)
    {
      _db = db;
    }
    // GET api/partidopolitico
    [HttpGet]
    public IEnumerable<PartidoPolitico> Get()
    {
      var Partidos = _db.Partidos.Select(x => new PartidoPolitico(x.numeroLista, x.nombre, x.provincia)).ToList();
      return Partidos;
    }

    // GET api/candidato/getnombres
    [HttpGet]
    [Route("getnombres")]
    public IEnumerable<String> GetNombres()
    {
      var Partidos = _db.Partidos.Select(x => x.nombre).ToList();
      return Partidos;
    }

    // GET api/candidato/getlista
    [Route("getlista")]
    [HttpGet]
    public IEnumerable<Candidato> GetLista(int numeroLista)
    {
      return _db.Candidatos.Where(x => x.partido.numeroLista == numeroLista).Include(x => x.localidad).Include(x => x.localidad.provincia).ToList();
    }

    // POST api/partidopolitico
    [HttpPost]
    public HttpResponseMessage Add([FromBody]PartidoWEB partido)
    {
      if (_db.Partidos.Find(partido.numeroLista) == null)
      {
        Provincia prov = _db.Provincias.Find(partido.nombreProvincia);
        _db.Add(new PartidoPolitico(partido.nombrePartido, prov));
        _db.SaveChanges();
        return new HttpResponseMessage(HttpStatusCode.OK);
      }
      return new HttpResponseMessage(HttpStatusCode.NotModified);
    }

    // PUT api/values/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody]string value)
    {
    }

    // DELETE api/values/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
