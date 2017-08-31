using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
    [Table("PartidoPolitico")]
    public class PartidoPolitico
    {
        [Key]
        public int numeroLista { get; set; }
        public String nombre { get; set; }
        private List<Candidato> candidatos;

        public PartidoPolitico(int numLista, String nombre)
        {
            this.numeroLista = numLista;
            this.nombre = nombre;
            this.candidatos = new List<Candidato>();
        }

        public void addCandidato(Candidato c)
        {
            candidatos.Add(c);
        }

        public void removeCandidato(int dni)
        {
            foreach(Candidato c in candidatos)
            {
                if(c.DNI == dni)
                {
                    candidatos.Remove(c);
                }
            }
        }
    }
}
