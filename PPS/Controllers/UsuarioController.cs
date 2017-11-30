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
    public UsuarioController(ConectorDB db)
    {
      _db = db;
    }
    // GET api/usuario
    [HttpGet]
    public int Get(String usuario, String pass)
    {
      var usuarios = _db.Usuarios.Select(x => new Usuario(x.usuario, x.pass, x.nombreCompleto, (int)x.rol)).Where(x => x.usuario == usuario && x.pass == pass).ToList();
      if (usuarios.Any())
      {
        Usuario u = (Usuario) usuarios.First();
        return (int) u.rol;
      }
      else
      {
        return -1;
      }
    }

    [HttpGet]
    [Route("getAll")]
    public IEnumerable<Usuario> getAll()
    {
      var users = this._db.Usuarios.Select(x => new Usuario(x.usuario,x.pass,x.nombreCompleto,x.rol)).ToList();
      return users;
    }

    [HttpPost]
    public HttpResponseMessage Post([FromBody] UsuarioWEB user)
    {
      var usuario = _db.Usuarios.Select(x => new Usuario(x.usuario, x.pass, x.nombreCompleto, (int)x.rol)).Where(x => x.usuario == user.user).FirstOrDefault();
      if (usuario == null)
      {
        _db.Usuarios.Add(new Usuario(user.user, user.pass, user.fullName, user.role));
        _db.SaveChanges();
        return new HttpResponseMessage(HttpStatusCode.OK);
      }
      return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
    }

    [HttpDelete]
    public HttpResponseMessage Delete(String user)
    {
      try
      {
        Usuario usuario = _db.Usuarios.Where(x => x.usuario == user).FirstOrDefault();
        _db.Usuarios.Remove(usuario);
        _db.SaveChanges();
        return new HttpResponseMessage(HttpStatusCode.OK);
      }
      catch
      {
        return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
      }
    }
  }
}
