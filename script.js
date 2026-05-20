function runSimulation() {

    let wA = parseFloat(document.getElementById("wA").value);
    let wB = parseFloat(document.getElementById("wB").value);
    let r  = parseFloat(document.getElementById("r").value);

    // ===== WAITING TIME (EXACT OCTAVE FORMULA) =====
    let N = [
        parseFloat(document.getElementById("icuQueue").value),
        parseFloat(document.getElementById("erQueue").value),
        parseFloat(document.getElementById("ftQueue").value)
    ];

    let T = [
        parseFloat(document.getElementById("icuTime").value),
        parseFloat(document.getElementById("erTime").value),
        parseFloat(document.getElementById("ftTime").value)
    ];

    let C = [
        parseFloat(document.getElementById("icuCap").value),
        parseFloat(document.getElementById("erCap").value),
        parseFloat(document.getElementById("ftCap").value)
    ];

    let W = [
        (N[0] * T[0]) / C[0],
        (N[1] * T[1]) / C[1],
        (N[2] * T[2]) / C[2]
    ];

    let assigned = [0,0,0];
    let output = "";

    // ===== NEW: Array trackers for the charts =====
    let initialSeverities = [];
    let updatedSeverities = [];
    let patientLabels = [];

    patients.forEach(p => {

        let S = p.sev;

        // ===== Utility Model (EXACT OCTAVE) =====
        let U_ICU = wA * S - wB * W[0];
        let U_ER  = wA * (10 - Math.abs(S - 5)) - wB * W[1];
        let U_FT  = wA * (10 - S) - wB * W[2];

        let U = [U_ICU, U_ER, U_FT];

        // ===== SoftMax =====
        let maxU = Math.max(...U);
        let expU = U.map(x => Math.exp(x - maxU));
        let sumExp = expU.reduce((a,b)=>a+b,0);
        let P = expU.map(x => x / sumExp);

        // ===== Max Draw =====
        let unit = P.indexOf(Math.max(...P));
        assigned[unit]++;

        // ===== Severity Update =====
        let newS = S + (r * W[unit]);

        // ===== NEW: Tracker Push for charts =====
        initialSeverities.push(S);
        updatedSeverities.push(newS);
        patientLabels.push("Pt " + p.id);

        // ===== ESI Conversion (EXACT OCTAVE) =====
        let newEsi;
        if (newS >= 8) newEsi = 1;
        else if (newS >= 6) newEsi = 2;
        else if (newS >= 4) newEsi = 3;
        else if (newS >= 2) newEsi = 4;
        else newEsi = 5;

        let status = (newEsi < p.esi)
            ? "<span style='color:red;'>Deteriorated</span>"
            : "<span style='color:lightgreen;'>Stable</span>";

        output += `
        <b>Patient ${p.id}</b><br>
        ICU ${(P[0]*100).toFixed(1)}% |
        ER ${(P[1]*100).toFixed(1)}% |
        FT ${(P[2]*100).toFixed(1)}%<br>
        Assigned: ${["ICU","ER","Fast Track"][unit]}<br>
        Severity: ${S.toFixed(2)} → ${newS.toFixed(2)}<br>
        ESI: ${p.esi} → ${newEsi} (${status})<br>
        <hr style='border-color: #334155;'>
        `;
    });

    document.getElementById("results").innerHTML = output;

    // ===== NEW: Call the updated drawing function with all data =====
    drawCharts(assigned, W, initialSeverities, updatedSeverities, patientLabels);
}