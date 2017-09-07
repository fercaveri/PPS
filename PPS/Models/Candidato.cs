using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
  public enum Cargo
  {
    Concejal = 0, DiputadoProvincial = 1, DiputadoNacional = 2, SenadorNacional = 3
  }

  public class Candidato : Persona
  {
    public Cargo cargo { get; set; }
    public String urlFoto { get; set; }

    public Candidato(String nombre, String apellido, Cargo cargo) : base(nombre, apellido)
    {
      this.cargo = cargo;
      this.urlFoto = "";
    }

    public Candidato(String nombre, String apellido, Cargo cargo, String urlFoto) : base(nombre, apellido)
    {
      this.cargo = cargo;
      this.urlFoto = urlFoto;
    }
  }
}
