using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
    public class Localidad
    {
        [Key]
        public String nombreLocalidad { get; set; }
        public Provincia provincia { get; set; }

        public Localidad()
        {

        }
        public Localidad(String nombre, Provincia provincia)
        {
            this.nombreLocalidad = nombre;
            this.provincia = provincia;
        }
    }
}
