// Function to compute the first-order to fourth-order values
function computeRKValues(dydx, x0, y0, h, xg) {
    let results = [];
    while (x0 < xg) {
        let k1 = h * dydx(x0, y0);
        let k2 = h * dydx(x0 + h / 2, y0 + k1 / 2);
        let k3 = h * dydx(x0 + h / 2, y0 + k2 / 2);
        let k4 = h * dydx(x0 + h, y0 + k3);

        // Accurate calculation for y
        y0 += (k1 + 2 * k2 + 2 * k3 + k4) / 6;
        x0 += h;

        results.push({
            x: x0.toFixed(5),
            firstOrder: k1.toFixed(5),
            secondOrder: k2.toFixed(5),
            thirdOrder: k3.toFixed(5),
            fourthOrder: k4.toFixed(5),
            y: y0.toFixed(5)
        });
    }
    return results;
}

function calculateRK4() {
    const equation = document.getElementById("equation").value;
    const x0 = document.getElementById("x0").value;
    const y0 = document.getElementById("y0").value;
    const h = document.getElementById("h").value;
    const xg = document.getElementById("xg").value;

    // Check for empty inputs
    if (!equation || x0 === "" || y0 === "" || h === "" || xg === "") {
        alert("Please fill in all fields before calculating.");
        return;
    }

    const x0Num = parseFloat(x0);
    const y0Num = parseFloat(y0);
    const hNum = parseFloat(h);
    const xgNum = parseFloat(xg);

    try {
        // Convert the input equation into a function
        const dydx = math.compile(equation);

        // Helper function to evaluate dydx
        const evaluateDydx = (x, y) => dydx.evaluate({ x: x, y: y });

        // Compute the results using RK4
        const results = computeRKValues(evaluateDydx, x0Num, y0Num, hNum, xgNum);

        // Display the final accurate result and k values
        const lastResult = results[results.length - 1];
        document.getElementById("result").textContent = `The value of y(${parseFloat(lastResult.x).toFixed(2)}) is = ${lastResult.y}`;

        // Display the first-order to fourth-order values for each iteration
        const details = results.map(r => {
            return `x = ${r.x}, y = ${r.y} `;
        }).join("\n\n");

        document.getElementById("details").textContent = details;
    } catch (error) {
        alert("Invalid equation format. Maybe try changing/interchanging the initial values of x and y OR double check the equation for its sign convention :)");
    }
}




//Trapezoidal-------------------------------------------------------------------------------

 function trapezoidalDoubleIntegral(func, xLower, xUpper, yLower, yUpper, xSteps = 1, ySteps = 1) {
            const deltaX = (xUpper - xLower) / xSteps;
            const deltaY = (yUpper - yLower) / ySteps;
            let integral = 0;

            for (let i = 0; i <= xSteps; i++) {
                const x = xLower + i * deltaX;
                for (let j = 0; j <= ySteps; j++) {
                    const y = yLower + j * deltaY;
                    const weight =
                        (i === 0 || i === xSteps ? 1 : 2) *
                        (j === 0 || j === ySteps ? 1 : 2);
                    integral += weight * func(x, y);
                }
            }

            integral *= (deltaX * deltaY) / 4;
            return integral;
        }

        function calculateIntegral() {
            const funcInput = document.getElementById("functionInput").value;
            const xLower = parseFloat(document.getElementById("xLower").value);
            const xUpper = parseFloat(document.getElementById("xUpper").value);
            const yLower = parseFloat(document.getElementById("yLower").value);
            const yUpper = parseFloat(document.getElementById("yUpper").value);

            try {
                const func = new Function("x", "y", `return ${funcInput};`);
                const result = trapezoidalDoubleIntegral(func, xLower, xUpper, yLower, yUpper);
                document.getElementById("result_trap").textContent = `Result: ${result}`;
            } catch (error) {
                document.getElementById("result_trap").textContent = "Error: Invalid function input.";
            }
        }
