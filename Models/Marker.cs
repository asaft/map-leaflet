using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MapsReact.Models;

public class Marker
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public string? Id { get; set; }
  public string? Name { get; set; } = "marker";
  public double Latitude { get; set; }
  public double Longitude { get; set; }
}