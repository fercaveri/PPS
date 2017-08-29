using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
    public class PartidoPolitico
    {
        public int lista { get; set; }
        public String nombre { get; set; }

        public PartidoPolitico(int lista, String nombre)
        {
            this.lista = lista;
            this.nombre = nombre;
        }
    }
}
