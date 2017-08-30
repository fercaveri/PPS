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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Persona>().ToTable("Personas");
        }
    }
}
