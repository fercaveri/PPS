using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
    public class Localidad
    {
        public String nombre { get; set; }
        public Provincia provincia { get; set; }
    }
}
