using MapsReact.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

public class MongoDatabaseService<T> : IMongoDatabase<T>
{
    private readonly IMongoDatabase mongoDatabase;
    private  IMongoCollection<T> _collection;

    public MongoDatabaseService(IOptions<MapStoreDatabaseSettings> mapStoreDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            mapStoreDatabaseSettings.Value.ConnectionString);

         mongoDatabase = mongoClient.GetDatabase(
            mapStoreDatabaseSettings.Value.DatabaseName);
        _collection = mongoDatabase.GetCollection<T>(
            mapStoreDatabaseSettings.Value.PoligonsCollectionName);
    }

    public void SetConn( string collectionName)
    {
        _collection = mongoDatabase.GetCollection<T>(collectionName);
    }

    public T Add(T marker)
    {
        _collection.InsertOne(marker);
        return marker;
    }

    public async Task Delete(string id)
    {
        var filter = Builders<T>.Filter.Eq("_id", ObjectId.Parse(id));
        await _collection.DeleteOneAsync(filter);
    }

    public async Task<List<T>> GetAll()
    {
        return await _collection.Find(_ => true).ToListAsync();
    }
}