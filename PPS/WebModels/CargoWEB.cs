using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PPS.Models;

namespace PPS.WebModels
{
  public class CargoWEB
  {

    public int numero { get; set; }
    public string nombre { get; set; }

    public CargoWEB(int numero, string nombre)
    {
      this.numero = numero;
      this.nombre = nombre;
    }

  }
}
