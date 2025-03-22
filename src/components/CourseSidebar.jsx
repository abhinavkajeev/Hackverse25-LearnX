import React from 'react';
import { CheckCircle, Circle, Lock, ChevronDown, ChevronUp } from 'lucide-react';

function CourseSidebar({ sections, onSelectVideo, currentVideoId, isPurchased }) {
  const [expandedSections, setExpandedSections] = React.useState({});

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
    <div className="border rounded-lg bg-white">
      <div className="p-4 border-b">
        <h3 className="font-bold text-lg">Course Content</h3>
        <p className="text-sm text-gray-600">
          {sections.reduce((total, section) => total + section.videos.length, 0)} videos • {sections.length} sections
        </p>
      </div>
      
      <div className="overflow-y-auto max-h-[600px]">
        {sections.map((section) => (
          <div key={section.id} className="border-b last:border-b-0">
            <button 
              className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection(section.id)}
            >
              <div className="text-left">
                <h4 className="font-semibold">{section.title}</h4>
                <p className="text-sm text-gray-600">{section.videos.length} videos • {section.duration}</p>
              </div>
              <div>
                {expandedSections[section.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </button>
            
            {expandedSections[section.id] && (
              <div className="bg-gray-50">
                {section.videos.map((video) => (
                  <div 
                    key={video.id}
                    className={`flex items-start p-3 hover:bg-gray-100 transition-colors cursor-pointer border-t ${video.id === currentVideoId ? 'bg-gray-100' : ''}`}
                    onClick={() => isPurchased && onSelectVideo(video)}
                  >
                    <div className="mr-3 mt-1">
                      {isPurchased ? (
                        video.completed ? <CheckCircle size={18} className="text-green-500" /> : <Circle size={18} className="text-gray-400" />
                      ) : (
                        <Lock size={18} className="text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{video.title}</p>
                      <p className="text-xs text-gray-500">{video.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseSidebar;