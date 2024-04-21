import {MapContainer, TileLayer, Marker} from 'react-leaflet';
import L from 'leaflet';

import iconImage from '../../assets/img/pin.svg';
import iconActiveImage from '../../assets/img/pin-active.svg';
import {Hotel} from '../../types/types';

interface IProps {
  cities: Hotel[];
  loading: string;
  activePin: number | string | null;
}

function Map({cities, loading, activePin}: IProps): JSX.Element {
  const icon = new L.Icon({
    iconUrl: iconImage,
  });

  const iconActive = new L.Icon({
    iconUrl: iconActiveImage,
  });

  if (loading === 'loading') {
    return <div>loader</div>;
  }

  if (cities.length === 0) {
    return <div>loader</div>;
  }

  return (
    <MapContainer
      className="markercluster-map"
      center={[cities[0].location.latitude, cities[0].location.longitude]}
      zoom={12}
      maxZoom={18}
      style={{height: '100%', overflow: 'hidden'}}
      key={cities[0].city.name}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cities.map((item) => (
        <Marker
          position={[item.location.latitude, item.location.longitude]}
          key={item.id}
          icon={activePin === item.id ? iconActive : icon}
        />
      ))}
    </MapContainer>
  );
}

export default Map;
