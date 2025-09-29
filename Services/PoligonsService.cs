using MapsReact.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace MapsReact.Services;
public class PolygonsService(IMongoDatabase<Polygon> db) : IPoligonService
{
   
    private IMongoDatabase<Polygon> _db = db;

    // public async Task<List<Book>> GetAsync() =>
    //     await _booksCollection.Find(_ => true).ToListAsync();

    // public async Task<Book?> GetAsync(string id) =>
    //     await _booksCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    // public async Task CreateAsync(Book newBook) =>
    //     await _booksCollection.InsertOneAsync(newBook);

    // public async Task UpdateAsync(string id, Book updatedBook) =>
    //     await _booksCollection.ReplaceOneAsync(x => x.Id == id, updatedBook);

    // public async Task RemoveAsync(string id) =>
    //     await _booksCollection.DeleteOneAsync(x => x.Id == id);

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

    public async Task<List<Polygon>> GetAllPolygons()
    {
        return await _db.GetAll();
    }
}