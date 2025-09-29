using MapsReact.Models;
using MapsReact.Services;
using Microsoft.AspNetCore.Mvc;

namespace MapsReact.Controllers;

[ApiController]
[Route("api/[controller]")]
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
        return  await _markersService.GetAllMarkers();
    }
      [HttpPost]
    public  void Post(Marker polygon)
    {
        _markersService.AddMarker(polygon);
    }
}
