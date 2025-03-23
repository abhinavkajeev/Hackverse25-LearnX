
// CourseSidebar.jsx
import React from 'react';
import { CheckCircle, Circle, Lock, ChevronDown, ChevronUp, Play, Pause } from 'lucide-react';

function CourseSidebar({ sections, onSelectVideo, currentVideoId, isPurchased }) {
  const [expandedSections, setExpandedSections] = React.useState({});
  const [hoveredVideo, setHoveredVideo] = React.useState(null);

  // Initialize all sections as expanded
  React.useEffect(() => {
    const initialExpanded = {};
    sections.forEach((section) => {
      initialExpanded[section.id] = true;
    });
    setExpandedSections(initialExpanded);
  }, [sections]);

  const toggleSection = (sectionId) => {
    setExpandedSections({
      ...expandedSections,
      [sectionId]: !expandedSections[sectionId]
    });
  };
  
  return (
    <div className="border rounded-lg bg-white shadow-md overflow-hidden">
      <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <h3 className="font-bold text-lg text-gray-800">Course Content</h3>
        <p className="text-sm text-gray-600">
          {sections.reduce((total, section) => total + section.videos.length, 0)} videos • {sections.length} sections
        </p>
      </div>
      
      <div className="overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {sections.map((section, sectionIndex) => (
          <div key={section.id} className="border-b last:border-b-0">
            <button 
              className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection(section.id)}
            >
              <div className="text-left flex items-center">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mr-3">
                  {sectionIndex + 1}
                </span>
                <div>
                  <h4 className="font-semibold">{section.title}</h4>
                  <p className="text-sm text-gray-600">{section.videos.length} videos • {section.duration}</p>
                </div>
              </div>
              <div className="text-gray-500 transition-transform duration-200" style={{ transform: expandedSections[section.id] ? 'rotate(0deg)' : 'rotate(180deg)' }}>
                {expandedSections[section.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </button>
            
            {expandedSections[section.id] && (
              <div className="bg-gray-50">
                {section.videos.map((video, videoIndex) => (
                  <div 
                    key={video.id}
                    className={`flex items-start p-3 transition-all cursor-pointer border-t relative ${
                      video.id === currentVideoId 
                        ? 'bg-blue-50 border-l-4 border-l-blue-500' 
                        : 'hover:bg-gray-100 border-l-4 border-l-transparent'
                    }`}
                    onClick={() => isPurchased && onSelectVideo(video)}
                    onMouseEnter={() => setHoveredVideo(video.id)}
                    onMouseLeave={() => setHoveredVideo(null)}
                  >
                    <div className="mr-3 mt-1">
                      {isPurchased ? (
                        video.completed ? (
                          <CheckCircle size={18} className="text-green-500" />
                        ) : video.id === currentVideoId ? (
                          <div className="relative">
                            <Circle size={18} className="text-blue-500" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            </div>
                          </div>
                        ) : (
                          <Circle size={18} className="text-gray-400" />
                        )
                      ) : (
                        <Lock size={18} className="text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">{videoIndex + 1}. {video.title}</p>
                        {hoveredVideo === video.id && isPurchased && !video.completed && (
                          <span className="text-blue-500 ml-2">
                            {video.id === currentVideoId ? <Pause size={16} /> : <Play size={16} />}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{video.duration}</p>
                    </div>
                    
                    {!isPurchased && (
                      <div className="absolute inset-0 bg-gray-100 bg-opacity-60 flex items-center justify-center">
                        <Lock size={16} className="text-gray-500" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {isPurchased && (
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-700">
              Your Progress
            </div>
            <div className="text-sm font-medium text-blue-600">
              {Math.round((sections.reduce((completed, section) => 
                completed + section.videos.filter(v => v.completed).length, 0) / 
                sections.reduce((total, section) => total + section.videos.length, 0)) * 100)}%
            </div>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
              style={{ 
                width: `${Math.round((sections.reduce((completed, section) => 
                  completed + section.videos.filter(v => v.completed).length, 0) / 
                  sections.reduce((total, section) => total + section.videos.length, 0)) * 100)}%` 
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseSidebar;