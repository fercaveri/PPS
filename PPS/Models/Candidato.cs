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

    public class Candidato : Persona
    {
        public PartidoPolitico partidoPolitico { get; set; }
        public Cargo? cargo { get; set; }
        //public Localidad localidad { get; set; }

        public Candidato(String nombre, String apellido, int DNI, int numeroLista, Cargo cargo) : base(nombre, apellido, DNI)
        {
            //this.partidoPolitico = API_PartidosPoliticos.GetPartidoPorLista(nombrePartido);
        }
    }
}
