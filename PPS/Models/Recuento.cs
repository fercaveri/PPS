using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
    public class Recuento
    {
        [Key]
        public int id { get; set; }
        public Candidato candidato { get; set; }
        public int votos { get; set; }
        public Mesa mesa { get; set; }

        public Recuento (Candidato c, int votos, Mesa m)
        {
        this.candidato = c;
        this.votos = votos;
        this.mesa = m;
        }

        public Recuento() { }
    }
}
