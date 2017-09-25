using PPS.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.WebModels
{
  public class CandidatoWEB
  {
    public int cargo { get; set; }
    public String urlFoto { get; set; }
    public String nombre { get; set; }
    public String apellido { get; set; }
    public Localidad localidad { get; set; }
    public int partido { get; set; }
  }
}
