using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.WebModels
{
  public class LocalidadWEB
  {
    public int id { get; set; }
    public String nombre { get; set; }
    public String provincia { get; set; }
    public int numeroMesas { get; set; }
  }
}
