using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
    public class Concejal : Candidato
    {
        public Concejal(string nombre, string apellido, int DNI, string nombrePartido) : base(nombre, apellido, DNI, nombrePartido)
        {
        }
    }
}
