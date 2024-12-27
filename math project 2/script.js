// Function to implement the 4th Order Runge-Kutta Method
        function rungeKutta4thOrder(dydx, x0, y0, h, xg) {
            while (x0 < xg) {
                let k1 = h * dydx(x0, y0);
                let k2 = h * dydx(x0 + h / 2, y0 + k1 / 2);
                let k3 = h * dydx(x0 + h / 2, y0 + k2 / 2);
                let k4 = h * dydx(x0 + h, y0 + k3);

                y0 += (k1 + 2 * k2 + 2 * k3 + k4) / 6;
                x0 += h;
            }

            return y0;
        }

        function calculateRK4() {
            const equation = document.getElementById("equation").value;
            const x0 = parseFloat(document.getElementById("x0").value);
            const y0 = parseFloat(document.getElementById("y0").value);
            const h = parseFloat(document.getElementById("h").value);
            const xg = parseFloat(document.getElementById("xg").value);

            // Convert the input equation into a function
            const dydx = new Function('x', 'y', `return ${equation};`);

            // Compute the result using RK4 method
            const result = rungeKutta4thOrder(dydx, x0, y0, h, xg);

            // Display the result with up to 5 decimal places
            document.getElementById("result").textContent = `The value of y at x = ${xg} is approximately ${result.toFixed(5)}`;
        }