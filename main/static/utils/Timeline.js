export class TimelineAnimation {
    constructor(timelineSelector = '.timeline', contentSelector = '.timeline-content') {
        this.observer = null;
        this.timeline = document.querySelector(timelineSelector);
        this.elements = Array.from(document.querySelectorAll(contentSelector));
        this.initialize();
    }
    initialize() {
        this.elements.forEach((el, i) => {
            el.dataset.srIndex = i.toString();
            el.style.opacity = '0';
            el.style.transform = 'translateX(0)';
            el._isVisible = false;
        });
        if (!('IntersectionObserver' in window)) {
            this.fallback();
            return;
        }
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const el = entry.target;
                const index = parseInt(el.dataset.srIndex || '0', 10);
                const delay = index * 120;
                if (entry.isIntersecting && !el._isVisible) {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateX(0)';
                        const img = el.previousElementSibling;
                        if (img && img.classList.contains('timeline-img')) {
                            img.classList.add('active');
                        }
                        el._isVisible = true;
                        if (index < this.elements.length - 1) {
                            this.drawLineForItem(index);
                        }
                    }, delay);
                }
                if (!document.body.contains(el)) {
                    this.observer?.unobserve(el);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        });
        this.elements.forEach((el) => this.observer?.observe(el));
    }
    drawLineForItem(index) {
        const timelineItems = Array.from(document.querySelectorAll('.timeline-item'));
        const currentItem = timelineItems[index];
        const nextItem = timelineItems[index + 1];
        if (!currentItem || !nextItem) {
            // console.warn(`Item ${index}: Missing current or next item`);
            return;
        }
        const currentDot = currentItem.querySelector('.timeline-img');
        const nextDot = nextItem.querySelector('.timeline-img');
        if (currentDot && nextDot) {
            const top = currentDot.offsetTop + currentDot.offsetHeight + 15;
            let height = nextDot.offsetTop - (currentDot.offsetTop + currentDot.offsetHeight) - 30;
            const lineLeft = currentDot.offsetLeft + currentDot.offsetWidth / 2 - 2.5;
            const line = document.createElement('div');
            line.className = 'timeline-line-segment';
            line.style.top = `${top}px`;
            line.style.left = `${lineLeft}px`;
            if (this.timeline) {
                this.timeline.appendChild(line);
                setTimeout(() => {
                    line.style.height = `${height}px`;
                    line.style.opacity = '1';
                }, 10);
            }
        }
    }
    drawLines() {
        const timelineItems = Array.from(document.querySelectorAll('.timeline-item'));
        for (let index = 0; index < timelineItems.length - 1; index++) {
            this.drawLineForItem(index);
        }
    }
    fallback() {
        this.elements.forEach((el) => {
            el.style.opacity = '1';
            el.style.transform = 'translateX(0)';
            const img = el.previousElementSibling;
            if (img && img.classList.contains('timeline-img')) {
                img.classList.add('active');
            }
            el._isVisible = true;
        });
        this.drawLines();
    }
    destroy() {
        this.elements.forEach((el) => this.observer?.unobserve(el));
        this.observer?.disconnect();
    }
}
