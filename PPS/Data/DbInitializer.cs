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

            // Look for any students.
            if (context.Personas.Any())
            {
                return;   // DB has been seeded
            }

            var personas = new Persona[]
            {
            new Persona("Gaston","Sturla",39169586),
            new Persona("Fernando","Caveri",38256120)
            };
            foreach (Persona p in personas)
            {
                context.Personas.Add(p);
            }
            context.SaveChanges();
        }
    }
}
