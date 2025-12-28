import React, { useState, useEffect } from 'react';
import { Star, Users, BookOpen, MapPin, Heart, BarChart3, ExternalLink } from 'lucide-react';
import { Link } from "react-router-dom";
import { UniversityService } from '../../services/universityService';
import { University } from '../university/UniversityCard';
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
    admissionDeadline: string;
}


function UniversityCard({
    id,
    name,
    location,
    established,
    type,
    students,
    programs,
    description,
    subjects,
    imageUrl,
    admissionStatus,
    admissionDeadline
}: Omit<UniversityCardProps, 'tuitionRange' | 'accreditation'>) {
    const { isSaved, toggleSaved, isLoaded } = useSavedUniversities();
    const [isExpanded, setIsExpanded] = useState(false);

    const getStatusConfig = () => {
        switch (admissionStatus) {
            case 'open':
                return {
                    label: 'Open',
                    color: 'bg-green-100 text-green-800 border-green-200',
                    dot: 'bg-green-500'
                };
            case 'not-yet-open':
                return {
                    label: 'Soon',
                    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                    dot: 'bg-yellow-500'
                };
            case 'closed':
                return {
                    label: 'Closed',
                    color: 'bg-red-100 text-red-800 border-red-200',
                    dot: 'bg-red-500'
                };
        }
    };

    const statusConfig = getStatusConfig();

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100">
            <div className="relative h-48">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${type === 'Public'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                        }`}>
                        {type}
                    </span>
                </div>
                <div className="absolute top-4 right-4">
                    <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                        <div className={`w-2 h-2 rounded-full mr-1 ${statusConfig.dot}`}></div>
                        {statusConfig.label}
                    </div>
                </div>
            </div>

            <div className="p-4 md:p-6">
                <div className="mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-red-900 transition-colors">
                        {name}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm mb-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {location}
                    </div>
                    <div className="text-gray-500 text-sm">Est. {established}</div>
                </div>

                <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        <span className="font-medium">{students} students</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span className="font-medium">{programs} programs</span>
                    </div>
                </div>

                {/* Hidden on small and medium screens unless expanded */}
                <div className={`lg:block ${isExpanded ? 'block' : 'hidden'}`}>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>

                    <div className="mb-4 text-xs text-gray-600">
                        📅 {admissionDeadline}
                    </div>
                    <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                            {subjects.map((subject, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-red-50 text-red-700 text-xs rounded-full font-medium hover:bg-red-100 transition-colors"
                                >
                                    {subject}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* See More/Less button - only show on small and medium screens */}
                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-maroon-600 hover:text-maroon-800 font-medium text-sm transition-colors"
                    >
                        {isExpanded ? 'See Less' : 'See More'}
                    </button>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => toggleSaved(id)}
                        disabled={!isLoaded}
                        className={`flex-1 flex items-center justify-center px-4 py-2 border rounded-lg transition-all duration-300 
                            ${isSaved(id)
                                ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                                : 'text-maroon-700 border-maroon-200 hover:bg-maroon-50'
                            } 
                            ${!isLoaded ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                    >
                        <Heart className={`h-4 w-4 mr-1 ${isSaved(id) ? 'fill-current' : ''}`} />
                        {isSaved(id) ? 'Saved' : 'Save'}
                    </button>
                    <button className="flex-1 flex items-center justify-center px-4 py-2 text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-all duration-300">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Compare
                    </button>
                    <Link
                        to={`/universities/${id}`}
                        className="px-4 py-2 bg-maroon-800 text-white rounded-lg hover:bg-maroon-700 transition-colors flex items-center"
                    >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function FeaturedUniversities() {
    const [featuredUniversities, setFeaturedUniversities] = useState<University[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFeaturedUniversities = async () => {
            try {
                setIsLoading(true);
                const universities = await UniversityService.getFeaturedUniversities(3);
                setFeaturedUniversities(universities);
            } catch (err) {
                console.error('Failed to fetch featured universities:', err);
                setError('Failed to load featured universities');
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeaturedUniversities();
    }, []);

    if (isLoading) {
    return (
        <section className="py-10 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Featured Universities
                            </h2>

                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
                                <div className="h-48 bg-gray-200"></div>
                                <div className="p-6">
                                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                                    <div className="h-16 bg-gray-200 rounded mb-4"></div>
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
            <section className="py-10 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Featured Universities
                    </h2>
                    <p className="text-xl text-red-600">{error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-10 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Featured Universities
                        </h2>

                    </div>

                    <div className="mt-6 md:mt-0">
                        <Link to="/universities">
                            <button className="bg-gradient-to-r from-red-900 to-red-700 text-white px-6 py-3 rounded-xl hover:from-red-800 hover:to-red-600 transition-all duration-300 font-semibold">
                                View All →
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredUniversities.map((university) => (
                        <UniversityCard key={university.id} {...university} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/universities">
                        <button className="bg-gradient-to-r from-red-900 to-red-700 text-white px-8 py-4 rounded-xl hover:from-red-800 hover:to-red-600 transition-all duration-300 font-semibold text-lg">
                            Browse All Universities →
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
