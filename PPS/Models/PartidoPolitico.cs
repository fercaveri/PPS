using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
    public class PartidoPolitico
    {
        public int numeroLista { get; set; }
        public String nombre { get; set; }

        public PartidoPolitico(int numLista, String nombre)
        {
            this.numeroLista = numLista;
            this.nombre = nombre;
        }
    }
}
