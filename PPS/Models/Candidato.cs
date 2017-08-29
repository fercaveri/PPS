using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
    public class Candidato : Persona
    {
        private PartidoPolitico partidoPolitico;
        public Candidato(String nombre, String apellido, int DNI, string nombrePartido) : base(nombre, apellido, DNI)
        {
            //this.partidoPolitico = API_PartidosPoliticos.GetPartidoPorNombre(nombrePartido);
        }

        public Candidato(String nombre, String apellido, int DNI, int numeroLista) : base(nombre, apellido, DNI)
        {
            //this.partidoPolitico = API_PartidosPoliticos.GetPartidoPorLista(nombrePartido);
        }
    }
}
