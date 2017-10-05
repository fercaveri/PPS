using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PPS.Data;
using PPS.Misc;
using PPS.Models;
using PPS.WebModels;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Threading.Tasks;

namespace PPS.Controllers
{
  [Route("api/[controller]")]
  public class CandidatoController : Controller
  {

    private ConectorDB _db;

    public CandidatoController(ConectorDB db)
    {
      _db = db;
    }

    // GET api/candidato
    [HttpGet]
    public IEnumerable<Candidato> Get()
    {
      var Candidatos = _db.Candidatos.Include(x => x.localidad).Include(x => x.localidad.provincia).Include(x => x.partido).ToList();
      return Candidatos;
    }

    // GET api/candidato?[nombre&apellido]
    [HttpGet("{localidad}")]
    public IEnumerable<Candidato> Get(String localidad)
    {
      var Candidatos = _db.Candidatos.Where(x => x.localidad.nombreLocalidad == localidad || x.cargo != 0).Include(x => x.localidad)
                                     .Include(x => x.localidad.provincia).Include(x => x.partido).ToList();
      return Candidatos;
    }

    // GET api/candidato/getcargos
    [HttpGet]
    [Route("getcargos")]
    public List<CargoWEB> GetCargos()
    {
      var Cargos = Enum.GetValues(typeof(Cargo)).Cast<Cargo>();
      var Lista = new List<CargoWEB>();
      foreach (Cargo cargo in Cargos)
      {
        string nombreCargo = cargo.ToString();
        Type type = cargo.GetType();
        string name = Enum.GetName(type, cargo);
        if (name != null)
        {
          FieldInfo field = type.GetField(name);
          if (field != null)
          {
            DescriptionAttribute attr =
                   Attribute.GetCustomAttribute(field,
                     typeof(DescriptionAttribute)) as DescriptionAttribute;
            if (attr != null)
            {
              nombreCargo = attr.Description;
            }
          }
        }
        Lista.Add(new CargoWEB((int)cargo, nombreCargo));
      }
      return Lista;
    }

