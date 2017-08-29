using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
    public class Persona
    {
        private String nombre;
        private String apellido;
        private String nombreCompleto;
        private int DNI;

        public Persona(String nombre, String apellido, int DNI)
        {
            this.nombre = nombre;
            this.apellido = apellido;
            nombreCompleto = apellido + ", " + nombre;
            this.DNI = DNI;
        }
    }
}
