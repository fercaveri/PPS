using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PPS.Models;

namespace PPS.Data
{
    public class DbInitializer
    {

        public static void Initialize(ConectorDB context)
        {
            context.Database.EnsureCreated();
            if (context.Candidatos.Any()) { return; }
            Candidato presidente = new Candidato("Gaston", "Sturla", context.Localidades.Find("San Miguel"), Cargo.Concejal, "https://image.freepik.com/vector-gratis/hombre-de-la-cara-de-dibujos-animados_17-1006085726.jpg");
            context.Candidatos.Add(presidente);
            context.SaveChanges();
            if (context.Provincias.Any()||context.Partidos.Any())
            {
              return;
            }
            
            Provincia provinciaBsAs = new Provincia("Buenos Aires");
            Provincia provinciaCba = new Provincia("Cordoba");
            Provincia provinciaSalta = new Provincia("Salta");
            Provincia provinciaCorrientes = new Provincia("Corrientes");

            var provincias = new Provincia[] { provinciaBsAs, provinciaCba, provinciaSalta , provinciaCorrientes};
            foreach (Provincia p in provincias)
            {
                context.Provincias.Add(p);
            }
            context.SaveChanges();

            context.Localidades.Add(new Localidad("Jose C. Paz", provinciaBsAs));
            context.SaveChanges();            
        }
    }
}
