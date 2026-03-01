// Custom cursor
const cursor = document.getElementById('cursor');
let mouseX = 0,
	mouseY = 0,
	cursorX = 0,
	cursorY = 0;

document.addEventListener('mousemove', (e) => {
	mouseX = e.clientX;
	mouseY = e.clientY;
});

function animateCursor() {
	cursorX += (mouseX - cursorX) * 0.15;
	cursorY += (mouseY - cursorY) * 0.15;
	cursor.style.left = cursorX + 'px';
	cursor.style.top = cursorY + 'px';
	requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effect
document.querySelectorAll('a, button, .bento-item, .visit-brutal-card, .social-brutal a').forEach(el => {
	el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
	el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

// Nav scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
	nav.classList.toggle('scrolled', window.scrollY > 80);
});

// Mobile menu
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
	navLinks.classList.toggle('open');
	navToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});

navLinks.querySelectorAll('a').forEach(link => {
	link.addEventListener('click', () => {
		navLinks.classList.remove('open');
		navToggle.textContent = '☰';
	});
});

// History cards reveal
const revealObserver = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
		}
	});
}, {
	threshold: 0.15,
	rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.history-card').forEach(card => {
	revealObserver.observe(card);
});

// Stat counter animation
const statObserver = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			const el = entry.target;
			const target = parseInt(el.dataset.target);
			if (!target) return;
			let current = 0;
			const increment = target / 60;
			const timer = setInterval(() => {
				current += increment;
				if (current >= target) {
					current = target;
					clearInterval(timer);
				}
				el.textContent = Math.floor(current).toLocaleString();
			}, 20);
			statObserver.unobserve(el);
		}
	});
}, {
	threshold: 0.5
});

document.querySelectorAll('.stat-number[data-target]').forEach(el => {
	statObserver.observe(el);
});

// Parallax on scroll for bento items
let ticking = false;
window.addEventListener('scroll', () => {
	if (!ticking) {
		requestAnimationFrame(() => {
			const scrolled = window.scrollY;
			const heroText = document.querySelector('.hero-big-text');
			if (heroText) {
				heroText.style.transform = `translateX(${scrolled * 0.3}px)`;
			}
			ticking = false;
		});
		ticking = true;
	}
});

// Form submission
function handleSubmit() {
	const success = document.getElementById('formSuccess');
	success.classList.add('show');
	document.querySelector('.form-brutal').reset();
	setTimeout(() => success.classList.remove('show'), 4000);
}

// Magnetic effect on buttons
document.querySelectorAll('.btn-wild, .btn-outline').forEach(btn => {
	btn.addEventListener('mousemove', (e) => {
		const rect = btn.getBoundingClientRect();
		const x = e.clientX - rect.left - rect.width / 2;
		const y = e.clientY - rect.top - rect.height / 2;
		btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
	});
	btn.addEventListener('mouseleave', () => {
		btn.style.transform = '';
	});
});