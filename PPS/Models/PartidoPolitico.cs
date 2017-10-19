using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
  public class PartidoPolitico
  {
    [Key]
    public int numeroLista { get; set; }
    public String nombre { get; set; }
    public Provincia provincia { get; set; }
    public String color { get; set; }

    public PartidoPolitico(String nombre, Provincia provincia)
    {
      this.nombre = nombre;
      this.provincia = provincia;
      this.color = "#ffffff";
    }

    public PartidoPolitico(int numeroLista, String nombre, Provincia provincia)
    {
      this.numeroLista = numeroLista;
      this.nombre = nombre;
      this.provincia = provincia;
      this.color = "#ffffff";
    }

    public PartidoPolitico(String nombre, Provincia provincia, String color)
    {
      this.nombre = nombre;
      this.provincia = provincia;
      this.color = color;
    }

    public PartidoPolitico(int numeroLista, String nombre, Provincia provincia, String color)
    {
      this.numeroLista = numeroLista;
      this.nombre = nombre;
      this.provincia = provincia;
      this.color = color;
    }

    public PartidoPolitico() { }
  }
}
