using Microsoft.EntityFrameworkCore;
using PPS.Models;

namespace PPS.Data
{
    public class ConectorDB : DbContext
    {
        public ConectorDB(DbContextOptions<ConectorDB> options) : base(options)
        {
        }

        public DbSet<Persona> Personas { get; set; }
        public DbSet<Candidato> Candidatos { get; set; }
        public DbSet<PartidoPolitico> Partidos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Persona>().ToTable("Personas");
            modelBuilder.Entity<Candidato>().ToTable("Candidatos");
            modelBuilder.Entity<PartidoPolitico>().ToTable("Partidos");
    }
    }
}
