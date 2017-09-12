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

    public PartidoPolitico(int numLista, String nombre, Provincia provincia)
    {
      this.numeroLista = numLista;
      this.nombre = nombre;
    }

    public PartidoPolitico() { }
  }
}
