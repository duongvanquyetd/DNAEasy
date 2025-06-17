const mockBlogs = [
  {
    blogId: "1",
    title: "Understanding Your DNA: A Guide to Genetic Testing",
    excerpt: "Explore how DNA testing can reveal insights about your health, ancestry, and more.",
    content: `
      <h2>Introduction to DNA Testing</h2>
      <p>Genetic testing has revolutionized how we understand our health and ancestry. This comprehensive guide will walk you through the basics of DNA testing and its applications in modern healthcare.</p>
      
      <h2>Types of DNA Tests</h2>
      <p>There are several types of DNA tests available today:</p>
      <ul>
        <li>Health and Wellness Testing</li>
        <li>Ancestry Testing</li>
        <li>Carrier Status Testing</li>
        <li>Pharmacogenetic Testing</li>
      </ul>

      <h2>Understanding Your Results</h2>
      <p>Interpreting DNA test results can be complex. Here's what you need to know about understanding your genetic data and what it means for your health.</p>
    `,
    imageUrls: ["https://imgs.search.brave.com/MZTFvwVlpzzm6p9B11Z2VuLuf1ilDGZiLyvSP7Pch6g/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMw/NjcwNTE0NS92ZWN0/b3IvZG5hLWFic3Ry/YWN0LWJhY2tncm91/bmQuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPXkxUjMzX1VM/eVZjRVQwS21wMVVU/R1NwV3dXNTVrRk4z/SlJ0SEZxdHE0RHc9"],
    category: "health",
    date: "2024-03-15T10:00:00Z",
    author: "Dr. Sarah Chen",
    authorBio: "Geneticist with 15 years of experience in personalized medicine",
    authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop",
    readTime: "8 min read",
    tags: ["DNA Testing", "Health", "Genetics", "Wellness"],
    comments: [
      {
        id: 1,
        author: "John Smith",
        avatar: "https://ui-avatars.com/api/?name=John+Smith",
        content: "This article really helped me understand the basics of DNA testing. Looking forward to more content like this!",
        date: "2024-03-16T14:30:00Z",
        likes: 12
      },
      {
        id: 2,
        author: "Emma Wilson",
        avatar: "https://ui-avatars.com/api/?name=Emma+Wilson",
        content: "Great explanation of different types of DNA tests. Would love to see more detailed information about ancestry testing.",
        date: "2024-03-16T15:45:00Z",
        likes: 8
      }
    ]
  },
  {
    blogId: "2",
    title: "The Role of Genetics in Personalized Medicine",
    excerpt: "Learn how your genetic profile can guide tailored healthcare solutions.",
    content: `
      <h2>What is Personalized Medicine?</h2>
      <p>Personalized medicine represents a paradigm shift in healthcare, where treatments are tailored to individual genetic profiles.</p>
      
      <h2>Genetic Markers and Treatment Response</h2>
      <p>Understanding how genetic markers influence treatment response is crucial for developing effective personalized treatment plans.</p>

      <h2>Future of Personalized Healthcare</h2>
      <p>The future of healthcare lies in the integration of genetic data with traditional medical approaches.</p>
    `,
    imageUrls: ["https://images.unsplash.com/photo-1576091160399-1f0c69f7c5a9?q=80&w=1932&auto=format&fit=crop"],
    category: "health",
    date: "2024-03-14T09:30:00Z",
    author: "Dr. Michael Rodriguez",
    authorBio: "Medical researcher specializing in personalized medicine",
    authorAvatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop",
    readTime: "6 min read",
    tags: ["Personalized Medicine", "Genetics", "Healthcare", "Research"],
    comments: [
      {
        id: 1,
        author: "Lisa Chen",
        avatar: "https://ui-avatars.com/api/?name=Lisa+Chen",
        content: "Fascinating read! Would love to learn more about specific applications in cancer treatment.",
        date: "2024-03-14T11:20:00Z",
        likes: 15
      }
    ]
  },
  {
    blogId: "3",
    title: "DNA and Disease Prevention: What You Need to Know",
    excerpt: "Discover how genetic testing can help identify and mitigate health risks.",
    content: `
      <h2>Early Detection Through Genetics</h2>
      <p>Genetic testing plays a crucial role in early disease detection and prevention strategies.</p>
      
      <h2>Risk Assessment and Management</h2>
      <p>Understanding your genetic risk factors can help you make informed decisions about your health.</p>

      <h2>Preventive Measures</h2>
      <p>Learn about the various preventive measures you can take based on your genetic profile.</p>
    `,
    imageUrls: ["https://images.unsplash.com/photo-1585435557343-3b0929fb6be0?q=80&w=1932&auto=format&fit=crop"],
    category: "health",
    date: "2024-03-13T14:15:00Z",
    author: "Dr. Emily Thompson",
    authorBio: "Preventive medicine specialist with expertise in genetic counseling",
    authorAvatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop",
    readTime: "7 min read",
    tags: ["Disease Prevention", "Genetics", "Health", "Wellness"],
    comments: []
  },
  {
    blogId: "4",
    title: "The Future of Healthcare: Innovations in DNA Sequencing",
    excerpt: "Dive into the latest advancements in DNA sequencing and their impact on healthcare.",
    content: `
      <h2>Next-Generation Sequencing</h2>
      <p>Explore the cutting-edge technologies revolutionizing DNA sequencing.</p>
      
      <h2>AI and Machine Learning in Genomics</h2>
      <p>Discover how artificial intelligence is transforming genetic analysis and interpretation.</p>

      <h2>Future Applications</h2>
      <p>Learn about the potential future applications of advanced DNA sequencing in healthcare.</p>
    `,
    imageUrls: ["https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1932&auto=format&fit=crop"],
    category: "tech",
    date: "2024-03-12T11:45:00Z",
    author: "Dr. James Wilson",
    authorBio: "Bioinformatics expert and healthcare technology innovator",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    readTime: "9 min read",
    tags: ["DNA Sequencing", "Technology", "Healthcare", "Innovation"],
    comments: [
      {
        id: 1,
        author: "Alex Johnson",
        avatar: "https://ui-avatars.com/api/?name=Alex+Johnson",
        content: "The section on AI applications was particularly interesting. Would love to see more technical details in future articles.",
        date: "2024-03-12T13:30:00Z",
        likes: 20
      }
    ]
  },
  {
    blogId: "5",
    title: "Healthy Living: How Genetics Influence Your Diet",
    excerpt: "Find out how your DNA can guide better nutrition choices for optimal health.",
    imageUrls: ["https://images.unsplash.com/photo-1540420828642-fca2c5c154b5?q=80&w=1932&auto=format&fit=crop"],
    category: "lifestyle",
  },
  {
    blogId: "6",
    title: "Genetic Testing for Family Planning",
    excerpt: "Understand how DNA tests can inform decisions about family health and heredity.",
    imageUrls: ["https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1932&auto=format&fit=crop"],
    category: "health",
  },
  {
    blogId: "7",
    title: "The Science Behind DNA-Based Wellness Programs",
    excerpt: "Explore how DNA insights are shaping personalized wellness and fitness plans.",
    imageUrls: ["https://images.unsplash.com/photo-1573496359142-b8d877c8285f?q=80&w=1932&auto=format&fit=crop"],
    category: "lifestyle",
  },
  {
    blogId: "8",
    title: "Ethical Considerations in Genetic Testing",
    excerpt: "A look at the ethical challenges and considerations in DNA testing today.",
    imageUrls: ["https://images.unsplash.com/photo-1593642634367-d91a135587b6?q=80&w=1932&auto=format&fit=crop"],
    category: "tech",
  }
];

