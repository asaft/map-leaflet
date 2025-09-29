using MapsReact.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace MapsReact.Services;

public class MarkersService:IMarkersService
{
    private readonly IMongoCollection<Polygon> _objectsCollection;

    public MarkersService(IOptions<MapStoreDatabaseSettings> mapStoreDatabaseSettings)
    {
         var mongoClient = new MongoClient(
            mapStoreDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            mapStoreDatabaseSettings.Value.DatabaseName);

        _objectsCollection = mongoDatabase.GetCollection<Polygon>(
            mapStoreDatabaseSettings.Value.PoligonsCollectionName);
    }

    public Marker AddMarker(Marker marker)
    {
        throw new NotImplementedException();
    }

    public Task DeleteMarker(string id)
    {
        throw new NotImplementedException();
    }

    public Task<List<Marker>> GetAllMarkers()
    {
        throw new NotImplementedException();
    }
}