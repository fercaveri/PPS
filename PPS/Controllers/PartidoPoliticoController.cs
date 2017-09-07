using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PPS.Data;
using PPS.Models;

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

    // POST api/values
    [HttpPost]
    public void Post([FromBody]PartidoPolitico partido)
    {
      try
      {
        _db.Partidos.Add(partido);
      }
      catch(Exception ex)
      {
        Console.WriteLine(ex);
      }
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
