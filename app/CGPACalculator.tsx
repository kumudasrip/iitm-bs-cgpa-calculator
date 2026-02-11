'use client';

import { useState, useEffect } from 'react';

// Type definitions
type GradePoint = 10 | 9 | 8 | 7 | 6 | 4 | 0;
type Grade = 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'U';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: Grade | '';
  status: 'completed' | 'ongoing' | 'future';
}

interface GradeMapping {
  grade: Grade;
  points: GradePoint;
  minScore: number;
}

const GRADE_MAPPINGS: GradeMapping[] = [
  { grade: 'S', points: 10, minScore: 90 },
  { grade: 'A', points: 9, minScore: 80 },
  { grade: 'B', points: 8, minScore: 70 },
  { grade: 'C', points: 7, minScore: 60 },
  { grade: 'D', points: 6, minScore: 50 },
  { grade: 'E', points: 4, minScore: 40 },
  { grade: 'U', points: 0, minScore: 0 },
];

const getGradePoints = (grade: Grade): GradePoint => {
  const mapping = GRADE_MAPPINGS.find(m => m.grade === grade);
  return mapping ? mapping.points : 0;
};

// Course data for both programs
const DATA_SCIENCE_COURSES = {
  foundation: [
    { name: 'Mathematics for Data Science 1', credits: 4 },
    { name: 'English 1', credits: 4 },
    { name: 'Computational Thinking', credits: 4 },
    { name: 'Statistics for Data Science 1', credits: 4 },
    { name: 'Mathematics for Data Science 2', credits: 4 },
    { name: 'English 2', credits: 4 },
    { name: 'Intro to Python Programming', credits: 4 },
    { name: 'Statistics for Data Science 2', credits: 4 },
  ],
  diploma: [
    { name: 'Database Management Systems', credits: 4 },
    { name: 'Programming, Data Structures and Algorithms using Python', credits: 4 },
    { name: 'Modern Application Development I', credits: 4 },
    { name: 'Modern Application Development I - Project', credits: 2 },
    { name: 'Programming Concepts using Java', credits: 4 },
    { name: 'Modern Application Development II', credits: 4 },
    { name: 'Modern Application Development II - Project', credits: 2 },
    { name: 'System Commands', credits: 3 },
    { name: 'Machine Learning Foundations', credits: 4 },
    { name: 'Business Data Management', credits: 4 },
    { name: 'Machine Learning Techniques', credits: 4 },
    { name: 'Machine Learning Practice', credits: 4 },
    { name: 'Machine Learning Practice - Project', credits: 2 },
    { name: 'Tools in Data Science', credits: 3 },
    { name: 'Business Data Management - Project (Option 1)', credits: 2 },
    { name: 'Business Analytics (Option 1)', credits: 4 },
    { name: 'Introduction to Deep Learning and Generative AI (Option 2)', credits: 4 },
    { name: 'Deep Learning and Generative AI - Project (Option 2)', credits: 2 },
  ],
  degree: [
    { name: 'Software Engineering', credits: 4 },
    { name: 'Software Testing', credits: 4 },
    { name: 'AI: Search Methods for Problem Solving', credits: 4 },
    { name: 'Deep Learning', credits: 4 },
    { name: 'Strategies for Professional Growth', credits: 4 },
  ],
};

