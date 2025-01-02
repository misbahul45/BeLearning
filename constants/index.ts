import { githubsigninAction, googlesigninAction } from "@/actions/auth.actions";

export const OAUTH=[
    {
        id:1,
        fn:googlesigninAction,
        icon:'./images/google.svg'
    },
    {
        id:2,
        fn:githubsigninAction,
        icon:'./images/github.svg'
    },
] 

export const feedbackData = [
    {
      name: "Andi Setiawan",
      comment: "This LMS website makes it easier for me to follow online courses. Its interface and interaction are very user-friendly."
    },
    {
      name: "Siti Nurjanah",
      comment: "I'm happy I can access course materials anytime and anywhere. It really helps me prepare for exams."
    },
    {
      name: "Budi Prasetyo",
      comment: "Overall, my experience is good. However, some features need to be improved for faster access."
    },
    {
      name: "Rina Putri",
      comment: "I feel more organized in following the class. The discussion forum feature is also very useful for sharing information."
    },
    {
      name: "Fahmi Alamsyah",
      comment: "I'm satisfied with how this LMS works, although sometimes there are slight technical issues that disrupt my learning experience."
    }
  ];
  
  export const FEATURE_DATA = [
    {
      id: 1,
      title: "Course Management",
      description: "Easily create, organize, and manage courses with intuitive tools designed for both learners and instructors.",
      icon: "/images/app/1.png",
    },
    {
      id: 2,
      title: "Progress Tracking",
      description: "Track your learning journey with detailed insights into your course completion and achievements.",
      icon: "/images/app/2.png",
    },
    {
      id: 3,
      title: "Interactive Learning",
      description: "Engage with interactive quizzes, videos, and live sessions to deepen your understanding.",
      icon: "/images/app/3.png",
    },
    {
      id: 4,
      title: "AI-Powered Recommendations",
      description: "Receive personalized course and learning material recommendations powered by advanced AI algorithms.",
      icon: "/images/app/4.png",
    },
    {
      id: 5,
      title: "Create Your Learning Path",
      description: "Design your own learning journey by choosing topics, setting goals, and managing your study schedule.",
      icon: "/images/app/5.png",
    },
    {
      id: 6,
      title: "AI Summarized Learning",
      description: "Save time with AI-generated summaries of your learning materials and key takeaways.",
      icon: "/images/app/6.png",
    },
  ];
  

export  const faqData = [
    {
      question: "What is Be Learning?",
      answer:
        "Be Learning is an innovative platform for learning and teaching. It allows users to access high-quality courses, track their progress, and connect with a community of learners."
    },
    {
      question: "How do I enroll in a course?",
      answer:
        "To enroll in a course, simply sign up for an account, browse the available courses, and click on the 'Enroll Now' button on the course page."
    },
    {
      question: "Are the courses free?",
      answer:
        "We offer a mix of free and premium courses. You can filter the course catalog to find courses that match your budget or are free to access."
    },
    {
      question: "Can I create my own courses?",
      answer:
        "Yes! As an instructor, you can create and publish your own courses using our course creation tools. Share your expertise and earn while teaching."
    },
    {
      question: "What features does the platform offer?",
      answer:
        "Our platform includes progress tracking, AI-powered learning recommendations, to-do lists, community forums, and course reviews to enhance your learning experience."
    },
    {
      question: "Do I get a certificate after completing a course?",
      answer:
        "Yes, you will receive a certificate of completion for courses that offer certification, which you can share on your LinkedIn profile or resume."
    },
    {
      question: "What payment methods are available?",
      answer:
        "We accept various payment methods, including credit cards, PayPal, and bank transfers. Local payment options are also supported in some regions."
    },
    {
      question: "How can I track my progress?",
      answer:
        "Your progress is automatically tracked as you complete lessons and quizzes. You can view detailed insights in the 'My Progress' section of your dashboard."
    },
    {
      question: "Can I access the platform on mobile devices?",
      answer:
        "Yes! Our platform is fully responsive and optimized for mobile, tablet, and desktop devices. We also have a mobile app coming soon."
    },
    {
      question: "What if I have technical issues?",
      answer:
        "If you experience technical issues, please contact our support team through the 'Help Center' or email us at support@belearning.com."
    }
  ];
  