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
        public int mesa { get; set; }
        public int localidad { get; set; }

        //Cuando puedan subir datos solo a una mesa
        public Fiscalizacion(Usuario user, int m)
        {
          this.user = user;
          this.mesa = m;
          this.localidad = -1;
        }

        //Cuando puedan subir datos solo a una localidad o provincia
        public Fiscalizacion(int l, Usuario user)
        {
          this.user = user;
          this.localidad = l;
          this.mesa = -1;
        }

        public Fiscalizacion() { }
        public Fiscalizacion(int id, Usuario u, int l, int m)
        {
          this.id = id;
          this.user = u;
          this.localidad = l;
          this.mesa = m;
        }
  }
}
