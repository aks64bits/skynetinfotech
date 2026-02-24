const pricingData = {
    web: {
        categoryName: "Web Development",
        plans: [
            {
                title: "Starter",
                usd: 199,
                features: ["5-Page Responsive Site", "Basic SEO", "Host Setup", "Contact Form"],
                featured: false,
                linkText: "Get Started"
            },
            {
                title: "Pro",
                usd: 499,
                features: ["Dynamic Site (CMS)", "10 Pages", "Advanced SEO", "Social Media Integration"],
                featured: true,
                linkText: "Get Started"
            },
            {
                title: "Enterprise",
                usd: 999,
                features: ["E-Commerce System", "Custom Web App", "API Integration", "Priority Support"],
                featured: false,
                linkText: "Consult Us"
            }
        ]
    },
    mobile: {
        categoryName: "Mobile Apps",
        plans: [
            {
                title: "Starter",
                usd: 399,
                features: ["MVP Hybrid App (1 Platform)", "5 Screens", "UI/UX Design", "Play Store Upload"],
                featured: false,
                linkText: "Get Started"
            },
            {
                title: "Pro",
                usd: 899,
                features: ["Cross-Platform (iOS & Android)", "10 Screens", "Backend Integration", "Push Notifications"],
                featured: true,
                linkText: "Get Started"
            },
            {
                title: "Enterprise",
                usd: 1999,
                features: ["Complex Native App", "Payment Gateway", "Scalable Infrastructure", "24/7 Support"],
                featured: false,
                linkText: "Consult Us"
            }
        ]
    },
    uiux: {
        categoryName: "UI / UX Design",
        plans: [
            {
                title: "Starter",
                usd: 99,
                features: ["Landing Page Design", "Figma Prototype", "1 Revision", "High-res Export"],
                featured: false,
                linkText: "Get Started"
            },
            {
                title: "Pro",
                usd: 299,
                features: ["Full Web Design (10 Pages)", "UI Kit & Brand Style", "Interactive Prototype", "Source Files"],
                featured: true,
                linkText: "Get Started"
            },
            {
                title: "Enterprise",
                usd: 699,
                features: ["Complete Product UI/UX", "App Design (15 Screens)", "User Research", "Unlimited Revisions"],
                featured: false,
                linkText: "Consult Us"
            }
        ]
    }
};

const EXCHANGE_RATE = 83;
const WHATSAPP_NUMBER = "918051648462";

function formatINR(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

function renderPricing(categoryId) {
    const container = document.getElementById('pricing-container');
    const categoryData = pricingData[categoryId];
    const plans = categoryData.plans;

    container.innerHTML = '';

    plans.forEach(plan => {
        const inrPrice = plan.usd * EXCHANGE_RATE;
        const card = document.createElement('div');
        card.className = `pricing-card fade-in ${plan.featured ? 'featured' : ''}`;

        // WhatsApp Message Generation
        const message = `Hi Skynetinfotech, I'm interested in the ${plan.title} plan for ${categoryData.categoryName}. Please provide more details.`;
        const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

        card.innerHTML = `
            ${plan.featured ? '<div class="featured-tag">Recommended</div>' : ''}
            <h3>${plan.title}</h3>
            <div class="price-container">
                <div class="price-usd">$${plan.usd}</div>
                <span class="price-inr">approx. ${formatINR(inrPrice)}</span>
            </div>
            <ul class="pricing-features">
                ${plan.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
            <a href="${waLink}" target="_blank" class="btn ${plan.featured ? 'btn-primary' : 'btn-secondary'}">${plan.linkText}</a>
        `;

        container.appendChild(card);

        // Trigger animation
        setTimeout(() => card.classList.add('visible'), 50);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPricing(btn.dataset.category);
        });
    });

    renderPricing('web');
});