export const getAllBlogs = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return {
    data: mockBlogs,
    status: 200,
    statusText: "OK"
  };
};

export const getBlogById = async (blogId) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const blog = mockBlogs.find((b) => b.blogId === blogId);
  if (!blog) {
    throw new Error("Blog not found");
  }
  
  return {
    data: blog,
    status: 200,
    statusText: "OK"
  };
};

export const getRelatedBlogs = async (blogId, limit = 3) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const currentBlog = mockBlogs.find((b) => b.blogId === blogId);
  if (!currentBlog) {
    throw new Error("Blog not found");
  }

  const relatedBlogs = mockBlogs
    .filter((blog) => 
      blog.blogId !== blogId && 
      (blog.category === currentBlog.category || 
       blog.tags.some(tag => currentBlog.tags.includes(tag)))
    )
    .slice(0, limit);

  return {
    data: relatedBlogs,
    status: 200,
    statusText: "OK"
  };
};

export const addComment = async (blogId, comment) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const blog = mockBlogs.find((b) => b.blogId === blogId);
  if (!blog) {
    throw new Error("Blog not found");
  }

  const newComment = {
    id: Date.now(),
    ...comment,
    date: new Date().toISOString(),
    likes: 0
  };

  blog.comments = blog.comments || [];
  blog.comments.unshift(newComment);

  return {
    data: newComment,
    status: 200,
    statusText: "OK"
  };
};

export const likeComment = async (blogId, commentId) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const blog = mockBlogs.find((b) => b.blogId === blogId);
  if (!blog) {
    throw new Error("Blog not found");
  }

  const comment = blog.comments.find((c) => c.id === commentId);
  if (!comment) {
    throw new Error("Comment not found");
  }

  comment.likes += 1;

  return {
    data: comment,
    status: 200,
    statusText: "OK"
  };
};