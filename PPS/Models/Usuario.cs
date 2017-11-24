using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
  public enum Rol
  {
    Normal = 0,
    Admin = 1,
    SuperAdmin = 2
  }

  public class Usuario
  {
    [Key]
    public int id { get; set; }
    public string usuario { get; set; }
    public string pass { get; set; }
    public string nombreCompleto { get; set; }
    public Rol rol { get; set; } = 0;

    public Usuario()
    {

    }

    public Usuario(string usuario, string contraseña, string nombreCompleto, int rol)
    {
      this.usuario = usuario;
      this.pass = contraseña;
      this.nombreCompleto = nombreCompleto;
      this.rol = (Rol)rol;
    }
    public Usuario(string usuario, string contraseña, string nombreCompleto, Rol rol)
    {
      this.usuario = usuario;
      this.pass = contraseña;
      this.nombreCompleto = nombreCompleto;
      this.rol = rol;
    }
  }
}
