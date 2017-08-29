using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
    public class Persona
    {
        public String nombre { get; set; } 
        public String apellido { get; set; }
        public String nombreCompleto { get; set; }
        public int DNI { get; set; }

        public Persona(String nombre, String apellido, int DNI)
        {
            this.nombre = nombre;
            this.apellido = apellido;
            nombreCompleto = apellido + ", " + nombre;
            this.DNI = DNI;
        }
    }
}
