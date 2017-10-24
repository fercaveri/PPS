using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
    public class Fiscalizacion
    {
        [Key]
        public int id { get; set; }
        public Usuario user { get; set; }
        public Mesa mesa { get; set; }
        public Localidad localidad { get; set; }

        //Cuando puedan subir datos solo a una mesa
        public Fiscalizacion(Usuario user, Mesa m)
        {
          this.user = user;
          this.mesa = m;
        }

        //Cuando puedan subir datos solo a una localidad o provincia
        public Fiscalizacion(Usuario user, Localidad l)
        {
          this.user = user;
          this.localidad = l;
        }

        public Fiscalizacion() { }
        public Fiscalizacion(int id, Usuario u, Localidad l, Mesa m)
        {
          this.id = id;
          this.user = u;
          this.localidad = l;
          this.mesa = m;
        }
  }
}
