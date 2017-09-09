using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models_Web
{
    public class LocalidadWeb
    {
      public String nombre { get; set; }
      public String provincia { get; set; }

      public LocalidadWeb() { }
      public LocalidadWeb(String nombre, String provincia)
      {
        this.nombre = nombre;
        this.provincia = provincia;
      }
    }
}
