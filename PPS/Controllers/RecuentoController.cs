using Microsoft.AspNetCore.Mvc;
using PPS.Data;
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
  public class RecuentoController : Controller
    {
    private ConectorDB _db;

    public RecuentoController(ConectorDB db)
    {
      _db = db;
    }

    [HttpPost]
    public HttpResponseMessage Post([FromBody] RecuentoWEB obj)
    {
      var candidato = _db.Candidatos.Find(obj.candidato);
      var mesa = _db.Mesas.Find(obj.mesa);
      Console.WriteLine(obj.candidato);
      Console.WriteLine(obj.mesa);
      if(mesa != null && candidato != null)
      {
        _db.Recuentos.Add(new Models.Recuento(candidato, obj.votos, mesa ));
        _db.SaveChanges();
        return new HttpResponseMessage(HttpStatusCode.OK);
      }
      return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
    }
    }
}
