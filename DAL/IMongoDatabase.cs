using System.Linq.Expressions;

public interface IMongoDatabase<T>
{
    void SetConn(string collectionName);
    T Add(T item);
    List<T> AddBulk(List<T> items);
    Task Delete(string id);
    Task<List<T>> GetAll();
    Task DeleteMany(Expression<Func<T, bool>> filterExpression);
}