    [HttpPost]
    public HttpResponseMessage Post([FromBody] CandidatoWEB obj)
    {
      Cargo cargo = (Cargo)obj.cargo;

      Localidad localidad = _db.Localidades.Find(obj.localidad.id);
      if (localidad == null)
      {
        Provincia pcia = _db.Provincias.Find(obj.localidad.provincia);
        if (pcia == null)
        {
          pcia = new Provincia(obj.localidad.provincia.nombreProvincia);
        }
        localidad = new Localidad(obj.localidad.nombreLocalidad, pcia);
      }
      PartidoPolitico partido = _db.Partidos.Find(obj.partido);
      var Candidatos = _db.Candidatos.Select(x => new Candidato(x.id, x.nombre, x.apellido, x.localidad, x.cargo, x.urlFoto, x.partido))
                          .Where( x => x.partido.nombre == partido.nombre && x.cargo == cargo).FirstOrDefault();
      if(Candidatos == null || obj.cargo == 0)
      {
        string foto = "";
        if (obj.urlFoto == "")
        {
          foto = "/9j/4AAQSkZJRgABAQEAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/wAALCABLAEsBAREA/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/9oACAEBAAA/APsuikd1RC7sFVRkknAA9a51/F1ncMY9Csr7XXBI32SDyAfeZysf5MT7VGb/AMcTJug8O6Jb8/dudWctj32QkD8zSPqvjS2Km58KWN2nf+z9WDP+CzRxj/x6rGl+LtKu72PT7tbrSdQkOI7TUYTC8h9EJykn/AGaugoooqDULy20+xnvbyZYbeCMySSN0VQMk1zcWkT+JnF94jidbA4a20h+EA6h7gf8tHP9w/KvTBIzXURokaKiKFVRhVAwAPQelOoqpqmnWOqWMljqNpDd20g+eKVAyn8D396wLWS68J3cFld3M95odxKIra5ncvLZyMcLHI55eNjhVc/MCQrE5BHV0UVznifN/wCIdF0MgNAzvf3Kk/eSHbsU+xleM/8AAK6Kiiiiqmr2FvqmmXOnXab4LmJopB7MMce/eqXgm9ub/wAMWU16d12itBct6yxMY3P4shP41s0VzL8fE5N38WjNs/Cdd380rpaKKKKQ9K5/wCGGnajn7p1i/KcdvtL/ANc10VBrhfDrQy+Lorm/1C9Gpf6dCsMk4MTBZl3KqEfKQghYbeoJJyRmu5oooopK4vwcbBvEW/Q3m+wSwXE8h+0PIkxecbZeSQMsJ9uOq+2MdtRXIXuj28nj+0mkyJY3OpWrEcCQRG2mX8Y3jP1FdbS0UUVHcCRreRYWRZCpCF1yAccZHcVzHw10W00XTJLSxaVrW0Cafblzk+Xbgp1/3zKfTnHausorP1zSbXVrQwzqyyKG8mVHZHiYqVyrKQRwab4bu2vtBsrmQkytColz1Eg+Vx+DAitGiiiuf8VYvb7StEDSAXNwZ5xG7KRDCNxOVII+cxDr3rcs7aCztY7a2iWKGNdqIo4AqWijqK5m+nTwre3F/cSbdEupBJMx5+yTMQC3/XNyRn+6xJ6MSvRRSJLGskbK6OAyspyCD0IPpT6Kz/EGs6doOlTanqlwILeIEk4LMxwTtVRyzHHAGSapeGbW6nuZtf1OMR3V4ipDBwfs0A5VCR1YklmI4yQBkKCd6iiiuR1zV4Ne1OLw1osq3kkdzG+pzwndHZxo4cozDjzHKhQnUAliABzoPok+nyvc+Hp0tt7bpLKXJtpD3IA5jY+q8dypqRNdaMbb/SNUtpR1Eds1wp+jR5BH1wfYVHNrGo3JMOkaJdO548+9U28Ke5z87fQL+IqCXwqt3a3kmqXrXupXNtLbi4ZMJbq6lSIY84Qc8nJY92NTeBtY/tTRkhulEOqWOLbUbYn5oZlAz/wFvvKf4lYGt+iivKfEt3d618b7fwZqF3cPoL6abiSzjlaISPz99kIZl/2SSvtXpml2FlptlHZadZ29naxZEcMEYRFGewHAq1RgUYorzn40SPoltpfiXSW+yat/aVrYtcx9ZIJHw0bjo68kjcDtJJGDXobsRCWB5AqmLiX+9+gr/9k=";
        }
        else
        {
          foto = Utils.GetBase64FromUrl(obj.urlFoto, 75, 75); // 75 de alto y ancho
        }
        Candidato candidato = new Candidato(obj.nombre, obj.apellido, localidad, cargo, foto, partido);
        _db.Candidatos.Add(candidato);
        _db.SaveChanges();
        return new HttpResponseMessage(HttpStatusCode.OK);
      }
      return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
      
    }

    [HttpPatch]
    public HttpResponseMessage Edit(int id, [FromBody] CandidatoWEB cand)
    {
      Candidato candidato = _db.Candidatos.Find(id);
      if(candidato != null)
      {
        candidato.nombre = cand.nombre;
        candidato.apellido = cand.apellido;
        Cargo c;
        if (cand.cargo == 0) { c = Cargo.Concejal; }
        else if (cand.cargo == 1) { c = Cargo.DiputadoProvincial; }
        else if (cand.cargo == 2) { c = Cargo.DiputadoNacional; }
        else { c = Cargo.SenadorNacional; }
        candidato.cargo = c;
        candidato.localidad = _db.Localidades.Where(x => x.id == cand.localidad.id).Include(x => x.provincia).FirstOrDefault();
        candidato.urlFoto = cand.urlFoto;
        candidato.partido = _db.Partidos.Find(cand.partido);
        _db.Update(candidato);
        _db.SaveChanges();
        return new HttpResponseMessage(HttpStatusCode.OK);
      }
      return new HttpResponseMessage(HttpStatusCode.NotFound);
    }

    [HttpDelete]
    public HttpResponseMessage Delete(int id)
    {
      Candidato candidato = _db.Candidatos.Find(id);
      if (candidato != null)
      {
        _db.Candidatos.Remove(candidato);
        _db.SaveChanges();
        return new HttpResponseMessage(HttpStatusCode.OK);
      }
      return new HttpResponseMessage(HttpStatusCode.NotAcceptable);
    }
  }
}
