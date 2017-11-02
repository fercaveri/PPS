using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PPS.Models
{
    public class Telegrama
    {
        [Key]
        public int id { get; set; }
        public String data { get; set; }
        public Mesa mesa { get; set; }

        public Telegrama(String foto, Mesa m)
        {
          this.data = foto;
          this.mesa = m;
        }
        public Telegrama() { }

        public static string Base64Encode(string plainText)
        {
          var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
          return System.Convert.ToBase64String(plainTextBytes);
        }

        public static string Base64Decode(string base64EncodedData)
        {
          var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
          return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }
  }
}
