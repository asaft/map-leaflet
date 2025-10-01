using System.Threading.Tasks;
using MapsReact.Models;
using MapsReact.Services;
using Microsoft.AspNetCore.Mvc;

namespace MapsReact.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class PolygonsController : ControllerBase
{


    private readonly IPoligonService _poligonService;

    public PolygonsController(IPoligonService poligonService)
    {
        _poligonService = poligonService;
    }

    [HttpGet]
    public async Task<IEnumerable<Polygon>> Get()
    {
        return await _poligonService.GetAllPolygons();
    }
    [HttpPost]
    public IActionResult Post(Polygon polygon)
    {
        _poligonService.AddPolygon(polygon);
        return Ok(polygon);
    }
    [HttpPost]
    public async Task<ActionResult<IEnumerable<Polygon>>> BulkDelete(PolygonDeleteDTO polygonDeleteDTO)
    {
        await _poligonService.DeletePolygons(polygonDeleteDTO.Ids ?? []);
        return await _poligonService.GetAllPolygons();
    }
}
public class PolygonDeleteDTO
{ 
   public List<string>? Ids { get; set; }
}
