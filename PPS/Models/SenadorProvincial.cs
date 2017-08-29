using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
    public class SenadorProvincial : Candidato
    {
        public SenadorProvincial(String nombre, String apellido, int DNI, string nombrePartido) : base(nombre, apellido, DNI, nombrePartido)
        {

        }

        public SenadorProvincial(String nombre, String apellido, int DNI, int numeroLista) : base(nombre, apellido, DNI, numeroLista)
        {

        }
    }
}
