using MapsReact.Models;

namespace MapsReact.Services;

public interface IMarkersService
{
    Marker AddMarker(Marker marker);
    Task DeleteMarker(string id);
    Task<List<Marker>> GetAllMarkers();
}