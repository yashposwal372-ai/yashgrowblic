import type { ServiceCategory } from "@/types/services";

export const serviceCategories: ServiceCategory[] = [
  {
    description:
      "Intelligent products, assistants, and workflows designed to automate repetitive processes and improve digital experiences.",
    id: "ai-automation",
    title: "AI & Automation",
    items: [
      { name: "AI Product Development" },
      { name: "AI Chatbots" },
      { name: "AI Writing Assistants" },
      { name: "AI Customer Support Systems" },
      { name: "AI Agents" },
      { name: "Workflow Automation" },
      { name: "Generative AI Applications" },
    ],
  },
  {
    description:
      "Modern websites, e-commerce experiences, portals, and scalable web applications built around clear business goals.",
    id: "web-development",
    title: "Web Development",
    items: [
      { name: "Corporate Websites" },
      { name: "E-commerce Websites" },
      { name: "Web Applications" },
      { name: "Job Portals" },
      { name: "College Portals" },
      { name: "Management Portals" },
      { name: "Single Page Applications" },
    ],
  },
  {
    description:
      "Purposeful mobile products for Android, iOS, and cross-platform experiences across business, commerce, and education.",
    id: "mobile-applications",
    title: "Mobile Applications",
    items: [
      { name: "Android Apps" },
      { name: "iOS Apps" },
      { name: "Cross-platform Apps" },
      { name: "Business Apps" },
      { name: "E-commerce Apps" },
      { name: "Education Apps" },
    ],
  },
  {
    description:
      "Custom business software, subscription products, SaaS systems, dashboards, and automation platforms.",
    id: "saas-software",
    title: "SaaS & Software",
    items: [
      { name: "SaaS Products" },
      { name: "Custom Software" },
      { name: "CRM" },
      { name: "ERP" },
      { name: "Business Dashboards" },
      { name: "Automation Platforms" },
    ],
  },
  {
    description:
      "Digital learning, examination, quiz, course, and student-management experiences for modern education.",
    id: "education-technology",
    title: "Education Technology",
    items: [
      { name: "Online Course Platforms" },
      { name: "Learning Management Systems" },
      { name: "Quiz and Test Software" },
      { name: "Online Examination Systems" },
      { name: "Student Management Systems" },
      { name: "College Management Portals" },
    ],
  },
  {
    description:
      "Software interfaces and product experiences for monitoring, authentication, password management, and security workflows.",
    id: "cybersecurity",
    title: "Cybersecurity",
    items: [
      { name: "Security Monitoring Interfaces" },
      { name: "Authentication Systems" },
      { name: "Login Security Solutions" },
      { name: "Password Management Product Interfaces" },
      { name: "Security Dashboards" },
      { name: "Cybersecurity Software Interfaces" },
    ],
  },
  {
    description:
      "Digital growth experiences supporting advertising, lead generation, landing-page performance, and marketing automation.",
    id: "digital-growth",
    title: "Digital Growth",
    items: [
      { name: "Google Ads" },
      { name: "Meta Ads" },
      { name: "Lead Generation" },
      { name: "Landing Page Optimization" },
      { name: "Marketing Automation" },
    ],
  },
  {
    description:
      "Ongoing maintenance, optimization, upgrades, bug fixing, and product support for evolving digital systems.",
    id: "growblic-care",
    title: "Growblic Care",
    items: [
      { name: "Website Maintenance" },
      { name: "App Maintenance" },
      { name: "Software Maintenance" },
      { name: "Performance Optimization" },
      { name: "Bug Fixing" },
      { name: "Product Upgrades" },
      { name: "Technical Support" },
    ],
  },
];
