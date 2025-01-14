export const setBg = () => {
    document.addEventListener('DOMContentLoaded', function() {
        function getRandomColor() {
            return {
                r: Math.floor(Math.random() * 256),
                g: Math.floor(Math.random() * 256),
                b: Math.floor(Math.random() * 256)
            };
        }

        function calculateBrightness(color) {
            return (color.r * 299 + color.g * 587 + color.b * 114) / 1000;
        }

        function updateTextColor(color1, color2) {
            const contentElement = document.querySelector('body');
            if (!contentElement) return;
            const brightness1 = calculateBrightness(color1);
            const brightness2 = calculateBrightness(color2);
            const averageBrightness = (brightness1 + brightness2) / 2;
            contentElement.style.color = averageBrightness > 128 ? 'black' : 'white';
        }

        const layer1 = document.querySelector('.layer1');
        const layer2 = document.querySelector('.layer2');
        if (!layer1 || !layer2) return; // Safeguard against missing elements
        let isLayer1Visible = true;

        function setRandomBackground() {
            const color1 = getRandomColor();
            const color2 = getRandomColor();
            const gradient = `linear-gradient(135deg, rgb(${color1.r}, ${color1.g}, ${color1.b}), rgb(${color2.r}, ${color2.g}, ${color2.b}))`;

            if (isLayer1Visible) {
                layer2.style.background = gradient;
                layer2.style.opacity = 1;
                layer1.style.opacity = 0;
            } else {
                layer1.style.background = gradient;
                layer1.style.opacity = 1;
                layer2.style.opacity = 0;
            }
            isLayer1Visible = !isLayer1Visible;
            updateTextColor(color1, color2);
        }

        setInterval(setRandomBackground, 10000);
        setRandomBackground();
    });
}