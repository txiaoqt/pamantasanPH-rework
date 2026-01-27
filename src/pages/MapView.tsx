import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { UniversityService } from '../services/universityService';
import { University } from '../components/university/UniversityCard';
import { MapPin, ArrowLeft } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapView() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const data = await UniversityService.getAllUniversities();
        setUniversities(data);
      } catch (error) {
        console.error('Failed to fetch universities:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  // Filter universities that have valid map coordinates
  const universitiesWithCoords = universities.filter(
    uni => uni.mapLocation && uni.mapLocation.lat && uni.mapLocation.lng
  );

  // Calculate center point (Metro Manila approximate center)
  const center: [number, number] = [14.5995, 120.9842]; // Manila coordinates

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-900"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-maroon-900 via-maroon-800 to-red-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-3">University Map</h1>
              <p className="text-base sm:text-lg text-maroon-100 max-w-3xl">
                Explore all universities across Metro Manila on an interactive map.
                Click on markers to learn more about each institution.
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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

          <div className="h-[400px] sm:h-[500px] md:h-[600px] relative">
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-lg p-4 shadow-lg text-center">
            <div className="text-xl sm:text-2xl font-bold text-maroon-800 mb-2">
              {universitiesWithCoords.length}
            </div>
            <div className="text-gray-600">Universities on Map</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-lg text-center">
            <div className="text-xl sm:text-2xl font-bold text-maroon-800 mb-2">
              {new Set(universitiesWithCoords.map(u => u.location)).size}
            </div>
            <div className="text-gray-600">Locations Covered</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-lg text-center">
            <div className="text-xl sm:text-2xl font-bold text-maroon-800 mb-2">
              {universitiesWithCoords.reduce((sum, u) => sum + u.programs, 0)}
            </div>
            <div className="text-gray-600">Total Programs</div>
          </div>
        </div>
      </div>
    </div>
  );
}