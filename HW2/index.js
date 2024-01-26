function calculateDiskriminant(a, b, c) {
    const d = b * b - 4 * a * c;
    return d;
};

function quadraticEquationRoots(a, b, diskriminant) {
    if (diskriminant < 0) {
        return console.log('У квадратного уравнения с такими коэффициентами нет корней');
    } else if (diskriminant === 0) {
        const root = -b / (2 * a);
        return console.log(`У квадратного уравнения с такими коэффициентами один корень ${root}`);
    } else {
        const root1 = (-b + Math.pow(diskriminant, 0.5)) / (2 * a);
        const root2 = (-b - Math.pow(diskriminant, 0.5)) / (2 * a);
        return console.log(`У квадратного уравнения с такими коэффициентами два кореня ${root1} ${root2}`);
    };
};

module.exports = { calculateDiskriminant, quadraticEquationRoots };