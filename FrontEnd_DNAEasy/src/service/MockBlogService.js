const mockBlogs = [
  {
    blogId: "1",
    title: "Understanding Your DNA: A Guide to Genetic Testing",
    excerpt: "Explore how DNA testing can reveal insights about your health, ancestry, and more.",
    imageUrls: ["https://images.unsplash.com/photo-1635432743390-5e6e4e0e6b6e?q=80&w=1932&auto=format&fit=crop"],
    category: "health",
  },
  {
    blogId: "2",
    title: "The Role of Genetics in Personalized Medicine",
    excerpt: "Learn how your genetic profile can guide tailored healthcare solutions.",
    imageUrls: ["https://images.unsplash.com/photo-1576091160399-1f0c69f7c5a9?q=80&w=1932&auto=format&fit=crop"],
    category: "health",
  },
  {
    blogId: "3",
    title: "DNA and Disease Prevention: What You Need to Know",
    excerpt: "Discover how genetic testing can help identify and mitigate health risks.",
    imageUrls: ["https://images.unsplash.com/photo-1585435557343-3b0929fb6be0?q=80&w=1932&auto=format&fit=crop"],
    category: "health",
  },
  {
    blogId: "4",
    title: "The Future of Healthcare: Innovations in DNA Sequencing",
    excerpt: "Dive into the latest advancements in DNA sequencing and their impact on healthcare.",
    imageUrls: ["https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1932&auto=format&fit=crop"],
    category: "tech",
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