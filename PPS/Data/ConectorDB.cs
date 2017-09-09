using Microsoft.EntityFrameworkCore;
using PPS.Models;

namespace PPS.Data
{
    public class ConectorDB : DbContext
    {
        public ConectorDB(DbContextOptions<ConectorDB> options) : base(options)
        {
        }
           
        public DbSet<Localidad> Localidades { get; set; }
        public DbSet<Persona> Personas { get; set; }
        public DbSet<Candidato> Candidatos { get; set; }
        public DbSet<PartidoPolitico> Partidos { get; set; }
        public DbSet<Provincia> Provincias { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Provincia>().ToTable("Provincias");
            modelBuilder.Entity<Localidad>().ToTable("Localidades");
            modelBuilder.Entity<Persona>().ToTable("Personas");
            modelBuilder.Entity<Candidato>().ToTable("Candidatos");
            modelBuilder.Entity<PartidoPolitico>().ToTable("Partidos");
        }
    }
}
