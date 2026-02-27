import React, { useState, useEffect } from 'react';
import { Users, BookOpen, MapPin, Heart, BarChart3, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { UniversityService } from '../../services/universityService';
import { University } from '../university/UniversityCard';
import { slugify } from '../../lib/utils';
import { useSavedUniversities } from '../../hooks/useSavedUniversities';

interface UniversityCardProps {
    id: number;
    name: string;
    location: string;
    province: string;
    established: string;
    type: string;
    students: string;
    programs: number;
    description: string;
    subjects: string[];
    imageUrl: string;
    tuitionRange: string;
    accreditation: string[];
    admissionStatus: 'open' | 'not-yet-open' | 'closed';
    acronym?: string;
    admissionDeadline: string;
}


function UniversityCard({
    id,
    name,
    acronym,
    location,
    established,
    type,
    students,
    programs,
    description,
    subjects,
    imageUrl,
    admissionStatus,
    admissionDeadline,
    onCompare
}: Omit<UniversityCardProps, 'tuitionRange' | 'accreditation'> & { onCompare?: (university: University) => void }) {
    const { isSaved, toggleSaved, isLoaded } = useSavedUniversities();
    const [isExpanded, setIsExpanded] = useState(false);

    const getStatusConfig = () => {
        switch (admissionStatus) {
            case 'open':
                return {
                    label: 'Open',
                    color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700',
                    dot: 'bg-green-500'
                };
            case 'not-yet-open':
                return {
                    label: 'Soon',
                    color: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700',
                    dot: 'bg-yellow-500'
                };
            case 'closed':
                return {
                    label: 'Closed',
                    color: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700',
                    dot: 'bg-red-500'
                };
        }
    };

    const statusConfig = getStatusConfig();

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 dark:border-gray-700">
            <div className="relative h-40 sm:h-48">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${type === 'Public'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        }`}>
                        {type}
                    </span>
                </div>
                <div className="absolute top-3 right-3">
                    <div className={`flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                        <div className={`w-2 h-2 rounded-full mr-1 ${statusConfig.dot}`}></div>
                        {statusConfig.label}
                    </div>
                </div>
            </div>

            <div className="p-3 sm:p-4">
                <div className="mb-3">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-50 mb-1 group-hover:text-red-900 dark:group-hover:text-[#FF4D4D] transition-colors">
                        {name}
                    </h3>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-0.5">
                        <MapPin className="h-4 w-4 mr-1" />
                        {location}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm">Est. {established}</div>
                </div>

                <div className="flex items-center justify-between mb-3 text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Users className="h-4 w-4 mr-1" />
                        <span className="font-medium">{students} students</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span className="font-medium">{programs} programs</span>
                    </div>
                </div>

                {/* Hidden on small and medium screens unless expanded */}
                <div className={`lg:block ${isExpanded ? 'block' : 'hidden'}`}>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed">{description}</p>

                    <div className="mb-3 text-xs text-gray-600 dark:text-gray-400">
                        📅 {admissionDeadline}
                    </div>
                    <div className="mb-4">
                        <div className="flex flex-wrap gap-1.5">
                            {subjects.map((subject, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full font-medium"
                                >
                                    {subject}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* See More/Less button - only show on small and medium screens */}
                <div className="lg:hidden mb-3">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-maroon-600 dark:text-maroon-400 hover:text-maroon-800 dark:hover:text-maroon-300 font-medium text-sm transition-colors"
                    >
                        {isExpanded ? 'See Less' : 'See More'}
                    </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                    <button
                        onClick={() => toggleSaved(id)}
                        disabled={!isLoaded}
                        className={`flex-1 min-w-0 px-2 py-1.5 border rounded-lg transition-all duration-300 text-xs sm:text-sm flex items-center
                            ${isSaved(id)
                                ? 'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-300 border-red-200 dark:border-red-700 hover:bg-red-100 dark:hover:bg-red-900'
                                : 'text-maroon-700 dark:text-maroon-400 border-maroon-200 dark:border-maroon-700 hover:bg-maroon-50 dark:hover:bg-maroon-950'
                            }
                            ${!isLoaded ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                    >
                        <Heart className={`h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 ${isSaved(id) ? 'fill-current' : ''}`} />
                        <span className="text-xs sm:text-sm">{isSaved(id) ? 'Saved' : 'Save'}</span>
                    </button>
                    <button
                        onClick={() => onCompare && onCompare({
                            id, name, location, province: '', established, type, students, programs, description, subjects, imageUrl,
                            longDescription: '', galleryImages: [], accreditation: [], admissionStatus, admissionDeadline,
                            facilities: [], amenities: [], achievements: [], quickfacts: [], admissionRequirements: [], applicationProcess: []
                        })}
                        className="flex-1 min-w-0 px-2 py-1.5 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 transition-all duration-300 text-xs sm:text-sm flex items-center"
                    >
                        <BarChart3 className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                        <span className="text-xs sm:text-sm">Compare</span>
                    </button>
                    <Link
                        to={`/universities/${acronym ? acronym.toLowerCase() : slugify(name)}`}
                        className="flex-1 min-w-0 px-2 py-1.5 bg-maroon-800 dark:bg-maroon-700 text-white rounded-lg hover:bg-maroon-700 dark:hover:bg-maroon-600 transition-colors flex items-center justify-center text-xs sm:text-sm"
                    >
                        <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                        <span className="text-xs sm:text-sm">View</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function FeaturedUniversities() {
    const navigate = useNavigate();
    const [featuredUniversities, setFeaturedUniversities] = useState<University[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleCompare = (university: University) => {
        const compareList = JSON.parse(localStorage.getItem('compareUniversities') || '[]');
        const universityData = {
            id: university.id,
            name: university.name,
            imageUrl: university.imageUrl,
            type: university.type,
            location: university.location,
            programs: university.programs
        };

        // Check if university is already in compare list
        const existingIndex = compareList.findIndex((item: { id: number }) => item.id === university.id);

        if (existingIndex >= 0) {
            // Remove from compare list
            compareList.splice(existingIndex, 1);
        } else {
            // Add to compare list (max 3 universities)
            if (compareList.length >= 3) {
                alert('You can compare up to 3 universities at a time. Please remove one first.');
                return;
            }
            compareList.push(universityData);
        }

        localStorage.setItem('compareUniversities', JSON.stringify(compareList));

        // Navigate to compare page
        navigate('/compare');
    };

    useEffect(() => {
        const fetchFixedFeaturedUniversities = async () => {
            try {
                setIsLoading(true);
                // Fetch specific universities by their IDs: PUP (main), TUP (main), PLM
                const specificUniversityIds = [1, 2, 3]; // Assuming these are the IDs for PUP-main, TUP-main, PLM
                const universities = await UniversityService.getUniversitiesByIds(specificUniversityIds);
                setFeaturedUniversities(universities);
            } catch (err) {
                console.error('Failed to fetch fixed featured universities:', err);
                setError('Failed to load featured universities');
            } finally {
                setIsLoading(false);
            }
        };

        fetchFixedFeaturedUniversities();
    }, []);

    if (isLoading) {
    return (
        <section className="py-8 md:py-16 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
                        <div>
                                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-3">
                                Featured Universities
                            </h2>

                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse">
                                <div className="h-40 sm:h-48 bg-gray-200 dark:bg-gray-700"></div>
                                <div className="p-3 sm:p-4">
                                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                                    <div className="h-3.5 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                                    <div className="h-3.5 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                                    <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-8 md:py-16 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-3">
                        Featured Universities
                    </h2>
                    <p className="text-lg text-red-600">{error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-8 md:py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
                    <div>
                                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-3">
                            Featured Universities
                        </h2>

                    </div>

                    <div className="mt-4 md:mt-0">
                        <Link to="/universities">
                            <button className="bg-gradient-to-r from-red-900 to-red-700 dark:from-red-700 dark:to-red-500 text-white px-4 py-2 rounded-xl hover:from-red-800 hover:to-red-600 transition-all duration-300 font-semibold text-sm">
                                View All →
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredUniversities.map((university) => (
                        <UniversityCard key={university.id} {...university} onCompare={handleCompare} />
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link to="/universities">
                        <button className="bg-gradient-to-r from-red-900 to-red-700 dark:from-red-700 dark:to-red-500 text-white px-6 py-3 rounded-xl hover:from-red-800 hover:to-red-600 transition-all duration-300 font-semibold text-base">
                            Browse All Universities →
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}