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
    [Route("api/fiscalizacion")]
    public class FiscalizacionController : Controller
    {
        private ConectorDB _db;

        public FiscalizacionController(ConectorDB db)
        {
          _db = db;
        }

        [HttpGet]
        public Fiscalizacion Get(UsuarioWEB user)
        {
          var fiscalizacion = _db.Fiscales.Select(x => new Fiscalizacion(x.user, x.mesa)).Where( x => x.user.usuario == user.user && x.user.contraseña == user.pass).FirstOrDefault();
          return fiscalizacion;
        }

    [HttpPost]
    [Route("xprov")]
    public HttpResponseMessage PostProvincia([FromBody] FiscalizacionWEB obj)
    {
      Localidad l = _db.Localidades.Select(x => new Localidad(x.id , x.nombreLocalidad, x.provincia)).Where(x => x.nombreLocalidad == "" && x.provincia.nombreProvincia == obj.provincia).FirstOrDefault();
      Usuario u = _db.Usuarios.Where(x => x.usuario == obj.usuario.user && x.contraseña == obj.usuario.pass).FirstOrDefault();
      Fiscalizacion f = new Fiscalizacion(l.id , u);
      _db.Fiscales.Add(f);
      _db.SaveChanges();
      return new HttpResponseMessage(HttpStatusCode.OK);
    }

    [HttpPost]
    [Route("xlocalidad")]
    public HttpResponseMessage PostLocalidad([FromBody] FiscalizacionWEB obj)
    {
      Localidad l = _db.Localidades.Select(x => new Localidad(x.id , x.nombreLocalidad, x.provincia)).Where(x => x.nombreLocalidad == obj.localidad).FirstOrDefault();
      Usuario u = _db.Usuarios.Where(x => x.usuario == obj.usuario.user && x.contraseña == obj.usuario.pass).FirstOrDefault();
      Console.WriteLine("Usuario es:"+u.id);
      Fiscalizacion f = new Fiscalizacion(l.id , u);
      _db.Fiscales.Add(f);
      _db.SaveChanges();
      return new HttpResponseMessage(HttpStatusCode.OK);
    }

    [HttpPost]
    [Route("xmesa")]
    public HttpResponseMessage PostMesa([FromBody] FiscalizacionWEB obj)
    {
      Usuario u = _db.Usuarios.Where(x => x.usuario == obj.usuario.user && x.contraseña == obj.usuario.pass).FirstOrDefault();
      Fiscalizacion f = new Fiscalizacion(u, obj.mesa);
      _db.Fiscales.Add(f);
      _db.SaveChanges();
      return new HttpResponseMessage(HttpStatusCode.OK);
    }
  }
}
