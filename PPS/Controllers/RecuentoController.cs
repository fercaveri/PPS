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

    //api/recuento/votoxmesa
    [HttpGet]
    [Route("votoxmesa")]
    public int getVotosMesa(int idMesa, int cargo, String partido)
    {
      Cargo c = this.getCargo(cargo);
      Recuento recuento = (_db.Recuentos.Where(x => x.candidato.partido.nombre == partido && x.candidato.cargo == c && x.mesa.id == idMesa).FirstOrDefault());
      if (recuento != null)
      {
        Console.WriteLine("Devolvi " + recuento.votos + " votos");
        return recuento.votos;
      }
      Console.WriteLine("Devolvi " + 0 + " votos");
      return 0;
    }

    //api/recuento/votoxlocalidad
    [HttpGet]
    [Route("votoxlocalidad")]
    public int getVotosLocalidad(String localidad, int cargo, String partido)
    {
      Cargo c = this.getCargo(cargo);
      List<Recuento> recuentos = (_db.Recuentos.Where(x => x.candidato.partido.nombre == partido && x.candidato.cargo == c && x.mesa.localidad.nombreLocalidad == localidad).ToList());
      int cantVotos = 0;
      for (int i = 0; i < recuentos.Count; i++)
      {
        cantVotos += recuentos[i].votos;
      }
      Console.WriteLine("Devolvi " + cantVotos + " votos");
      return cantVotos;
    }

    //api/recuento/votoxprovincia
    [HttpGet]
    [Route("votoxprovincia")]
    public int getVotosProvincia(String provincia, int cargo, String partido)
    {
      Cargo c = this.getCargo(cargo);
      List<Recuento> recuentos = (_db.Recuentos.Where(x => x.candidato.partido.nombre == partido && x.candidato.cargo == c && x.mesa.localidad.provincia.nombreProvincia == provincia).ToList());
      int cantVotos = 0;
      for (int i = 0; i < recuentos.Count; i++)
      {
        cantVotos += recuentos[i].votos;
      }
      Console.WriteLine("Devolvi " + cantVotos + " votos");
      return cantVotos;
    }

    //api/recuento/votopais
    [HttpGet]
    [Route("votopais")]
    public int getVotosPais(int cargo, String partido)
    {
      Cargo c = this.getCargo(cargo);
      List<Recuento> recuentos = (_db.Recuentos.Where(x => x.candidato.partido.nombre == partido && x.candidato.cargo == c).ToList());
      int cantVotos = 0;
      for (int i = 0; i < recuentos.Count; i++)
      {
        cantVotos += recuentos[i].votos;
      }
      Console.WriteLine("Devolvi " + cantVotos + " votos");
      return cantVotos;
    }

    //api/recuento/todosporunalocalidad
    [HttpGet]
    [Route("todosporunamesa")]
    public IEnumerable<Object> recuentosPorUnaMesa(int mesa , int localidadID, int cargo)
    {
      Cargo c = this.getCargo(cargo);
      List<int> idPartidos = _db.Partidos.Select(x => x.numeroLista).ToList();
      List<Object> itemLocalidad = new List<Object>();
      for (int i = 0; i < idPartidos.Count; i++)
      {
        var recuentos = _db.Recuentos.Where(x => x.candidato.cargo == c && x.candidato.partido.numeroLista == idPartidos[i]
                                            && x.mesa.id == mesa).ToList();
        int total = 0;
        for (int j = 0; j < recuentos.Count; j++)
        {
          total += recuentos[j].votos;
        }
        itemLocalidad.Add(new { votos = total, id = idPartidos[i] });
      }
      return itemLocalidad;
    }

    //api/recuento/todosporunalocalidad
    [HttpGet]
    [Route("todosporunalocalidad")]
    public IEnumerable<Object> recuentosPorUnaLocalidad(int localidadID, int cargo)
    {
      Cargo c = this.getCargo(cargo);
      List<int> idPartidos = _db.Partidos.Select(x => x.numeroLista).ToList();
      List<Object> itemLocalidad = new List<Object>();
      for (int i = 0; i < idPartidos.Count; i++)
      {
        var recuentos = _db.Recuentos.Where(x => x.candidato.cargo == c && x.candidato.partido.numeroLista == idPartidos[i]
                                            && x.mesa.localidad.id == localidadID).ToList();
        int total = 0;
        for (int j = 0; j < recuentos.Count; j++)
        {
          total += recuentos[j].votos;
        }
        itemLocalidad.Add(new { votos = total, id = idPartidos[i] });
      }
      return itemLocalidad;
    }

    //api/recuento/todosporprovincia
    [HttpGet]
    [Route("todosporprovincia")]
    public IEnumerable<Object> recuentosPorProvincia(int cargo)
    {
      Cargo c = this.getCargo(cargo);
      List<int> idPartidos = _db.Partidos.Select(x => x.numeroLista).ToList();
      List<String> provincias = _db.Provincias.Select(x => x.nombreProvincia).ToList();
      List<Object> itemProvincia = new List<Object>();
      for (int k = 0; k < provincias.Count; k++)
      {
        List<Object> itemPartido = new List<Object>();
        for (int i = 0; i < idPartidos.Count; i++)
        {
          var recuentos = _db.Recuentos.Where(x => x.candidato.cargo == c && x.candidato.partido.numeroLista == idPartidos[i]
                                              && x.mesa.localidad.provincia.nombreProvincia == provincias[k]).ToList();
          int total = 0;
          for (int j = 0; j < recuentos.Count; j++)
          {
            total += recuentos[j].votos;
          }
          itemPartido.Add(new { votos = total, id = idPartidos[i] });
        }
        itemProvincia.Add(new { provincia = provincias[k], partidos = itemPartido });
      }
      return itemProvincia;
    }

    //api/recuento/todosporpais
    [HttpGet]
    [Route("todosporpais")]
    public IEnumerable<Object> recuentosPorPais(int cargo)
    {
      Cargo c = this.getCargo(cargo);
      List<int> idPartidos = _db.Partidos.Select(x => x.numeroLista).ToList();
      List<Object> totales = new List<Object>();
      for (int i = 0; i < idPartidos.Count; i++)
      {
        var recuentos = _db.Recuentos.Where(x => x.candidato.cargo == c && x.candidato.partido.numeroLista == idPartidos[i]).ToList();
        int total = 0;
        for (int j = 0; j < recuentos.Count; j++)
        {
          total += recuentos[j].votos;
        }
        totales.Add(new { votos = total, id = idPartidos[i] });
      }
      return totales;
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
    [HttpPatch]
    [Route("editxmesa")]
    public HttpResponseMessage editxMesa([FromBody]RecuentoWEB r)
    {
      Console.WriteLine(r.mesa);
      Console.WriteLine(r.votos);
      Console.WriteLine(r.candidato);
      Console.WriteLine(r.partido);
      Cargo c = this.getCargo(r.candidato);
      Recuento recuento = (_db.Recuentos.Where(x => x.candidato.partido.nombre == r.partido && x.candidato.cargo == c && x.mesa.id == r.mesa).FirstOrDefault());
      if (recuento != null)
      {
        recuento.votos = r.votos;
        _db.Recuentos.Update(recuento);
        _db.SaveChanges();
        return new HttpResponseMessage(HttpStatusCode.OK);
      }
      else if (recuento == null && r.votos > 0)
      {
        Candidato cand = _db.Candidatos.Where(x => x.cargo == getCargo(r.candidato) && x.partido.nombre == r.partido).FirstOrDefault();
        Mesa m = _db.Mesas.Find(r.mesa);
        Recuento nuevoRecuento = new Recuento(cand, r.votos, m);
        if (cand != null && m != null)
        {
          _db.Recuentos.Add(nuevoRecuento);
          _db.SaveChanges();
          return new HttpResponseMessage(HttpStatusCode.OK);
        }
        return new HttpResponseMessage(HttpStatusCode.NotFound);
      }
      return new HttpResponseMessage(HttpStatusCode.NotFound);
    }

    //api/recuento/predecirMesa?idMesa=X
    [HttpGet]
    [Route("predecirMesa")]
    public IEnumerable<int> PredecirMesa(int idMesa, int idLocalidad, int cargo)
    {
      var partidos = _db.Partidos.ToList();
      List<int> votosPredecidos = new List<int>();
      foreach(PartidoPolitico p in partidos)
      {
        votosPredecidos.Add(predecirMesa(p,idMesa,idLocalidad, cargo));
      }
      List<int> porcentajes = new List<int>();
      int totalVotos=0;
      foreach(int i in votosPredecidos)
      {
        totalVotos += i;
      }
      Console.WriteLine("Votos totales:" + totalVotos);
      foreach (int i in votosPredecidos)
      {
        porcentajes.Add(i*100/totalVotos);
      }
      return porcentajes;
    }

    //api/recuento/predecirLocalidad?idLocalidad=X
    [HttpGet]
    [Route("predecirLocalidad")]
    public IEnumerable<int> PredecirLocalidad(int idLocalidad, int cargo)
    {
      var partidos = _db.Partidos.ToList();
      List<int> votosPredecidos = new List<int>();
      foreach (PartidoPolitico p in partidos)
      {
        votosPredecidos.Add(predecirLocalidad(p, idLocalidad, cargo));
      }
      List<int> porcentajes = new List<int>();
      int totalVotos = 0;
      foreach (int i in votosPredecidos)
      {
        totalVotos += i;
      }
      Console.WriteLine("Votos totales:" + totalVotos);
      foreach (int i in votosPredecidos)
      {
        porcentajes.Add(i * 100 / totalVotos);
      }
      return porcentajes;
    }

    //api/recuento/predecirLocalidad?idLocalidad=X
    [HttpGet]
    [Route("predecirProvincia")]
    public IEnumerable<int> PredecirProvincia(String idProvincia, int cargo)
    {
      var partidos = _db.Partidos.ToList();
      List<int> votosPredecidos = new List<int>();
      foreach (PartidoPolitico p in partidos)
      {
        votosPredecidos.Add(predecirProvincia(p, idProvincia, cargo));
      }
      List<int> porcentajes = new List<int>();
      int totalVotos = 0;
      foreach (int i in votosPredecidos)
      {
        totalVotos += i;
      }
      Console.WriteLine("Votos totales:" + totalVotos);
      foreach (int i in votosPredecidos)
      {
        porcentajes.Add(i * 100 / totalVotos);
      }
      return porcentajes;
    }

    [HttpGet]
    [Route("predecirPais")]
    public IEnumerable<int> PredecirPais(int cargo)
    {
      var partidos = _db.Partidos.ToList();
      List<int> votosPredecidos = new List<int>();
      foreach (PartidoPolitico p in partidos)
      {
        votosPredecidos.Add(predecirPais(p, cargo));
      }
      List<int> porcentajes = new List<int>();
      int totalVotos = 0;
      foreach (int i in votosPredecidos)
      {
        totalVotos += i;
      }
      Console.WriteLine("Votos totales:" + totalVotos);
      foreach (int i in votosPredecidos)
      {
        porcentajes.Add(i * 100 / totalVotos);
      }
      return porcentajes;
    }

    private int predecirMesa(PartidoPolitico p , int idMesa, int idLocalidad, int cargo)
    {
      List<int> porcentajes = new List<int>();
      List<Mesa> mesas = _db.Mesas.Select(x => new Mesa(x.id, x.numero, x.localidad)).Where(x => x.localidad.id == idLocalidad && x.id!=idMesa).ToList();
      foreach(Mesa m in mesas){
        var votos = this.getVotosMesa(m.id, cargo, p.nombre);

        porcentajes.Add(votos);
      }
      var suma = 0;
      foreach(int i in porcentajes)
      {
        suma += i;
      }
      var prediccion = suma / porcentajes.Count();
      return prediccion;
    }

    private int predecirLocalidad(PartidoPolitico p, int idLocalidad, int cargo)
    {
      List<int> porcentajes = new List<int>();
      List<Mesa> mesas = _db.Mesas.Select(x => new Mesa(x.id, x.numero, x.localidad)).Where(x => x.localidad.id == idLocalidad ).ToList();
      foreach (Mesa m in mesas)
      {
        var votosMesa = this.predecirMesa(p, m.id, idLocalidad, cargo);

        porcentajes.Add(votosMesa);
      }
      var suma = 0;
      foreach (int i in porcentajes)
      {
        suma += i;
      }
      var prediccion = suma / porcentajes.Count();
      return prediccion;
    }

    private int predecirProvincia(PartidoPolitico p, String idProvincia, int cargo)
    {
      List<int> porcentajes = new List<int>();
      List<Mesa> mesas = _db.Mesas.Where(x => x.localidad.provincia.nombreProvincia == idProvincia).Include(x => x.localidad).ToList();
      foreach (Mesa m in mesas)
      {
        var votosMesa = this.predecirMesa(p, m.id, m.localidad.id, cargo);

        porcentajes.Add(votosMesa);
      }
      var suma = 0;
      foreach (int i in porcentajes)
      {
        suma += i;
      }
      var prediccion = suma / porcentajes.Count();
      return prediccion;
    }

    private int predecirPais(PartidoPolitico p, int cargo)
    {
      List<int> porcentajes = new List<int>();
      List<Mesa> mesas = _db.Mesas.Include(x => x.localidad).ToList();
      foreach (Mesa m in mesas)
      {
        var votosMesa = this.predecirMesa(p, m.id, m.localidad.id, cargo);

        porcentajes.Add(votosMesa);
      }
      var suma = 0;
      foreach (int i in porcentajes)
      {
        suma += i;
      }
      var prediccion = suma / porcentajes.Count();
      return prediccion;
    }

    private Cargo getCargo(int cargo)
    {
      Cargo c;
      if (cargo == 0)
      {
        c = Cargo.Concejal;
      }
      else if (cargo == 1)
      {
        c = Cargo.DiputadoNacional;
      }
      else if (cargo == 2)
      {
        c = Cargo.DiputadoProvincial;
      }
      else
      {
        c = Cargo.SenadorNacional;
      }
      return c;
    }
  }
}
