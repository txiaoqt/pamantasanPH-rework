import React, { useState, useEffect } from 'react';
import { Heart, Trash2, ExternalLink, BarChart3, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UniversityService } from '../services/universityService';
import { University } from '../components/university/UniversityCard';
import { useSavedUniversities } from '../hooks/useSavedUniversities';

export default function Saved() {
  const { savedUniversities, toggleSaved, clearAll } = useSavedUniversities();
  const [universities, setUniversities] = useState<University[]>([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const data = await UniversityService.getAllUniversities();
        setUniversities(data);
      } catch (error) {
        console.error('Failed to fetch universities:', error);
        setUniversities([]);
      }
    };

    fetchUniversities();
  }, []);

  const getStatusConfig = (status: string, deadline: string | undefined) => {
    switch (status) {
      case 'open':
        return {
          label: 'Admission Open',
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: <CheckCircle className="h-4 w-4" />,
          deadline: `Deadline: ${deadline}`
        };
      case 'not-yet-open':
        return {
          label: 'Opening Soon',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: <Clock className="h-4 w-4" />,
          deadline: 'Opens: TBD'
        };
      case 'closed':
        return {
          label: 'Admission Closed',
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: <AlertCircle className="h-4 w-4" />,
          deadline: `Next cycle: ${deadline}`
        };
      default:
        return {
          label: 'Status N/A',
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <AlertCircle className="h-4 w-4" />,
          deadline: 'Deadline: N/A'
        };
    }
  };

  const savedUniversityData = savedUniversities
    .map(saved => {
      const university = universities.find(u => u.id === saved.id);
      return university ? { ...university, savedAt: saved.savedAt } : null;
    })
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-maroon-900 via-maroon-800 to-red-900 text-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Saved Universities</h1>
          <p className="text-xs sm:text-base md:text-lg lg:text-xl text-maroon-100 max-w-3xl">
            Your bookmarked universities and their current admission status
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {savedUniversityData.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Heart className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Saved Universities</h3>
            <p className="text-sm text-gray-600 mb-6">
              Start exploring universities and save your favorites to keep track of them.
            </p>
            <Link
              to="/universities"
              className="bg-maroon-800 text-white px-6 py-3 rounded-lg hover:bg-maroon-700 transition-colors font-semibold"
            >
              Browse Universities
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {savedUniversityData.length} Saved {savedUniversityData.length === 1 ? 'University' : 'Universities'}
                </h2>
                <p className="text-sm text-gray-600">Track admission status and important deadlines</p>
              </div>
              {savedUniversityData.length > 0 && (
                <button
                  onClick={clearAll}
                  className="flex items-center px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedUniversityData.map((university) => {
                if (!university) return null;

                const statusConfig = getStatusConfig(university.admissionStatus, university.admissionDeadline);

                return (
                  <div key={university.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                    <div className="relative h-48">
                      <img
                        src={university.imageUrl}
                        alt={university.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          university.type === 'Public' ? 'bg-blue-100 text-blue-800' :
                          university.type === 'State' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {university.type}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <button
                          onClick={() => toggleSaved(university.id)}
                          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <Heart className="h-4 w-4 fill-current" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{university.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{university.description}</p>

                      <div className={`flex items-center justify-between p-3 rounded-lg border mb-4 ${statusConfig.color}`}>
                        <div className="flex items-center">
                          {statusConfig.icon}
                          <span className="ml-2 font-medium">{statusConfig.label}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {statusConfig.deadline}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span>{university.students} students</span>
                        <span>{university.programs} programs</span>
                      </div>

                      <div className="text-xs text-gray-500 mb-4">
                        Saved on {new Date(university.savedAt).toLocaleDateString()}
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center px-3 py-2 text-maroon-700 border border-maroon-200 rounded-lg hover:bg-maroon-50 transition-colors">
                          <BarChart3 className="h-4 w-4 mr-1" />
                          Compare
                        </button>
                        <Link
                          to={`/universities/${university.id}`}
                          className="flex-1 flex items-center justify-center px-3 py-2 bg-maroon-800 text-white rounded-lg hover:bg-maroon-700 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-base font-bold text-gray-900 mb-4">Admission Status Guide</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <div className="font-medium text-green-800">Admission Open</div>
                    <div className="text-sm text-green-600">Applications being accepted</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Clock className="h-5 w-5 text-yellow-600 mr-3" />
                  <div>
                    <div className="font-medium text-yellow-800">Opening Soon</div>
                    <div className="text-sm text-yellow-600">Applications will open soon</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-red-50 rounded-lg border border-red-200">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                  <div>
                    <div className="font-medium text-red-800">Admission Closed</div>
                    <div className="text-sm text-red-600">Wait for next admission cycle</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
