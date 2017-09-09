using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PPS.Data;
using PPS.Models;
using System.Net.Http;

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
      var Provincias = _db.Provincias.Select(x => new Provincia(x.nombre)).ToList();
      return Provincias;
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public string Get(int id)
    {
      return "value";
    }

    // POST api/values
    [HttpPost]
    public HttpResponseMessage Post([FromBody]Provincia provincia)
    {
      _db.Provincias.Add(provincia);
      _db.SaveChanges();
      return new HttpResponseMessage();
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
