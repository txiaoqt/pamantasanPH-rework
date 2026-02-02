import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { University } from './UniversityCard';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapViewProps {
  universities: University[];
}

export default function MapView({ universities }: MapViewProps) {
  const navigate = useNavigate();

  // Filter universities that have valid map coordinates
  const universitiesWithCoords = universities.filter(
    uni => uni.mapLocation && uni.mapLocation.lat && uni.mapLocation.lng
  );

  // Calculate center point (Metro Manila approximate center)
  const center: [number, number] = [14.5995, 120.9842]; // Manila coordinates

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-red-600" />
              <span className="text-base sm:text-lg font-semibold text-gray-900">
                {universitiesWithCoords.length} Universities Mapped
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Zoom in/out and click markers for details
          </div>
        </div>
      </div>

      <div className="h-[400px] sm:h-[500px] md:h-[600px] relative isolate z-0">
        <MapContainer
          center={center}
          zoom={11}
          style={{ height: '100%', width: '100%' }}
          className="rounded-b-xl"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {universitiesWithCoords.map((university) => (
            <Marker
              key={university.id}
              position={[university.mapLocation!.lat, university.mapLocation!.lng]}
            >
              <Popup>
                <div className="p-2 min-w-[250px]">
                  <div className="flex items-start space-x-3">
                    <img
                      src={university.imageUrl}
                      alt={university.name}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1">
                        {university.name}
                      </h3>
                      <div className="flex items-center text-xs text-gray-600 mb-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {university.location}, {university.province}
                      </div>
                      <div className="flex items-center text-xs text-gray-600 mb-2">
                        <span className="font-medium">Type:</span>
                        <span className={`ml-1 px-2 py-0.5 rounded text-xs font-medium ${
                          university.type === 'Public' ? 'bg-blue-100 text-blue-800' :
                          university.type === 'State' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {university.type}
                        </span>
                      </div>

                      <div className="flex items-center text-xs text-gray-600 mb-3">
                        <span className="font-medium">Programs:</span>
                        <span className="ml-1">{university.programs} programs</span>
                      </div>
                      <button
                        onClick={() => navigate(`/universities/${university.id}`)}
                        className="w-full bg-maroon-800 text-white text-xs py-2 px-3 rounded hover:bg-maroon-700 transition-colors"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
