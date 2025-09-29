using System.Threading.Tasks;
using MapsReact.Models;
using MapsReact.Services;
using Microsoft.AspNetCore.Mvc;

namespace MapsReact.Controllers;

[ApiController]
[Route("api/[controller]")]
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
        return  await _poligonService.GetAllPolygons();
    }
      [HttpPost]
    public  void Post(Polygon polygon)
    {
        _poligonService.AddPolygon(polygon);
    }
}
