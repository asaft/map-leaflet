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
    public async Task<IEnumerable<Polygon>> DeleteAsync(List<string>ids)
    {
        await _poligonService.DeletePolygons(ids);
        return await _poligonService.GetAllPolygons();
    }
}
