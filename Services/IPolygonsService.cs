using MapsReact.Models;

namespace MapsReact.Services;

public interface IPoligonService
{
    Polygon AddPolygon(Polygon polygon);
    Task DeletePolygon(string id);
    Task<List<Polygon>> GetAllPolygons();
}