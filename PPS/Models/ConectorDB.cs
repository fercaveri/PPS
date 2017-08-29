using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PPS.Models
{
    public class ConectorDB : DbContext
    {
        public ConectorDB(DbContextOptions<ConectorDB> options)
            : base(options)
        {
        }

        public DbSet<Candidato> Candidatos { get; set; }
    }
}
