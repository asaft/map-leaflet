using System.Linq.Expressions;
using MapsReact.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace MapsReact.Services;
public class PolygonsService(IMongoDatabase<Polygon> db) : IPoligonService
{
   
    private IMongoDatabase<Polygon> _db = db;

    public Polygon AddPolygon(Polygon polygon)
    {
        polygon.DateCreated = DateTime.Now;
        _db.Add(polygon);
        return polygon;
    }

    public async Task DeletePolygon(string id)
    {
       
          await _db.Delete(id);
    }

    public async Task DeletePolygons(List<string> ids)
    {
      
        Expression<Func<Polygon, bool>> exp = p => ids.Contains(p.Id!);
          await _db.DeleteMany(exp);
    }

    public async Task<List<Polygon>> GetAllPolygons()
    {
        return await _db.GetAll();
    }
}