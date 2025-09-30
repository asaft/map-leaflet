export class MarkersUtil{
    static convertToLeafletMarkers(markers){
        if(markers && markers.length > 0){
            let convertedMarkers = markers.map(m=>({geocode:[m.latitude,m.longitude],popUp:'',id:m.id}));

            return convertedMarkers;
        }
        return [];

    }
}