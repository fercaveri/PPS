using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
    public class Provincia
    {
        [Key]
        public String nombreProvincia { get; set; }

        public Provincia(){ }

        public Provincia (String nombre)
        {
            this.nombreProvincia = nombre;
        }

    }
}
