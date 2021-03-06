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
  public class ProvinciaController : Controller
  {
    private ConectorDB _db;

    public ProvinciaController(
        ConectorDB db)
    {
      _db = db;
    }
    // GET api/provincia
    [HttpGet]
    public IEnumerable<Provincia> Get()
    {
      var Provincias = _db.Provincias.Select(x => new Provincia(x.nombreProvincia)).ToList();
      return Provincias;
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public string Get(int id)
    {
      return "value";
    }

    // POST api/values
    [HttpPost("{nombreProvincia}")]
    public void Post([FromBody]string nombreProvincia)
    {

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
