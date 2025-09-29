public interface IMongoDatabase<T>
{
    void SetConn(string collectionName);
    T Add(T marker);
    Task Delete(string id);
    Task<List<T>> GetAll();
}