using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PPS.Data;
using PPS.Models;
using PPS.WebModels;
using System;
using System.Collections;
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

    [HttpGet]
    public IEnumerable<Recuento> Get(int idMesa)
    {
      var recuentos = _db.Recuentos.Where(x => x.mesa.id == idMesa).Include(x => x.candidato).Include(x => x.candidato.localidad)
                                                                   .Include(x => x.candidato.localidad.provincia)
                                                                   .Include(x => x.mesa).Include(x => x.mesa.localidad)
                                                                   .Include(x => x.mesa.localidad.provincia).ToList();
      return recuentos;
    }

    //api/recuento/votoxcargo
    [HttpGet]
    [Route("votoxcargo")]
    public int getVotos(int idMesa, int cargo, String partido)
    {
      Cargo c;
      if(cargo == 0){
        c = Cargo.Concejal;
      } else if(cargo == 1){
        c = Cargo.DiputadoNacional;
      } else if(cargo == 2){
        c = Cargo.DiputadoProvincial;
      } else{
        c = Cargo.SenadorNacional;
      }
      List<Recuento> recuentos = (_db.Recuentos.Where(x => x.candidato.partido.nombre == partido && x.candidato.cargo == c).ToList());
      int cantVotos = 0;
      for (int i = 0; i < recuentos.Count; i++)
      {
        cantVotos += recuentos[i].votos;
      }
      Console.WriteLine("Devolvi "+ cantVotos+ " votos");
      return cantVotos;
    }

    [HttpPost]
    public HttpResponseMessage Post([FromBody] RecuentoWEB obj)
    {
      var candidato = _db.Candidatos.Find(obj.candidato);
      var mesa = _db.Mesas.Find(obj.mesa);
      Console.WriteLine(obj.candidato);
      Console.WriteLine(obj.mesa);
      if (mesa != null && candidato != null)
      {
        _db.Recuentos.Add(new Models.Recuento(candidato, obj.votos, mesa));
        _db.SaveChanges();
        return new HttpResponseMessage(HttpStatusCode.OK);
      }
      return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
    }

    [HttpPatch]
    public HttpResponseMessage Patch([FromBody] RecuentoWEB obj)
    {
      Recuento recuento = _db.Recuentos.Where(x => x.mesa.id == obj.mesa && x.candidato.id == obj.candidato).FirstOrDefault();
      if (recuento != null)
      {
        recuento.votos = obj.votos;
        _db.Recuentos.Update(recuento);
        _db.SaveChanges();
        return new HttpResponseMessage(HttpStatusCode.OK);
      }
      else
      {
        var candidato = _db.Candidatos.Find(obj.candidato);
        var mesa = _db.Mesas.Find(obj.mesa);
        if (candidato != null && mesa != null)
        {
          _db.Recuentos.Add(new Models.Recuento(candidato, obj.votos, mesa));
          _db.SaveChanges();
          return new HttpResponseMessage(HttpStatusCode.OK);
        }
        return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
      }
    }
  }
}
