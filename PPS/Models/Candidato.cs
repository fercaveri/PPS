using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
    public enum Cargo
    {
        Concejal, DiputadoProvincial , DiputadoNacional, SenadorProvincial, SenadorNacional
    }

    [Table("Candidato")]
    public class Candidato : Persona
    {
        public PartidoPolitico partidoPolitico { get; set; }
        private Cargo? cargo { get; set; }

        public Candidato(String nombre, String apellido, int DNI, string nombrePartido, Cargo cargo) : base(nombre, apellido, DNI)
        {
            //this.partidoPolitico = API_PartidosPoliticos.GetPartidoPorNombre(nombrePartido);
        }

        public Candidato(String nombre, String apellido, int DNI, int numeroLista, Cargo cargo) : base(nombre, apellido, DNI)
        {
            //this.partidoPolitico = API_PartidosPoliticos.GetPartidoPorLista(nombrePartido);
        }
    }
}
