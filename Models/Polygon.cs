using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MapsReact.Models;
public class Polygon
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public DateTime? DateCreated { get; set; }

    public List<LatLng>? Positions { get; set; }
}