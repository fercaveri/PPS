using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
    public class Circuito
    {
        [Key]
        public int id { get; set; }
        public int numero { get; set; }
        public Localidad localidad { get; set; }

        public Circuito(int n , Localidad l)
        {
          this.numero = n;
          this.localidad = l;
        }

        public Circuito(int id , int n, Localidad l)
        {
          this.id = id;
          this.numero = n;
          this.localidad = l;
        }

        public Circuito(){}
  }
}
