using MapsReact.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace MapsReact.Services;

public class MarkersService:IMarkersService
{
    private readonly IMongoCollection<Polygon> _objectsCollection;
    private IMongoDatabase<Marker> _db;

    public MarkersService(IMongoDatabase<Marker> db, IOptions<MapStoreDatabaseSettings> mapStoreDatabaseSettings)
    {
        _db = db;
        _db.SetConn(mapStoreDatabaseSettings.Value.ObjectsCollectionName);
    }

    public Marker AddMarker(Marker marker)
    {
        _db.Add(marker);
        return marker;
    }

    public List<Marker> AddMarkers(List<Marker> markers)
    {
        _db.AddBulk(markers);
        return markers;
    }

    public async Task DeleteMarker(string id)
    {
        await _db.Delete(id);
    }

    public async Task<List<Marker>> GetAllMarkers()
    {
        return  await _db.GetAll();
    }
}