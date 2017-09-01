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

            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
            
            Provincia provinciaBsAs = new Provincia("Buenos Aires");
            Provincia provinciaCba = new Provincia("Cordoba");

            var provincias = new Provincia[] { provinciaBsAs, provinciaCba };
            foreach (Provincia p in provincias)
            {
                context.Provincias.Add(p);
            }

            var localidades = new Localidad[]
            {
            new Localidad("San Miguel",provinciaBsAs),
            new Localidad("Jose C. Paz",provinciaBsAs),
            new Localidad("Malvinas Argentinas",provinciaBsAs),
            new Localidad("Pilar",provinciaBsAs)

            };
            foreach (Localidad l in localidades )
            {
                context.Localidades.Add(l);
            }
            context.SaveChanges();
        }
    }
}
