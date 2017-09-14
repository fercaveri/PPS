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
            //context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
      
            Provincia provinciaBsAs = new Provincia("Buenos Aires");
            Provincia provinciaCba = new Provincia("Cordoba");
            Provincia provinciaSalta = new Provincia("Salta");
            Provincia provinciaCorrientes = new Provincia("Corrientes");
            
            PartidoPolitico pro = new PartidoPolitico("Pro", provinciaBsAs);
            var provincias = new Provincia[] { provinciaBsAs, provinciaCba, provinciaSalta, provinciaCorrientes };
            if (!context.Provincias.Any())
            {

              foreach (Provincia p in provincias)
              {
                context.Provincias.Add(p);
              }
              context.SaveChanges();

            }
            if (!context.Localidades.Any())
            {
              context.Localidades.Add(new Localidad("Jose C. Paz", provinciaBsAs));
              context.Localidades.Add(new Localidad("Merlo", provinciaBsAs));
              context.Localidades.Add(new Localidad("Rio Cuarto", provinciaCba));
              context.Localidades.Add(new Localidad("San Miguel", provinciaBsAs));
              context.SaveChanges();
            }
            if (!context.Partidos.Any())
            { 
              context.Partidos.Add(pro);
              context.SaveChanges();
            }
            Candidato presidente = new Candidato("Gaston", "Sturla", context.Localidades.Find(3), Cargo.Concejal, "https://image.freepik.com/vector-gratis/hombre-de-la-cara-de-dibujos-animados_17-1006085726.jpg", pro);

            if (!context.Candidatos.Any())
            {
              Candidato vice = new Candidato("Fernando", "Caveri", context.Localidades.Find(1), Cargo.SenadorNacional, "https://image.freepik.com/vector-gratis/hombre-de-la-cara-de-dibujos-animados_17-1006085726.jpg",pro);
              context.Candidatos.Add(presidente);
              context.Candidatos.Add(vice);
              context.SaveChanges();
            }
            Mesa m1 = new Mesa(context.Localidades.Find(2));
            if (!context.Mesas.Any())
            {
              context.Mesas.Add(m1);
              context.SaveChanges();
            }
            if (!context.Recuentos.Any())
            {
              Recuento r = new Recuento(presidente, 20, m1);
              context.Recuentos.Add(r);
              context.SaveChanges();
            }




    }
  }
}
