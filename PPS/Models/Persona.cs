using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
    [Table("Persona")]
    public class Persona
    {
        [Key]
        public int DNI { get; set; }
        public String nombre { get; set; } 
        public String apellido { get; set; }
        public String nombreCompleto { get; set; }

        public Persona(String nombre, String apellido, int DNI)
        {
            this.nombre = nombre;
            this.apellido = apellido;
            this.nombreCompleto = apellido + ", " + nombre;
            this.DNI = DNI;
        }
    }
}
