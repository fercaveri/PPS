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
        public String nombre { get; set; }

        public Provincia (String nombre)
        {
            this.nombre = nombre;
        }

    }
}
