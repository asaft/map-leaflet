namespace MapsReact.Models;

public class MapStoreDatabaseSettings
{
    public string ConnectionString { get; set; } = String.Empty;

    public string DatabaseName { get; set; } = String.Empty;

    public string PoligonsCollectionName { get; set; } = String.Empty;
    public string ObjectsCollectionName { get; set; } = String.Empty;
}