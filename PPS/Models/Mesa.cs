using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
  public class Mesa
  {
    [Key]
    public int numero { get; set; }
    public Localidad localidad { get; set; }

    public Mesa(int numero, Localidad l)
    {
      this.numero = numero;
      this.localidad = l;
    }

    public Mesa(Localidad l)
    {
      this.localidad = l;
    }

    public Mesa() { }
  }
}
