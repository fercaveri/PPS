using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
  public class Persona
  {
    public String nombre { get; set; }
    public String apellido { get; set; }
    [Key]
    public String nombreCompleto { get; set; }

    public Persona(String nombre, String apellido)
    {
      this.nombre = nombre;
      this.apellido = apellido;
      this.nombreCompleto = apellido + ", " + nombre;
    }
  }
}
