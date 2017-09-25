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
      //_db.Recuentos.Add(new Models.Recuento(obj.mesa, obj.candidato, obj.votos));
      return new HttpResponseMessage(HttpStatusCode.OK);
    }
    }
}
