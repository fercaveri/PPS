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
      var Candidatos = _db.Candidatos.Select(x => new Candidato(x.nombre, x.apellido, x.cargo)).ToList();
      return Candidatos;
    }

    // GET api/candidato?[nombre&apellido]
    [HttpGet]
    public IEnumerable<Candidato> Get(String nombre, String apellido)
    {
      var Candidatos = _db.Candidatos.Select(x => new Candidato(x.nombre, x.apellido, x.cargo))
                          .Where(x => x.nombre.ToLower() == nombre.ToLower() &&
                                 x.apellido.ToLower() == apellido.ToLower()).ToList();
      return Candidatos;
    }

    [HttpPost]
    public HttpResponseMessage Add([FromBody] Candidato candidato)
    {
      _db.Candidatos.Add(candidato);
      _db.SaveChanges();
      return new HttpResponseMessage();
    }
  }
}
