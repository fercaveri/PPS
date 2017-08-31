using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PPS.Data;

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
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            //var Partidos = _db.PartidoPolitico.All();
            return new string[] { "UCR", "Union Civica Radical" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
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