const ELECTRONIC_SYSTEMS_COURSES = {
  foundation: [
    { name: 'English I', credits: 4 },
    { name: 'Math for Electronics I', credits: 4 },
    { name: 'Electronic Systems Thinking and Circuits', credits: 4 },
    { name: 'ESTC Lab', credits: 1 },
    { name: 'Intro to C Programming', credits: 4 },
    { name: 'C Programming Lab', credits: 1 },
    { name: 'English II', credits: 4 },
    { name: 'Intro to Linux Programming', credits: 4 },
    { name: 'Linux Shell Lab', credits: 1 },
    { name: 'Digital Systems', credits: 4 },
    { name: 'Electrical and Electronic Circuits', credits: 4 },
    { name: 'Electronics Lab', credits: 3 },
    { name: 'Embedded C Programming', credits: 4 },
    { name: 'Embedded C Lab', credits: 1 },
  ],
  diploma: [
    { name: 'Signals and Systems', credits: 4 },
    { name: 'Analog Electronic Systems', credits: 4 },
    { name: 'Analog Electronics Laboratory', credits: 3 },
    { name: 'Python Programming', credits: 4 },
    { name: 'Digital System Design', credits: 4 },
    { name: 'Digital System Design Laboratory', credits: 1 },
    { name: 'Digital Signal Processing', credits: 4 },
    { name: 'Sensors and Applications', credits: 4 },
    { name: 'Sensors Laboratory', credits: 3 },
    { name: 'Electronic Testing and Measurement', credits: 4 },
    { name: 'Computer Organisation', credits: 4 },
    { name: 'Electronics System Project', credits: 2 },
    { name: 'Signals and Systems Project', credits: 2 },
  ],
  degree: [
    { name: 'Math for Electronics II', credits: 4 },
    { name: 'Embedded Linux and FPGAs', credits: 4 },
    { name: 'Embedded Linux and FPGAs Lab', credits: 1 },
    { name: 'Electromagnetic Fields and Transmission Lines', credits: 4 },
    { name: 'Electronic Product Design', credits: 4 },
    { name: 'Strategies for Professional Growth', credits: 4 },
    { name: 'Control Engineering', credits: 4 },
  ],
};

