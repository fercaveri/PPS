using Microsoft.AspNetCore.Mvc;
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
    public class TelegramaController : Controller
    {
      private ConectorDB _db;

      public TelegramaController(ConectorDB db)
      {
        _db = db;
      }

      [HttpGet]
      public String Get(int numeroMesa)
      {
          var telegrama = _db.Telegramas.Select(x => new Telegrama(x.data, x.mesa)).Where( x => x.mesa.id == numeroMesa).FirstOrDefault();
          if(telegrama != null)
          {
              return telegrama.data;
          }
          return null;
          
      }

      [HttpPost]
      public HttpResponseMessage Post([FromBody] TelegramaWEB tel)
      {
          var telegrama = _db.Telegramas.Select(x => new Telegrama(x.data, x.mesa)).Where(x => x.mesa.numero == tel.mesa);
          if(telegrama == null)
          {
             Mesa mesa = _db.Mesas.Select(x => new Mesa(x.numero, x.localidad)).Where(x => x.numero == tel.mesa).First();
            _db.Telegramas.Add(new Telegrama(tel.foto, mesa));
            _db.SaveChanges();
            return new HttpResponseMessage(HttpStatusCode.OK);
          }
          return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
      } 
    }
}
