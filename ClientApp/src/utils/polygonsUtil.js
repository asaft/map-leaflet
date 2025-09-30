export class PolygonsUtil{

    static convertToLeatletPolygons(savedPolygons){
          let convertedPolygons = [];
      if(savedPolygons ){
        savedPolygons.forEach(sp =>{
         
         const latLngs =  sp.positions.map(p => [p.latitude,p.longitude])
          const positionArr = [latLngs]
          convertedPolygons.push({positions:positionArr,id:sp.id});

        })
      }
      return convertedPolygons;
    }
}