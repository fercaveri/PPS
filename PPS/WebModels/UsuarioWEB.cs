using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.WebModels
{
    public class UsuarioWEB
    {
      public int id { get; set; }
      public String usuario { get; set; }
      public String pass { get; set; }
      public String nombreCompleto { get; set; }
      public int rol { get; set; }
  }
}
