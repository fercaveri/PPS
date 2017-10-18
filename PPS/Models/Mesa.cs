using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
  public class Mesa
  {
    public int id { get; set; }
    public int numero { get; set; }
    public Circuito circuito { get; set; }
    public Localidad localidad { get; set; }

    public Mesa(int id, int numero, Circuito c)
    {
      this.id = id;
      this.circuito = c;
      this.numero = numero;
    }

    public Mesa(int numero , Circuito c)
    {
      this.numero = numero;
      this.circuito = c;
    }

    public Mesa(int id, int numero, Localidad l)
    {
      this.id = id;
      this.numero = numero;
      this.localidad = l;
    }
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
