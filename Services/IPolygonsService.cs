using MapsReact.Models;

namespace MapsReact.Services;

public interface IPoligonService
{
    Polygon AddPolygon(Polygon polygon);
    Task DeletePolygon(string id);
    Task DeletePolygons(List<string> ids);
    Task<List<Polygon>> GetAllPolygons();
}