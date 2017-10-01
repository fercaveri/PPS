using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PPS.Data;
using PPS.Models;
using System.Net.Http;
using System.Net;
using PPS.WebModels;

namespace PPS.Controllers
{
  [Route("api/[controller]")]
  public class UsuarioController
    {
        private ConectorDB _db;
        public UsuarioController (ConectorDB db)
        {
          _db= db;
        }
        // GET api/usuario
        [HttpGet("{usuario,pass}")]
        public HttpResponseMessage Get(String usuario, String pass)
        {
            var usuarios = _db.Usuarios.Select(x => new Usuario(x.usuario, x.contraseña, x.nombreCompleto, (int)x.rol)).Where(x => x.usuario == usuario && x.contraseña == pass).FirstOrDefault();
            if (usuarios == null)
            {
              return new HttpResponseMessage(HttpStatusCode.NotFound);
            }
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPost]
        public HttpResponseMessage Post([FromBody] UsuarioWEB user)
        {
          var usuario = _db.Usuarios.Select(x => new Usuario(x.usuario, x.contraseña, x.nombreCompleto, (int)x.rol)).Where(x => x.usuario == user.user && x.contraseña == user.pass).FirstOrDefault();
          if (usuario == null)
          {
            _db.Usuarios.Add(new Usuario(user.user, user.pass, user.fullName, user.role));
            _db.SaveChanges();
            return new HttpResponseMessage(HttpStatusCode.OK);
          }
          return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
        }
  }
}
