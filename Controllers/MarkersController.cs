using MapsReact.Models;
using MapsReact.Services;
using Microsoft.AspNetCore.Mvc;

namespace MapsReact.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class MarkersController : ControllerBase
{





    private readonly IMarkersService _markersService;

    public MarkersController(IMarkersService markersService)
    {
        _markersService = markersService;
    }

    [HttpGet]
    public async Task<IEnumerable<Marker>> Get()
    {
        return await _markersService.GetAllMarkers();
    }
    [HttpPost]
    public void Post(Marker marker)
    {
        _markersService.AddMarker(marker);
    }
     [HttpPost]
    public  void PostBulk(List<Marker> markers)
    {
        _markersService.AddMarkers(markers);
    }
}
