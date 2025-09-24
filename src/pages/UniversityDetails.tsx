import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import { universities } from '../components/data/universities';

import {
  ArrowLeft,
  Star,
  MapPin,
  Users,
  BookOpen,
  Calendar,
  Award,
  DollarSign,
  Phone,
  Mail,
  Globe,
  Heart,
  Share2,
  BarChart3,
  CheckCircle,
  Clock,
  TrendingUp,
  Building,
  GraduationCap,
  Camera
} from 'lucide-react';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: { id: string; label: string }[];
}

function TabNavigation({ activeTab, setActiveTab, tabs }: TabProps) {
  return (
    <div className="border-b border-gray-200 mb-8">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
              ? 'border-maroon-600 text-maroon-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default function UniversityDetails() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const university = universities.find(u => u.id === parseInt(id || '1'));

  if (!university) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">University Not Found</h2>
          <Link to="/universities" className="text-maroon-600 hover:text-maroon-700">
            ← Back to Universities
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'academics', label: 'Academics' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'campus', label: 'Campus Life' },
    { id: 'contact', label: 'Contact' }
  ];

  const hasContactInfo = university.website || university.phone || university.email || university.address;
  const hasAdmissionData = university.admissionRequirements && university.admissionRequirements.length > 0 && university.tuitionRange;
  const hasAcademicData = university.subjects.length > 0 || university.academicCalendar?.semesterStart;
  const hasCampusData = university.studentLife || (university.facilities && university.facilities.length > 0);
  const mapLocation = university.mapLocation;
  const hasGalleryImages = university.galleryImages && university.galleryImages.length > 0;

  const mapClass = isExpanded ? 'h-[500px]' : 'h-64';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/universities"
            className="inline-flex items-center text-maroon-600 hover:text-maroon-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Universities
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h1 className="text-3xl font-bold text-gray-900 mr-4">{university.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${university.type === 'Public' ? 'bg-blue-100 text-blue-800' :
                  university.type === 'State' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                  {university.type}
                </span>
              </div>

              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{university.address || 'Address not available'}</span>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-current mr-1" />
                  <span className="font-medium text-gray-900">{university.rating}</span>
                  <span className="text-gray-500 ml-1">rating</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{university.students} students</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{university.programs} programs</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Est. {university.established}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 mt-6 lg:mt-0">
              <button className="flex items-center px-4 py-2 text-maroon-700 border border-maroon-200 rounded-lg hover:bg-maroon-50 transition-colors">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </button>
              <button className="flex items-center px-4 py-2 text-maroon-700 border border-maroon-200 rounded-lg hover:bg-maroon-50 transition-colors">
                <BarChart3 className="h-4 w-4 mr-2" />
                Compare
              </button>
              <button className="flex items-center px-4 py-2 text-maroon-700 border border-maroon-200 rounded-lg hover:bg-maroon-50 transition-colors">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      {hasGalleryImages && (
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-3">
                <img
                  src={university.galleryImages?.[selectedImage] || university.imageUrl}
                  alt={university.name}
                  className="w-full h-96 object-cover rounded-xl"
                />
              </div>
              <div className="grid grid-cols-4 lg:grid-cols-1 gap-2">
                {university.galleryImages?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 lg:h-24 rounded-lg overflow-hidden ${selectedImage === index ? 'ring-2 ring-maroon-600' : ''
                      }`}
                  >
                    <img
                      src={image}
                      alt={`${university.name} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {university.longDescription && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About {university.name}</h2>
                  <p className="text-gray-600 leading-relaxed">{university.longDescription}</p>
                </div>
              )}
              {(university.admissionRate || university.graduationRate || university.employmentRate || university.rankings?.national) && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Key Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {university.admissionRate && (
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-2xl font-bold text-maroon-600">{university.admissionRate}</div>
                        <div className="text-sm text-gray-600">Admission Rate</div>
                      </div>
                    )}
                    {university.graduationRate && (
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-2xl font-bold text-maroon-600">{university.graduationRate}</div>
                        <div className="text-sm text-gray-600">Graduation Rate</div>
                      </div>
                    )}
                    {university.employmentRate && (
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-2xl font-bold text-maroon-600">{university.employmentRate}</div>
                        <div className="text-sm text-gray-600">Employment Rate</div>
                      </div>
                    )}
                    {university.rankings?.national && (
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-2xl font-bold text-maroon-600">#{university.rankings.national}</div>
                        <div className="text-sm text-gray-600">National Ranking</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {university.subjects && university.subjects.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Academic Programs</h3>
                  <div className="flex flex-wrap gap-2">
                    {university.subjects.map((subject, index) => (
                      <span key={index} className="px-3 py-1 bg-maroon-50 text-maroon-700 text-sm rounded-full font-medium">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {university.achievements && university.achievements.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Achievements & Recognition</h3>
                  <div className="space-y-2">
                    {university.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center">
                        <Award className="h-4 w-4 text-maroon-600 mr-2" />
                        <span className="text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  {university.founded && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Founded</span>
                      <span className="font-medium">{university.founded}</span>
                    </div>
                  )}
                  {university.campusSize && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Campus Size</span>
                      <span className="font-medium">{university.campusSize}</span>
                    </div>
                  )}
                  {university.tuitionRange && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tuition Range</span>
                      <span className="font-medium">{university.tuitionRange}</span>
                    </div>
                  )}
                  {university.studentLife?.clubs && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Student Clubs</span>
                      <span className="font-medium">{university.studentLife.clubs}+</span>
                    </div>
                  )}
                </div>
              </div>
              {university.accreditation && university.accreditation.length > 0 && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Accreditation</h3>
                  <div className="space-y-2">
                    {university.accreditation.map((acc, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-gray-700">{acc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {university.academicCalendar?.applicationDeadline && (
                <div className="bg-maroon-50 p-6 rounded-xl border border-maroon-200">
                  <h3 className="text-lg font-bold text-maroon-900 mb-4">Apply Now</h3>
                  <p className="text-maroon-700 text-sm mb-4">
                    Application deadline: {university.academicCalendar.applicationDeadline}
                  </p>
                  <button className="w-full bg-maroon-600 text-white py-3 rounded-lg hover:bg-maroon-700 transition-colors font-semibold">
                    Start Application
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'academics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              {university.subjects && university.subjects.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Academic Programs</h2>
                  <div className="space-y-4">
                    {university.subjects.map((subject, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <BookOpen className="h-5 w-5 text-maroon-600 mr-3" />
                            <span className="font-medium text-gray-900">{subject}</span>
                          </div>
                          <span className="text-sm text-gray-500">Multiple Programs</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-8">
              {university.academicCalendar && university.academicCalendar.semesterStart && university.academicCalendar.semesterEnd && university.academicCalendar.applicationDeadline && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Academic Calendar</h2>
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-maroon-600 mr-3" />
                          <span className="text-gray-700">Semester Start</span>
                        </div>
                        <span className="font-medium">{university.academicCalendar.semesterStart}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-maroon-600 mr-3" />
                          <span className="text-gray-700">Semester End</span>
                        </div>
                        <span className="font-medium">{university.academicCalendar.semesterEnd}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-maroon-600 mr-3" />
                          <span className="text-gray-700">Application Deadline</span>
                        </div>
                        <span className="font-medium">{university.academicCalendar.applicationDeadline}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {university.facilities && university.facilities.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Campus Facilities</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {university.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center bg-white p-3 rounded-lg border border-gray-200">
                        <Building className="h-4 w-4 text-maroon-600 mr-3" />
                        <span className="text-gray-700">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'admissions' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              {university.admissionRequirements && university.admissionRequirements.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Admission Requirements</h2>
                  <div className="space-y-3">
                    {university.admissionRequirements.map((requirement, index) => (
                      <div key={index} className="flex items-center bg-white p-4 rounded-lg border border-gray-200">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                        <span className="text-gray-700">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-8">
              {university.tuitionRange && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Tuition & Fees</h3>
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-700">Annual Tuition Range</span>
                      <span className="text-2xl font-bold text-maroon-600">{university.tuitionRange}</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Fees may vary by program. Financial aid and scholarships available.
                    </p>
                  </div>
                </div>
              )}
              {university.scholarships && university.scholarships.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Scholarships & Financial Aid</h2>
                  <div className="space-y-3">
                    {university.scholarships.map((scholarship, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center">
                          <Award className="h-5 w-5 text-maroon-600 mr-3" />
                          <span className="font-medium text-gray-900">{scholarship}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {university.academicCalendar?.applicationDeadline && (
                <div className="bg-maroon-50 p-6 rounded-xl border border-maroon-200">
                  <h3 className="text-lg font-bold text-maroon-900 mb-4">Application Process</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-maroon-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                      <span className="text-maroon-800">Submit online application</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-maroon-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                      <span className="text-maroon-800">Take entrance examination</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-maroon-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                      <span className="text-maroon-800">Submit required documents</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-maroon-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">4</div>
                      <span className="text-maroon-800">Wait for admission results</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'campus' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              {university.studentLife && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Life</h2>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {university.studentLife.clubs && (
                      <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                        <Users className="h-8 w-8 text-maroon-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">{university.studentLife.clubs}</div>
                        <div className="text-sm text-gray-600">Student Organizations</div>
                      </div>
                    )}
                    {university.studentLife.sports && (
                      <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                        <TrendingUp className="h-8 w-8 text-maroon-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">{university.studentLife.sports}</div>
                        <div className="text-sm text-gray-600">Sports Teams</div>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Campus Amenities</h3>
                  <div className="space-y-3">
                    {university.studentLife.dormitories !== undefined && (
                      <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center">
                          <Building className="h-5 w-5 text-maroon-600 mr-3" />
                          <span className="text-gray-700">Student Dormitories</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${university.studentLife.dormitories
                          ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {university.studentLife.dormitories ? 'Available' : 'Not Available'}
                        </span>
                      </div>
                    )}
                    {university.studentLife.library !== undefined && (
                      <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center">
                          <BookOpen className="h-5 w-5 text-maroon-600 mr-3" />
                          <span className="text-gray-700">Library Facilities</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${university.studentLife.library
                          ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {university.studentLife.library ? 'Available' : 'Not Available'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div>
              {university.facilities && university.facilities.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Campus Facilities</h2>
                  <div className="grid grid-cols-1 gap-3">
                    {university.facilities.map((facility, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center">
                          <Building className="h-5 w-5 text-maroon-600 mr-3" />
                          <span className="font-medium text-gray-900">{facility}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {hasContactInfo ? (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-maroon-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Address</div>
                      <div className="text-gray-600">{university.address || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-maroon-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Phone</div>
                      <div className="text-gray-600">{university.phone || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-maroon-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Email</div>
                      <div className="text-gray-600">{university.email || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-maroon-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Website</div>
                      <a href={university.website} className="text-maroon-600 hover:text-maroon-700">
                        {university.website || 'N/A'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {mapLocation && mapLocation.lat && mapLocation.lng ? (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Location Map</h2>
                <div className={`rounded-xl overflow-hidden ${mapClass}`}>
                  <MapContainer
                    center={[mapLocation.lat, mapLocation.lng]}
                    zoom={16}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[mapLocation.lat, mapLocation.lng]}>
                      <Popup>{university.name}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
                <button
                  className="mt-4 px-4 py-2 bg-maroon-600 text-white rounded-md hover:bg-maroon-700 transition-colors"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'Collapse Map' : 'Expand Map'}
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Location Map</h2>
                <div className="h-64 flex items-center justify-center rounded-xl bg-gray-100 text-gray-500 border border-gray-200">
                  📍 Location data not available
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}