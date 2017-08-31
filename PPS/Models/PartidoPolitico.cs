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
        public Localidad localidad { get; set; }
        public List<Candidato> candidatos { get; set; }

        public PartidoPolitico(int numLista, String nombre, String localidad)
        {
            this.numeroLista = numLista;
            this.nombre = nombre;
            this.candidatos = new List<Candidato>();
            //this.localidad = LocalidadesController.getLocalidadPorNombre(localidad);
        }

        public void agregarCandidato(Candidato cand)
        {
            candidatos.Add(cand);
        }
    }
}
