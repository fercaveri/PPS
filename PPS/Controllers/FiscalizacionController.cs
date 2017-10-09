using Microsoft.AspNetCore.Mvc;
using PPS.Data;
using PPS.Models;
using PPS.WebModels;
using System;
using System.Collections.Generic;
using System.Linq;
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
  }
}
