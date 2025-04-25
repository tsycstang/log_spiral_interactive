// Initialize parameters
let alpha = 36; // Initial angle in degrees
const theta = Array.from({length: 14400}, (_, i) => i * 0.5 );

// Function to calculate the logarithmic spiral
function calculateSpiral(alphaDegrees) {
    const alphaRadians = alphaDegrees * Math.PI / 180;
    return theta.map(t => Math.exp(t * (Math.PI / 180) * (1 / Math.tan(alphaRadians))));
}

// Create initial plot
const data = [{
    type: 'scatterpolar',
    mode: 'lines',
    r: calculateSpiral(alpha),
    theta: theta,
    line: {
        color: 'rgb(31, 119, 180)',
        width: 2
    }
}];

const layout = {
    polar: {
        radialaxis: {
            visible: true,
            range: [0, 60]
        },
        angularaxis: {
            visible: true,
            rotation: 0
        }
    },
    showlegend: false,
    margin: {
        l: 50,
        r: 50,
        t: 50,
        b: 50
    }
};

Plotly.newPlot('plot', data, layout);

// Add slider interaction
const slider = document.getElementById('alpha-slider');
const alphaValue = document.getElementById('alpha-value');

slider.addEventListener('input', function() {
    alpha = parseInt(this.value);
    alphaValue.textContent = alpha + '°';
    
    const newR = calculateSpiral(alpha);
    
    Plotly.animate('plot', {
        data: [{r: newR}],
        traces: [0],
        layout: {}
    }, {
        transition: {
            duration: 300,
            easing: 'cubic-in-out'
        },
        frame: {
            duration: 300
        }
    });
}); 