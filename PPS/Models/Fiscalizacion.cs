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

        //Los user solo podran subir a la mesa seleccionada
        public Fiscalizacion(Usuario user, Mesa m)
        {
          this.user = user;
          this.mesa = m;
        }

        //Los admin podran subir fotos de telegrama de cualquier mesa correspondiente a su localidad
        public Fiscalizacion(Usuario user, Localidad l)
        {
          this.user = user;
          this.localidad = l;
        }
  }
}
