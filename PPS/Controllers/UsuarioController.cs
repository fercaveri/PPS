using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PPS.Data;
using PPS.Models;
using System.Net.Http;
using System.Net;

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
  }
}
