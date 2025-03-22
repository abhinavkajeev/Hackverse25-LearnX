function Features() {
    return (
      <section className="bg-[#EC9D1A] py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose LearnX?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="bg-[#ffebd6] p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Expert Instructors</h3>
              <p className="text-black-600 font-semibold">
                Learn from industry experts with years of experience in their fields.
              </p>
            </div>
  
            {/* Feature 2 */}
            <div className="text-center">
              <div className="bg-[#ffebd6] p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Comprehensive Courses</h3>
              <p className="text-black-600 font-semibold">
                Access a wide range of courses designed to help you achieve your career goals.
              </p>
            </div>
  
            {/* Feature 3 */}
            <div className="text-center">
              <div className="bg-[#ffebd6] p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Flexible Learning</h3>
              <p className="text-black-600 font-semibold ">
                Learn at your own pace with flexible schedules and on-demand content.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default Features;