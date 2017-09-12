using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
  public enum Cargo
  {
    Concejal = 0, DiputadoProvincial = 1, DiputadoNacional = 2, SenadorNacional = 3
  }

  public class Candidato
  {
    [Key]
    public int id { get; set; }
    public Cargo cargo { get; set; }
    public String urlFoto { get; set; }
    public String nombre { get; set; }
    public String apellido { get; set; }
    public String nombreCompleto { get; set; }
    public Localidad localidad { get; set; }
    public PartidoPolitico partido { get; set; }

    public Candidato()
    {

    }

    public Candidato(String nombre, String apellido, Localidad localidad)
    {
      this.urlFoto = "";
      this.cargo = Cargo.Concejal;
      this.nombre = nombre;
      this.apellido = apellido;
      this.nombreCompleto = apellido + ", " + nombre;
      this.localidad = localidad;
      this.partido = null;
    }

    public Candidato(String nombre, String apellido, Localidad localidad, Cargo cargo)
    {
      this.cargo = cargo;
      this.urlFoto = "";
      this.nombre = nombre;
      this.apellido = apellido;
      this.nombreCompleto = apellido + ", " + nombre;
      this.localidad = localidad;
      this.partido = null;
    }

    public Candidato(String nombre, String apellido, Localidad localidad, Cargo cargo, String urlFoto)
    {
      this.cargo = cargo;
      this.urlFoto = urlFoto;
      this.nombre = nombre;
      this.apellido = apellido;
      this.nombreCompleto = apellido + ", " + nombre;
      this.localidad = localidad;
      this.partido = null;
    }

    public Candidato(int id, String nombre, String apellido, Localidad localidad, Cargo cargo, String urlFoto)
    {
      this.id = id;
      this.cargo = cargo;
      this.urlFoto = urlFoto;
      this.nombre = nombre;
      this.apellido = apellido;
      this.nombreCompleto = apellido + ", " + nombre;
      this.localidad = localidad;
      this.partido = null;
    }

    public Candidato(String nombre, String apellido, Localidad localidad, Cargo cargo, String urlFoto, PartidoPolitico partido)
    {
      this.id = id;
      this.cargo = cargo;
      this.urlFoto = urlFoto;
      this.nombre = nombre;
      this.apellido = apellido;
      this.nombreCompleto = apellido + ", " + nombre;
      this.localidad = localidad;
      this.partido = partido;
    }
  }
}
