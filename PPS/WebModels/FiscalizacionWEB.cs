using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.WebModels
{
  public class FiscalizacionWEB
  {
    public UsuarioWEB usuario { get; set; }
    public int mesa { get; set; }
    public String localidad { get; set; }
    public String provincia { get; set; }
  }
}
