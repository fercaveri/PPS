using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace PPS.Misc
{
    public static class Utils
    {
    /// <summary>
    /// Resize the image to the specified width and height.
    /// </summary>
    /// <param name="image">The image to resize.</param>
    /// <param name="width">The width to resize to.</param>
    /// <param name="height">The height to resize to.</param>
    /// <returns>The resized image.</returns>
    public static Bitmap ResizeImage(Image image, int width, int height)
    {
      var destRect = new Rectangle(0, 0, width, height);
      var destImage = new Bitmap(width, height);

      destImage.SetResolution(image.HorizontalResolution, image.VerticalResolution);

      using (var graphics = Graphics.FromImage(destImage))
      {
        graphics.CompositingMode = CompositingMode.SourceCopy;
        graphics.CompositingQuality = CompositingQuality.HighQuality;
        graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
        graphics.SmoothingMode = SmoothingMode.HighQuality;
        graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;

        using (var wrapMode = new ImageAttributes())
        {
          wrapMode.SetWrapMode(WrapMode.TileFlipXY);
          graphics.DrawImage(image, destRect, 0, 0, image.Width, image.Height, GraphicsUnit.Pixel, wrapMode);
        }
      }

      return destImage;
    }

    public static string ToBase64(Bitmap image)
    {
      System.IO.MemoryStream stream = new System.IO.MemoryStream();
      image.Save(stream, System.Drawing.Imaging.ImageFormat.Bmp);
      byte[] imageBytes = stream.ToArray();
      return Convert.ToBase64String(imageBytes);
    }

    public static Image DownloadImageFromUrl(string url)
    {
      WebClient wc = new WebClient();
      byte[] bytes = wc.DownloadData(url);
      MemoryStream ms = new MemoryStream(bytes);
      return Image.FromStream(ms);
    }

    public static string GetBase64FromUrl(string image, int ancho, int alto)
    {
      return Utils.ToBase64(Utils.ResizeImage(Utils.DownloadImageFromUrl(image), ancho, alto));
    }
  }
}
