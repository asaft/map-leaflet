using System.Linq.Expressions;
using System.Threading.Tasks;
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

    public List<T> AddBulk(List<T> items)
    {
        _collection.InsertMany(items);
       
        return items;
    }

    public async Task DeleteMany(Expression<Func<T, bool>> filterExpression)
    {
      
        var filter = Builders<T>.Filter.Where(filterExpression);
        await _collection.DeleteManyAsync(filter);
    }

    
}