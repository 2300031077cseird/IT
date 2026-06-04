(function () {
  "use strict";

  const categories = {
    bpo: {
      label: "BPO Services",
      accent: "Operations excellence",
      approach: [
        "Discovery of process volume, channels, service levels, and escalation paths.",
        "Team setup with scripts, knowledge base, quality scorecards, and reporting cadence.",
        "Live delivery with SLA tracking, supervisor review, and continuous improvement.",
        "Monthly optimization across productivity, customer satisfaction, accuracy, and cost."
      ],
      metrics: [
        ["24/7", "Support coverage"],
        ["40%", "Cost reduction potential"],
        ["98%", "Target CSAT"],
        ["60%", "Faster response"]
      ]
    },
    it: {
      label: "IT Services",
      accent: "Technology delivery",
      approach: [
        "Requirement mapping, architecture planning, delivery roadmap, and risk assessment.",
        "Agile development with UI, backend, cloud, security, testing, and release governance.",
        "Deployment with documentation, monitoring, handover, and production support.",
        "Continuous enhancement based on analytics, user feedback, and business priorities."
      ],
      metrics: [
        ["99%", "Reliability target"],
        ["60%", "Faster releases"],
        ["35%", "Infra savings potential"],
        ["24/7", "Managed support"]
      ]
    },
    staffing: {
      label: "Staffing Services",
      accent: "Talent delivery",
      approach: [
        "Role intake with skill matrix, compensation range, timeline, and screening criteria.",
        "Sourcing, shortlisting, technical validation, interview coordination, and reporting.",
        "Offer support, onboarding coordination, replacement planning, and retention checks.",
        "Talent pipeline review for future hiring demand and workforce continuity."
      ],
      metrics: [
        ["45%", "Faster hiring"],
        ["120+", "Roles supported"],
        ["92%", "Retention focus"],
        ["3X", "Pipeline velocity"]
      ]
    },
    training: {
      label: "Training Services",
      accent: "Career enablement",
      approach: [
        "Skill assessment, learning path design, batch planning, and project outcome mapping.",
        "Instructor-led sessions with practical assignments, labs, reviews, and mentorship.",
        "Capstone projects, interview preparation, resume guidance, and placement readiness.",
        "Progress reporting for learners, institutions, and corporate training sponsors."
      ],
      metrics: [
        ["6+", "Learning tracks"],
        ["90%", "Practical focus"],
        ["3X", "Project readiness"],
        ["100%", "Mentored learning"]
      ]
    }
  };

  const services = {
    "customer-support": {
      title: "Customer Support",
      category: "bpo",
      icon: "fa-solid fa-comments",
      image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1800&q=80",
      summary: "Omnichannel customer support for queries, retention, service requests, escalations, and customer experience improvement.",
      overview: "Our customer support service helps businesses deliver consistent, professional, and measurable customer experiences across phone, email, chat, ticketing, and social channels. We design the support model around your products, customer journey, service levels, escalation rules, and reporting needs.",
      includes: ["Inbound and outbound customer support", "Email, chat, ticket, and voice handling", "Complaint management and escalation routing", "Knowledge base and script development", "Quality monitoring, coaching, and CSAT reporting"],
      outcomes: ["Improved customer satisfaction", "Reduced response and resolution time", "Better service consistency across channels", "Scalable support during peak demand"]
    },
    "technical-support": {
      title: "Technical Support",
      category: "bpo",
      icon: "fa-solid fa-screwdriver-wrench",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=80",
      summary: "L1 and L2 technical assistance for software, applications, devices, platforms, and enterprise users.",
      overview: "Our technical support teams help customers and internal users resolve product, application, device, access, and platform issues with structured troubleshooting and clear escalation governance.",
      includes: ["L1 and L2 troubleshooting", "Ticket classification and prioritization", "Remote assistance and user guidance", "Incident documentation and escalation", "Technical knowledge base maintenance"],
      outcomes: ["Faster issue resolution", "Lower support backlog", "Improved user experience", "Better visibility into recurring technical issues"]
    },
    "voice-process": {
      title: "Voice Process",
      category: "bpo",
      icon: "fa-solid fa-phone-volume",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1800&q=80",
      summary: "Inbound and outbound voice support programs with scripts, compliance, QA, and performance dashboards.",
      overview: "We build voice process teams for customer care, sales support, collections assistance, appointment handling, verification, and service follow-ups with strong training and supervisor control.",
      includes: ["Inbound call handling", "Outbound calling campaigns", "Script design and compliance checks", "Call quality monitoring", "Daily productivity and SLA reports"],
      outcomes: ["Improved call answer rate", "Higher first-contact resolution", "Consistent customer communication", "Controlled voice process cost"]
    },
    "non-voice-process": {
      title: "Non-Voice Process",
      category: "bpo",
      icon: "fa-solid fa-keyboard",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1800&q=80",
      summary: "Email, chat, ticketing, documentation, and workflow support for digital-first business operations.",
      overview: "Our non-voice process service manages written customer communication, back-office coordination, digital workflows, and documentation-heavy operations with speed and accuracy.",
      includes: ["Email and chat support", "Ticket processing and routing", "Document review and updates", "Workflow queue management", "Quality audits and response templates"],
      outcomes: ["Faster written response cycles", "Better documentation accuracy", "Reduced operational backlog", "Improved customer communication quality"]
    },
    "back-office-operations": {
      title: "Back Office Operations",
      category: "bpo",
      icon: "fa-solid fa-folder-tree",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1800&q=80",
      summary: "Process management for verification, order support, claims, records, administration, and operational workflows.",
      overview: "We help organizations move repetitive back-office work into a governed delivery model with clear SOPs, quality checks, turnaround targets, and business reporting.",
      includes: ["Data verification and document processing", "Order and claims support", "Record maintenance", "Operational administration", "Queue monitoring and exception handling"],
      outcomes: ["Reduced manual workload", "Higher processing accuracy", "Improved turnaround time", "Better operational control"]
    },
    "data-entry-processing": {
      title: "Data Entry and Processing",
      category: "bpo",
      icon: "fa-solid fa-database",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=80",
      summary: "Accurate data entry, processing, cleansing, validation, migration support, and structured reporting services.",
      overview: "Our data entry and processing teams handle high-volume information workflows with accuracy controls, validation checks, secure handling, and structured output formats.",
      includes: ["Manual and assisted data entry", "Data cleansing and validation", "Spreadsheet and CRM updates", "Migration support", "Data quality reporting"],
      outcomes: ["Cleaner business data", "Reduced processing errors", "Faster record updates", "Reliable reporting inputs"]
    },
    "web-development": {
      title: "Web Development",
      category: "it",
      icon: "fa-solid fa-laptop-code",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1800&q=80",
      summary: "Responsive websites, portals, dashboards, admin systems, and enterprise web applications.",
      overview: "We design and develop modern web experiences that are fast, responsive, secure, SEO-aware, and aligned with business workflows.",
      includes: ["Corporate websites and landing pages", "Web portals and admin dashboards", "Frontend and backend development", "API integrations", "Performance and SEO optimization"],
      outcomes: ["Professional digital presence", "Better user experience", "Scalable web platforms", "Improved online lead generation"]
    },
    "mobile-app-development": {
      title: "Mobile App Development",
      category: "it",
      icon: "fa-solid fa-mobile-screen",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1800&q=80",
      summary: "Mobile applications for customers, employees, operations, field teams, and business process workflows.",
      overview: "Our mobile app development service turns business processes into reliable mobile experiences with intuitive UX, secure APIs, and production-ready delivery.",
      includes: ["Android and iOS app planning", "UI and UX design", "API and backend integration", "Testing and deployment support", "Maintenance and feature enhancements"],
      outcomes: ["Improved mobile engagement", "Faster field operations", "Better customer access", "Scalable mobile product roadmap"]
    },
    "software-development": {
      title: "Software Development",
      category: "it",
      icon: "fa-solid fa-cubes",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1800&q=80",
      summary: "Custom software platforms, APIs, enterprise applications, automation systems, and modernization programs.",
      overview: "We build custom software around your business model, operational workflows, data requirements, security needs, and growth roadmap.",
      includes: ["Custom business applications", "API development and integrations", "Workflow and automation systems", "Database design", "Testing, deployment, and support"],
      outcomes: ["Digitized business workflows", "Reduced manual dependency", "Better process visibility", "Software aligned with your operations"]
    },
    "cloud-services": {
      title: "Cloud Services",
      category: "it",
      icon: "fa-solid fa-cloud",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=80",
      summary: "Cloud migration, infrastructure setup, optimization, monitoring, and managed cloud operations.",
      overview: "Our cloud services help businesses move from fragmented infrastructure to scalable, secure, monitored, and cost-aware cloud environments.",
      includes: ["Cloud readiness assessment", "Migration planning and execution", "Cloud infrastructure setup", "Monitoring and optimization", "Backup, security, and support"],
      outcomes: ["Improved reliability", "Lower infrastructure friction", "Better scalability", "Controlled cloud costs"]
    },
    "cyber-security": {
      title: "Cyber Security",
      category: "it",
      icon: "fa-solid fa-shield-virus",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1800&q=80",
      summary: "Security assessments, hardening, vulnerability management, awareness, and secure delivery practices.",
      overview: "We help organizations identify risks, strengthen systems, protect data, and build security practices into day-to-day technology operations.",
      includes: ["Security assessment and gap review", "Vulnerability scanning support", "System hardening guidance", "Access and data protection controls", "Security awareness support"],
      outcomes: ["Reduced security exposure", "Better control over access risks", "Improved compliance readiness", "More secure application delivery"]
    },
    "ai-solutions": {
      title: "AI Solutions",
      category: "it",
      icon: "fa-solid fa-brain",
      image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1800&q=80",
      summary: "AI assistants, analytics models, workflow automation, knowledge systems, and decision support tools.",
      overview: "Our AI solutions focus on practical use cases that reduce manual work, improve response quality, accelerate decision-making, and create measurable value.",
      includes: ["AI chatbot and assistant planning", "Predictive analytics use cases", "Knowledge base automation", "Workflow intelligence", "AI readiness and implementation support"],
      outcomes: ["Faster decisions", "Improved productivity", "Better knowledge access", "More consistent customer and employee support"]
    },
    "devops": {
      title: "DevOps",
      category: "it",
      icon: "fa-solid fa-code-branch",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80",
      summary: "CI/CD, release automation, observability, deployment governance, and production operations modernization.",
      overview: "Our DevOps service helps teams release software faster and more safely through automated pipelines, environment discipline, monitoring, and release governance.",
      includes: ["CI/CD pipeline setup", "Build and deployment automation", "Environment and release management", "Monitoring and logging", "DevOps process documentation"],
      outcomes: ["Faster releases", "Fewer deployment errors", "Better system visibility", "Improved developer productivity"]
    },
    "enterprise-applications": {
      title: "Enterprise Applications",
      category: "it",
      icon: "fa-solid fa-building-user",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80",
      summary: "Workflow systems, admin platforms, data portals, integrations, and business application modernization.",
      overview: "We develop and support enterprise applications that connect people, workflows, data, and business rules across departments.",
      includes: ["Internal portals and admin systems", "Workflow applications", "Data dashboards", "Enterprise integrations", "Application modernization support"],
      outcomes: ["Centralized operations", "Improved process visibility", "Reduced manual coordination", "Scalable enterprise workflows"]
    },
    "permanent-hiring": {
      title: "Permanent Hiring",
      category: "staffing",
      icon: "fa-solid fa-user-check",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80",
      summary: "End-to-end permanent hiring support for technology, operations, leadership, and specialist roles.",
      overview: "Our permanent hiring service helps companies close critical roles with structured sourcing, screening, interview coordination, and candidate engagement.",
      includes: ["Job description and skill matrix support", "Candidate sourcing and screening", "Interview scheduling", "Offer coordination", "Joining and follow-up support"],
      outcomes: ["Faster role closure", "Better candidate fit", "Reduced internal hiring workload", "Stronger talent pipeline"]
    },
    "contract-staffing": {
      title: "Contract Staffing",
      category: "staffing",
      icon: "fa-solid fa-people-arrows",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1800&q=80",
      summary: "Flexible contract teams for project delivery, seasonal demand, specialist skills, and workforce continuity.",
      overview: "We provide contract staffing support when businesses need rapid access to skilled professionals without long hiring cycles.",
      includes: ["Short-term and long-term contract hiring", "Project-based staffing", "Skill validation", "Onboarding coordination", "Replacement and continuity planning"],
      outcomes: ["Flexible workforce capacity", "Faster project ramp-up", "Lower hiring commitment risk", "Access to specialist skills"]
    },
    "executive-search": {
      title: "Executive Search",
      category: "staffing",
      icon: "fa-solid fa-magnifying-glass-chart",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=80",
      summary: "Confidential leadership search for strategic roles requiring domain expertise and cultural alignment.",
      overview: "Our executive search service supports senior and strategic hiring through targeted market mapping, confidential outreach, and leadership evaluation.",
      includes: ["Leadership role intake", "Market mapping and targeted outreach", "Candidate assessment", "Confidential coordination", "Offer and transition support"],
      outcomes: ["Higher leadership fit", "Confidential hiring process", "Better strategic alignment", "Reduced executive hiring risk"]
    },
    "recruitment-outsourcing": {
      title: "Recruitment Outsourcing",
      category: "staffing",
      icon: "fa-solid fa-list-check",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1800&q=80",
      summary: "Managed recruitment operations with sourcing, screening, interview coordination, and hiring reports.",
      overview: "Recruitment outsourcing gives businesses a dedicated hiring function that can scale across multiple roles, departments, and hiring campaigns.",
      includes: ["Recruitment process setup", "Sourcing and screening teams", "Interview pipeline management", "Hiring analytics", "Candidate communication"],
      outcomes: ["Scalable hiring engine", "Improved recruitment visibility", "Lower hiring administration", "Faster candidate movement"]
    },
    "full-stack-development": {
      title: "Full Stack Development",
      category: "training",
      icon: "fa-solid fa-layer-group",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=80",
      summary: "Frontend, backend, databases, APIs, deployment, and real-world project readiness for aspiring developers.",
      overview: "Our full stack development training prepares learners to build complete web applications with practical projects and career-focused mentoring.",
      includes: ["HTML, CSS, JavaScript, and frontend fundamentals", "Backend and API development", "Database design and usage", "Project deployment", "Portfolio and interview preparation"],
      outcomes: ["Project-ready development skills", "Better interview confidence", "Practical portfolio work", "Clear learning roadmap"]
    },
    "java-training": {
      title: "Java Training",
      category: "training",
      icon: "fa-brands fa-java",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1800&q=80",
      summary: "Core Java, object-oriented programming, frameworks, APIs, and enterprise application basics.",
      overview: "Our Java training builds strong programming foundations and introduces learners to enterprise application development concepts.",
      includes: ["Core Java and OOP", "Collections, exception handling, and file handling", "JDBC and database basics", "Framework introduction", "Mini projects and coding practice"],
      outcomes: ["Strong Java fundamentals", "Better coding confidence", "Enterprise application awareness", "Interview-ready concepts"]
    },
    "python-training": {
      title: "Python Training",
      category: "training",
      icon: "fa-brands fa-python",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1800&q=80",
      summary: "Python programming, automation, data handling, APIs, and problem-solving foundations.",
      overview: "Our Python training helps learners move from programming basics to practical automation, data processing, and application development use cases.",
      includes: ["Python syntax and programming logic", "Functions, modules, and file handling", "Automation scripts", "Data handling basics", "API and mini-project practice"],
      outcomes: ["Practical Python skills", "Automation readiness", "Improved problem solving", "Foundation for AI and data learning"]
    },
    "react-training": {
      title: "React Training",
      category: "training",
      icon: "fa-brands fa-react",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1800&q=80",
      summary: "Modern component-driven UI development with JavaScript, state, routing, and API integration.",
      overview: "Our React training helps learners build professional front-end applications with reusable components, state management, routing, and project structure.",
      includes: ["React components and props", "State and events", "Routing and forms", "API integration", "Project-based UI development"],
      outcomes: ["Modern UI development skills", "Portfolio-ready React projects", "Better JavaScript confidence", "Frontend interview readiness"]
    },
    "cloud-computing-training": {
      title: "Cloud Computing Training",
      category: "training",
      icon: "fa-solid fa-cloud-arrow-up",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=80",
      summary: "Cloud fundamentals, services, infrastructure concepts, deployment, monitoring, and operational practices.",
      overview: "Our cloud computing training introduces learners to cloud concepts, infrastructure services, deployment practices, security basics, and operations thinking.",
      includes: ["Cloud fundamentals", "Compute, storage, and networking concepts", "Deployment basics", "Monitoring and cost awareness", "Cloud project practice"],
      outcomes: ["Cloud foundation knowledge", "Better infrastructure understanding", "Deployment confidence", "Readiness for cloud roles"]
    },
    "ai-machine-learning-training": {
      title: "AI and Machine Learning Training",
      category: "training",
      icon: "fa-solid fa-robot",
      image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1800&q=80",
      summary: "AI foundations, machine learning concepts, data preparation, model workflows, and applied projects.",
      overview: "Our AI and machine learning training focuses on practical understanding of data, models, workflows, evaluation, and applied use cases.",
      includes: ["AI and ML fundamentals", "Data preparation and feature basics", "Model training concepts", "Evaluation and improvement", "Applied mini projects"],
      outcomes: ["AI concept clarity", "Practical ML workflow understanding", "Better data readiness", "Foundation for advanced AI learning"]
    }
  };

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("service") || "customer-support";
  const service = services[slug] || services["customer-support"];
  const category = categories[service.category];

  const setText = (selector, value) => {
    document.querySelectorAll(selector).forEach((node) => {
      node.textContent = value;
    });
  };

  const renderList = (selector, items) => {
    const node = document.querySelector(selector);
    if (!node) return;
    node.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
  };

  const renderMetrics = (selector, metrics) => {
    const node = document.querySelector(selector);
    if (!node) return;
    node.innerHTML = metrics.map(([number, label]) => `<div class="stat-card"><strong>${number}</strong><span>${label}</span></div>`).join("");
  };

  document.title = `${service.title} | Sampath Vinayak Technologies`;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute("content", `${service.title} service details from Sampath Vinayak Technologies. ${service.summary}`);

  const hero = document.querySelector(".page-hero");
  if (hero) hero.style.setProperty("--page-image", `url('${service.image}')`);

  const visualImage = document.querySelector("[data-service-visual-img]");
  if (visualImage) {
    visualImage.src = service.image;
    visualImage.alt = `${service.title} service visual`;
  }

  const icon = document.querySelector("[data-service-icon]");
  if (icon) icon.className = service.icon;

  setText("[data-service-title]", service.title);
  setText("[data-service-title-2]", service.title);
  setText("[data-service-category]", category.label);
  setText("[data-service-accent]", category.accent);
  setText("[data-service-summary]", service.summary);
  setText("[data-service-overview]", service.overview);
  setText("[data-service-cta]", `Apply for ${service.title}`);
  setText("[data-service-visual-title]", `${service.title} delivery model`);

  renderList("[data-service-includes]", service.includes);
  renderList("[data-service-approach]", category.approach);
  renderList("[data-service-outcomes]", service.outcomes);
  renderMetrics("[data-service-metrics]", category.metrics);

  const applyLink = document.querySelector("[data-service-apply]");
  if (applyLink) {
    applyLink.href = `contact.html?service=${encodeURIComponent(service.title)}#service-inquiry`;
    applyLink.textContent = `Apply for ${service.title}`;
  }
})();
