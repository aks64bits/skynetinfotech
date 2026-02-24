const serviceDetails = {
    web: {
        title: "Web Development",
        icon: "🌐",
        description: "Custom web solutions designed for high performance and scalability. We use a cutting-edge tech stack to build lightning-fast web applications.",
        process: [
            { step: "01", name: "Concept & Wireframing", desc: "Mapping out structure and user flow." },
            { step: "02", name: "Modern Development", desc: "Coding using React/Next.js and optimized backends." },
            { step: "03", name: "Optimization", desc: "Rigorous testing for speed, SEO, and security." }
        ],
        plans: [
            { name: "Starter", focus: "Personal/Small Business", specs: ["Static Landing Pages", "Responsive Design", "Basic SEO"] },
            { name: "Pro", focus: "Growth Businesses", specs: ["CMS Integration", "Custom Design", "Performance Tuning"] },
            { name: "Enterprise", focus: "Custom Web Apps", specs: ["Scaling Architecture", "Full Customization", "Priority Support"] }
        ],
        techStack: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS", "AWS"]
    },
    mobile: {
        title: "Mobile Apps",
        icon: "📱",
        description: "Native and cross-platform mobile experiences that feel premium and work flawlessly on both iOS and Android platforms.",
        process: [
            { step: "01", name: "Platform Strategy", desc: "Deciding between Native, Hybrid, or Cross-platform." },
            { step: "02", name: "UI Architecture", desc: "Designing fluid, touch-optimized interfaces." },
            { step: "03", name: "Deployment", desc: "App Store and Play Store optimization and launch." }
        ],
        plans: [
            { name: "Starter", focus: "MVP Development", specs: ["Single Platform", "Basic Features", "Native Performance"] },
            { name: "Pro", focus: "Full Product Launch", specs: ["Cross-Platform", "Backend Integration", "Post-launch Support"] },
            { name: "Enterprise", focus: "Global Scale", specs: ["Advanced Security", "Real-time Sync", "Dedicated CI/CD"] }
        ],
        techStack: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase", "Supabase"]
    },
    uiux: {
        title: "UI / UX Design",
        icon: "🎨",
        description: "We don't just design screens; we design experiences. Our process ensures every click is purposeful and every pixel is perfect.",
        process: [
            { step: "01", name: "User Research", desc: "Analyzing user behavior and pain points." },
            { step: "02", name: "Prototype", desc: "High-fidelity interactive prototypes in Figma." },
            { step: "03", name: "Design System", desc: "Creating a scalable visual language for your brand." }
        ],
        plans: [
            { name: "Starter", focus: "Essential Design", specs: ["Landing Page UI", "Basic UX Audit", "Prototype"] },
            { name: "Pro", focus: "Complete Branding", specs: ["Full Web/App UI", "Iconography", "Interaction Design"] },
            { name: "Enterprise", focus: "Product Strategy", specs: ["Design Systems", "User Testing", "Ongoing Iterations"] }
        ],
        techStack: ["Figma", "Adobe XD", "Principle", "After Effects", "Storybook", "Maze"]
    }
};

function renderServiceSheet(serviceId) {
    const data = serviceDetails[serviceId];
    const content = document.getElementById('sheet-content');

    content.innerHTML = `
        <div class="infographic-section">
            <h1 class="gradient-text" style="font-size: 3rem; margin-bottom: 0.5rem;">${data.icon} ${data.title}</h1>
            <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.8;">${data.description}</p>
        </div>

        <div class="infographic-section">
            <h3 class="infographic-title">🚀 Delivery Process</h3>
            <div class="process-horizontal" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                ${data.process.map(p => `
                    <div style="background: rgba(255,255,255,0.02); padding: 1rem; border-radius: 10px;">
                        <span style="font-size: 0.8rem; color: var(--primary-color); font-weight: 700;">${p.step}</span>
                        <h5 style="margin: 0.5rem 0;">${p.name}</h5>
                        <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">${p.desc}</p>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="infographic-section">
            <h3 class="infographic-title">🛠️ Detailed Plan Features</h3>
            <div class="feature-grid">
                ${data.plans.map(plan => `
                    <div class="feature-item">
                        <h4>${plan.name}</h4>
                        <p style="font-size: 0.9rem; margin-bottom: 0.75rem; color: var(--accent-color);">${plan.focus}</p>
                        <ul style="list-style: none; font-size: 0.85rem; color: var(--text-muted);">
                            ${plan.specs.map(s => `<li>✓ ${s}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="infographic-section">
            <h3 class="infographic-title">⚡ Tech Stack</h3>
            <div class="tech-stack">
                ${data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.service-card');
    const sheet = document.getElementById('service-sheet');
    const overlay = document.getElementById('service-overlay');
    const closeBtn = document.querySelector('.close-sheet');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceId = card.dataset.service;
            renderServiceSheet(serviceId);
            sheet.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        });
    });

    const closeSheet = () => {
        sheet.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeSheet);
    overlay.addEventListener('click', closeSheet);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSheet();
    });
});
