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
      Provincia nacional = new Provincia("Nacional");

      PartidoPolitico pro = new PartidoPolitico("Pro", provinciaBsAs);
      var provincias = new Provincia[] { provinciaBsAs, provinciaCba, provinciaSalta, provinciaCorrientes, nacional };
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
        context.Localidades.Add(new Localidad("", provinciaBsAs));
        context.Localidades.Add(new Localidad("", nacional));
        context.SaveChanges();
      }
      if (!context.Partidos.Any())
      {
        context.Partidos.Add(pro);
        context.SaveChanges();
      }
      Candidato presidente = new Candidato("Gaston", "Sturla", context.Localidades.Find(3), Cargo.Concejal, "/9j/4AAQSkZJRgABAQEAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/wAALCABLAEsBAREA/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/9oACAEBAAA/APsuikd1RC7sFVRkknAA9a51/F1ncMY9Csr7XXBI32SDyAfeZysf5MT7VGb/AMcTJug8O6Jb8/dudWctj32QkD8zSPqvjS2Km58KWN2nf+z9WDP+CzRxj/x6rGl+LtKu72PT7tbrSdQkOI7TUYTC8h9EJykn/AGaugoooqDULy20+xnvbyZYbeCMySSN0VQMk1zcWkT+JnF94jidbA4a20h+EA6h7gf8tHP9w/KvTBIzXURokaKiKFVRhVAwAPQelOoqpqmnWOqWMljqNpDd20g+eKVAyn8D396wLWS68J3cFld3M95odxKIra5ncvLZyMcLHI55eNjhVc/MCQrE5BHV0UVznifN/wCIdF0MgNAzvf3Kk/eSHbsU+xleM/8AAK6Kiiiiqmr2FvqmmXOnXab4LmJopB7MMce/eqXgm9ub/wAMWU16d12itBct6yxMY3P4shP41s0VzL8fE5N38WjNs/Cdd380rpaKKKKQ9K5/wCGGnajn7p1i/KcdvtL/ANc10VBrhfDrQy+Lorm/1C9Gpf6dCsMk4MTBZl3KqEfKQghYbeoJJyRmu5oooopK4vwcbBvEW/Q3m+wSwXE8h+0PIkxecbZeSQMsJ9uOq+2MdtRXIXuj28nj+0mkyJY3OpWrEcCQRG2mX8Y3jP1FdbS0UUVHcCRreRYWRZCpCF1yAccZHcVzHw10W00XTJLSxaVrW0Cafblzk+Xbgp1/3zKfTnHausorP1zSbXVrQwzqyyKG8mVHZHiYqVyrKQRwab4bu2vtBsrmQkytColz1Eg+Vx+DAitGiiiuf8VYvb7StEDSAXNwZ5xG7KRDCNxOVII+cxDr3rcs7aCztY7a2iWKGNdqIo4AqWijqK5m+nTwre3F/cSbdEupBJMx5+yTMQC3/XNyRn+6xJ6MSvRRSJLGskbK6OAyspyCD0IPpT6Kz/EGs6doOlTanqlwILeIEk4LMxwTtVRyzHHAGSapeGbW6nuZtf1OMR3V4ipDBwfs0A5VCR1YklmI4yQBkKCd6iiiuR1zV4Ne1OLw1osq3kkdzG+pzwndHZxo4cozDjzHKhQnUAliABzoPok+nyvc+Hp0tt7bpLKXJtpD3IA5jY+q8dypqRNdaMbb/SNUtpR1Eds1wp+jR5BH1wfYVHNrGo3JMOkaJdO548+9U28Ke5z87fQL+IqCXwqt3a3kmqXrXupXNtLbi4ZMJbq6lSIY84Qc8nJY92NTeBtY/tTRkhulEOqWOLbUbYn5oZlAz/wFvvKf4lYGt+iivKfEt3d618b7fwZqF3cPoL6abiSzjlaISPz99kIZl/2SSvtXpml2FlptlHZadZ29naxZEcMEYRFGewHAq1RgUYorzn40SPoltpfiXSW+yat/aVrYtcx9ZIJHw0bjo68kjcDtJJGDXobsRCWB5AqmLiX+9+gr/9k=", pro);

      if (!context.Candidatos.Any())
      {
        Candidato vice = new Candidato("Fernando", "Caveri", context.Localidades.Find(1), Cargo.SenadorNacional, "/9j/4AAQSkZJRgABAQEAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/wAALCABLAEsBAREA/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/9oACAEBAAA/APsuikd1RC7sFVRkknAA9a51/F1ncMY9Csr7XXBI32SDyAfeZysf5MT7VGb/AMcTJug8O6Jb8/dudWctj32QkD8zSPqvjS2Km58KWN2nf+z9WDP+CzRxj/x6rGl+LtKu72PT7tbrSdQkOI7TUYTC8h9EJykn/AGaugoooqDULy20+xnvbyZYbeCMySSN0VQMk1zcWkT+JnF94jidbA4a20h+EA6h7gf8tHP9w/KvTBIzXURokaKiKFVRhVAwAPQelOoqpqmnWOqWMljqNpDd20g+eKVAyn8D396wLWS68J3cFld3M95odxKIra5ncvLZyMcLHI55eNjhVc/MCQrE5BHV0UVznifN/wCIdF0MgNAzvf3Kk/eSHbsU+xleM/8AAK6Kiiiiqmr2FvqmmXOnXab4LmJopB7MMce/eqXgm9ub/wAMWU16d12itBct6yxMY3P4shP41s0VzL8fE5N38WjNs/Cdd380rpaKKKKQ9K5/wCGGnajn7p1i/KcdvtL/ANc10VBrhfDrQy+Lorm/1C9Gpf6dCsMk4MTBZl3KqEfKQghYbeoJJyRmu5oooopK4vwcbBvEW/Q3m+wSwXE8h+0PIkxecbZeSQMsJ9uOq+2MdtRXIXuj28nj+0mkyJY3OpWrEcCQRG2mX8Y3jP1FdbS0UUVHcCRreRYWRZCpCF1yAccZHcVzHw10W00XTJLSxaVrW0Cafblzk+Xbgp1/3zKfTnHausorP1zSbXVrQwzqyyKG8mVHZHiYqVyrKQRwab4bu2vtBsrmQkytColz1Eg+Vx+DAitGiiiuf8VYvb7StEDSAXNwZ5xG7KRDCNxOVII+cxDr3rcs7aCztY7a2iWKGNdqIo4AqWijqK5m+nTwre3F/cSbdEupBJMx5+yTMQC3/XNyRn+6xJ6MSvRRSJLGskbK6OAyspyCD0IPpT6Kz/EGs6doOlTanqlwILeIEk4LMxwTtVRyzHHAGSapeGbW6nuZtf1OMR3V4ipDBwfs0A5VCR1YklmI4yQBkKCd6iiiuR1zV4Ne1OLw1osq3kkdzG+pzwndHZxo4cozDjzHKhQnUAliABzoPok+nyvc+Hp0tt7bpLKXJtpD3IA5jY+q8dypqRNdaMbb/SNUtpR1Eds1wp+jR5BH1wfYVHNrGo3JMOkaJdO548+9U28Ke5z87fQL+IqCXwqt3a3kmqXrXupXNtLbi4ZMJbq6lSIY84Qc8nJY92NTeBtY/tTRkhulEOqWOLbUbYn5oZlAz/wFvvKf4lYGt+iivKfEt3d618b7fwZqF3cPoL6abiSzjlaISPz99kIZl/2SSvtXpml2FlptlHZadZ29naxZEcMEYRFGewHAq1RgUYorzn40SPoltpfiXSW+yat/aVrYtcx9ZIJHw0bjo68kjcDtJJGDXobsRCWB5AqmLiX+9+gr/9k=", pro);
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
      if (!context.Usuarios.Any())
      {
        context.Usuarios.Add(new Usuario("sadmin", "sadmin", "Super Administrador", 2));
        context.SaveChanges();
      }
    }
  }
}