export default function CGPACalculator() {
  const [degree, setDegree] = useState<'data-science' | 'electronic-systems'>('data-science');
  const [level, setLevel] = useState<'foundation' | 'diploma' | 'degree'>('foundation');
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentCGPA, setCurrentCGPA] = useState<number | null>(null);
  const [predictedCGPA, setPredictedCGPA] = useState<number | null>(null);
  const [futureCGPA, setFutureCGPA] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  // Initialize courses when degree/level changes
  useEffect(() => {
    const courseData = degree === 'data-science' ? DATA_SCIENCE_COURSES : ELECTRONIC_SYSTEMS_COURSES;
    const levelCourses = courseData[level];
    
    const initialCourses: Course[] = levelCourses.map((course, index) => ({
      id: `${level}-${index}`,
      name: course.name,
      credits: course.credits,
      grade: '',
      status: 'completed',
    }));
    
    setCourses(initialCourses);
  }, [degree, level]);

  // Calculate CGPA
  const calculateCGPA = (courseList: Course[], statusFilter?: Course['status'][]): number | null => {
    const filteredCourses = statusFilter 
      ? courseList.filter(c => statusFilter.includes(c.status) && c.grade)
      : courseList.filter(c => c.grade);

    if (filteredCourses.length === 0) return null;

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    const weightedSum = filteredCourses.reduce((sum, course) => {
      const gradePoints = getGradePoints(course.grade as Grade);
      return sum + (gradePoints * course.credits);
    }, 0);

    return totalCredits > 0 ? weightedSum / totalCredits : null;
  };

  // Update calculations
  useEffect(() => {
    const completed = calculateCGPA(courses, ['completed']);
    const withOngoing = calculateCGPA(courses, ['completed', 'ongoing']);
    const all = calculateCGPA(courses, ['completed', 'ongoing', 'future']);

    setCurrentCGPA(completed);
    setPredictedCGPA(withOngoing);
    setFutureCGPA(all);
  }, [courses]);

  const updateCourse = (id: string, field: keyof Course, value: any) => {
    setCourses(prev => prev.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const addCourse = () => {
    const newCourse: Course = {
      id: `custom-${Date.now()}`,
      name: 'New Course',
      credits: 4,
      grade: '',
      status: 'future',
    };
    setCourses(prev => [...prev, newCourse]);
  };

  const removeCourse = (id: string) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };

  const getLetterGrade = (cgpa: number | null): string => {
    if (cgpa === null) return '-';
    if (cgpa >= 9) return 'S';
    if (cgpa >= 8) return 'A';
    if (cgpa >= 7) return 'B';
    if (cgpa >= 6) return 'C';
    if (cgpa >= 5) return 'D';
    if (cgpa >= 4) return 'E';
    return 'U';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a0a2e] to-[#0a0a0f] text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="relative border-b border-purple-500/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-600 rounded-full flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              IITM BS CGPA Calculator
            </h1>
          </div>
          
          {/* Info Button */}
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 hover:bg-purple-500/30 transition-all flex items-center justify-center group"
            title="How to use"
          >
            <svg className="w-6 h-6 text-purple-300 group-hover:text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Info Modal */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowInfo(false)}>
          <div className="bg-gradient-to-br from-[#1a0a2e] to-[#0a0a0f] border border-purple-500/30 rounded-2xl p-8 max-w-lg w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                How to Use
              </h3>
              <button
                onClick={() => setShowInfo(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm">1</div>
                <p><strong className="text-white">Select your program and level:</strong> Choose between BS in Data Science or Electronic Systems, then select your current level (Foundation/Diploma/Degree).</p>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm">2</div>
                <p><strong className="text-white">Enter your grades:</strong> For each course, select the status (Completed/Ongoing/Future) and choose your grade. The CGPA updates automatically!</p>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm">3</div>
                <p><strong className="text-white">View predictions:</strong> See three CGPAs - Current (completed only), With Ongoing (including current semester), and Future Projection (with planned courses).</p>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm">4</div>
                <p><strong className="text-white">Customize:</strong> Add custom courses with the "Add Custom Course" button. Remove any course using the trash icon in the Actions column.</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowInfo(false)}
              className="mt-8 w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 rounded-xl font-medium transition-all"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      <main className="relative container mx-auto px-6 py-12">
        {/* Degree and Level Selection */}
        <div className="mb-12 grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-purple-300 uppercase tracking-wider">
              Degree Program
            </label>
            <select
              value={degree}
              onChange={(e) => setDegree(e.target.value as any)}
              className="w-full px-6 py-4 bg-black/40 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-all hover:border-purple-400/50"
            >
              <option value="data-science">BS in Data Science and Applications</option>
              <option value="electronic-systems">BS in Electronic Systems</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-purple-300 uppercase tracking-wider">
              Course Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as any)}
              className="w-full px-6 py-4 bg-black/40 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-all hover:border-purple-400/50"
            >
              <option value="foundation">Foundation Level</option>
              <option value="diploma">Diploma Level</option>
              <option value="degree">Degree Level</option>
            </select>
          </div>
        </div>

        {/* CGPA Results Dashboard */}
        <div className="mb-12 grid md:grid-cols-3 gap-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
            <div className="relative bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8">
              <h3 className="text-sm font-medium text-purple-300 mb-2 uppercase tracking-wider">Current CGPA</h3>
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
                {currentCGPA !== null ? currentCGPA.toFixed(2) : '--'}
              </div>
              <div className="text-lg text-purple-300">
                Grade: {getLetterGrade(currentCGPA)}
              </div>
              <p className="text-sm text-gray-400 mt-3">Completed courses only</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
            <div className="relative bg-black/60 backdrop-blur-sm border border-violet-500/30 rounded-2xl p-8">
              <h3 className="text-sm font-medium text-violet-300 mb-2 uppercase tracking-wider">With Ongoing</h3>
              <div className="text-5xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {predictedCGPA !== null ? predictedCGPA.toFixed(2) : '--'}
              </div>
              <div className="text-lg text-violet-300">
                Grade: {getLetterGrade(predictedCGPA)}
              </div>
              <p className="text-sm text-gray-400 mt-3">Including ongoing subjects</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
            <div className="relative bg-black/60 backdrop-blur-sm border border-indigo-500/30 rounded-2xl p-8">
              <h3 className="text-sm font-medium text-indigo-300 mb-2 uppercase tracking-wider">Future Projection</h3>
              <div className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {futureCGPA !== null ? futureCGPA.toFixed(2) : '--'}
              </div>
              <div className="text-lg text-indigo-300">
                Grade: {getLetterGrade(futureCGPA)}
              </div>
              <p className="text-sm text-gray-400 mt-3">With planned future courses</p>
            </div>
          </div>
        </div>

        {/* Courses Table */}
        <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-purple-500/20">
            <h2 className="text-2xl font-bold text-white">Courses</h2>
            <p className="text-gray-400 mt-1">Enter grades for each course to calculate your CGPA</p>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-purple-500/10">
            {courses.map((course) => (
              <div key={course.id} className="p-4 hover:bg-purple-500/5 transition-colors">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-purple-300 mb-1">Course Name</label>
                    {course.id.startsWith('custom-') ? (
                      <input
                        type="text"
                        value={course.name}
                        onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 bg-black/40 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        placeholder="Course name"
                      />
                    ) : (
                      <div className="w-full px-3 py-2 bg-black/20 border border-purple-500/20 rounded-lg text-white break-words">
                        {course.name}
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-purple-300 mb-1">Credits</label>
                      <input
                        type="number"
                        value={course.credits}
                        onChange={(e) => updateCourse(course.id, 'credits', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-black/40 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        min="1"
                        max="10"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-purple-300 mb-1">Status</label>
                      <select
                        value={course.status}
                        onChange={(e) => updateCourse(course.id, 'status', e.target.value)}
                        className="w-full px-3 py-2 bg-black/40 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="completed">Completed</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="future">Future</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-purple-300 mb-1">Grade</label>
                      <select
                        value={course.grade}
                        onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                        className="w-full px-3 py-2 bg-black/40 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="">Select</option>
                        <option value="S">S (90-100)</option>
                        <option value="A">A (80-89)</option>
                        <option value="B">B (70-79)</option>
                        <option value="C">C (60-69)</option>
                        <option value="D">D (50-59)</option>
                        <option value="E">E (40-49)</option>
                        <option value="U">U (&lt;40)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-purple-300 mb-1">Points</label>
                      <div className="px-3 py-2 bg-black/40 border border-purple-500/30 rounded-lg text-purple-300 font-medium">
                        {course.grade ? getGradePoints(course.grade as Grade) : '-'}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeCourse(course.id)}
                    className="w-full px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:text-red-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove Course
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-purple-500/10 border-b border-purple-500/20">
                <tr>
                  <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider min-w-[200px]">
                    Course Name
                  </th>
                  <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                    Credits
                  </th>
                  <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-4 lg:px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/10">
                {courses.map((course, index) => (
                  <tr key={course.id} className="hover:bg-purple-500/5 transition-colors">
                    <td className="px-4 lg:px-6 py-4 min-w-[200px] max-w-[300px]">
                      {course.id.startsWith('custom-') ? (
                        <input
                          type="text"
                          value={course.name}
                          onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                          className="bg-transparent border-0 focus:outline-none text-white w-full break-words"
                          placeholder="Course name"
                        />
                      ) : (
                        <div className="text-white break-words whitespace-normal leading-relaxed">
                          {course.name}
                        </div>
                      )}
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={course.credits}
                        onChange={(e) => updateCourse(course.id, 'credits', parseInt(e.target.value) || 0)}
                        className="w-16 lg:w-20 px-2 lg:px-3 py-2 bg-black/40 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        min="1"
                        max="10"
                      />
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <select
                        value={course.status}
                        onChange={(e) => updateCourse(course.id, 'status', e.target.value)}
                        className="px-2 lg:px-3 py-2 bg-black/40 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 text-sm"
                      >
                        <option value="completed">Completed</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="future">Future</option>
                      </select>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <select
                        value={course.grade}
                        onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                        className="px-2 lg:px-3 py-2 bg-black/40 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 text-sm"
                      >
                        <option value="">Select</option>
                        <option value="S">S (90-100)</option>
                        <option value="A">A (80-89)</option>
                        <option value="B">B (70-79)</option>
                        <option value="C">C (60-69)</option>
                        <option value="D">D (50-59)</option>
                        <option value="E">E (40-49)</option>
                        <option value="U">U (&lt;40)</option>
                      </select>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <span className="text-purple-300 font-medium">
                        {course.grade ? getGradePoints(course.grade as Grade) : '-'}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => removeCourse(course.id)}
                        className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                        title="Remove course"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-purple-500/20">
            <button
              onClick={addCourse}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 rounded-xl font-medium transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Custom Course
            </button>
          </div>
        </div>

        {/* Grade Scale Reference */}
        <div className="mt-12 bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">Grade Scale Reference</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {GRADE_MAPPINGS.map((mapping) => (
              <div key={mapping.grade} className="text-center p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <div className="text-2xl font-bold text-purple-400 mb-1">{mapping.grade}</div>
                <div className="text-sm text-gray-400 mb-2">{mapping.minScore}+</div>
                <div className="text-lg font-medium text-white">{mapping.points} pts</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-gray-400 text-sm space-y-3">
          <div className="flex items-center justify-center gap-3">
            <p className="text-gray-300">Created by Kumuda Sri P (24f3000060)</p>
            <a 
              href="https://github.com/kumudasrip" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
              title="GitHub Profile"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/kumudasrip06/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
              title="LinkedIn Profile"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
          <p className="text-gray-500">Formulas based on official IITM BS grading documents</p>
        </div>
      </main>
    </div>
  );
}
