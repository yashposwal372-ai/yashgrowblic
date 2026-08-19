import type { ProductConcept } from "@/types/products";

export const productConcepts: ProductConcept[] = [
  {
    id: "ai-desk",
    index: "01",
    name: "Growblic AI Desk",
    category: "AI Customer Support Platform",
    description:
      "A conceptual workspace for AI-assisted support, conversation management, customer context, automation, and escalation workflows.",
    capabilities: [
      "AI Conversations",
      "Customer Context",
      "Smart Replies",
      "Ticket Routing",
      "Workflow Automation",
      "Human Escalation",
    ],
    interfaceType: "ai-desk",
  },
  {
    id: "flow",
    index: "02",
    name: "Growblic Flow",
    category: "AI Automation Platform",
    description:
      "A conceptual workflow environment for connecting triggers, AI actions, conditions, approvals, and business processes.",
    capabilities: [
      "Workflow Builder",
      "AI Actions",
      "Triggers",
      "Conditions",
      "Approvals",
      "Integrations",
    ],
    interfaceType: "flow",
  },
  {
    id: "learn",
    index: "03",
    name: "Growblic Learn",
    category: "Education Platform",
    description:
      "A conceptual digital-learning system combining courses, assessments, student progress, examinations, and management.",
    capabilities: [
      "Online Courses",
      "Student Dashboard",
      "Quiz & Tests",
      "Examination",
      "Progress Tracking",
      "Course Management",
    ],
    interfaceType: "learn",
  },
  {
    id: "commerce",
    index: "04",
    name: "Growblic Commerce",
    category: "E-commerce Platform",
    description:
      "A conceptual commerce operating system for products, orders, inventory, customers, and business operations.",
    capabilities: [
      "Products",
      "Orders",
      "Inventory",
      "Customers",
      "Store Analytics",
      "Management Dashboard",
    ],
    interfaceType: "commerce",
  },
  {
    id: "secure",
    index: "05",
    name: "Growblic Secure",
    category: "Security Monitoring Interface",
    description:
      "A conceptual interface for authentication events, monitoring workflows, login activity, alerts, and access visibility.",
    capabilities: [
      "Authentication Events",
      "Login Monitoring",
      "Access Activity",
      "Alert Interface",
      "Security Events",
      "Account Visibility",
    ],
    interfaceType: "secure",
  },
];
