// --- Simple Calculations ---

export const calculateWatt = (voltage, current) => {
    return (parseFloat(voltage) * parseFloat(current)).toFixed(2);
};

export const calculateRPM = (kv, voltage) => {
    return (parseFloat(kv) * parseFloat(voltage)).toFixed(0);
};

export const calculateGearRatio = (spur, pinion) => {
    if (parseFloat(pinion) === 0) return "0.00";
    return (parseFloat(spur) / parseFloat(pinion)).toFixed(2);
};

export const calculateMaxBatteryPower = (capacity, cRating, voltage) => {
    const current = (parseFloat(capacity) / 1000) * parseFloat(cRating);
    return (current * parseFloat(voltage)).toFixed(2);
};

export const calculateSpeed = (motorRpm, spur, pinion, tire) => {
    const motorRpmVal = parseFloat(motorRpm);
    const ratio = parseFloat(spur) / parseFloat(pinion);
    const tireDiameter = parseFloat(tire); // in mm
    if (ratio === 0) return "0.00";
    const wheelRpm = motorRpmVal / ratio;
    const speedKmh = (wheelRpm * Math.PI * tireDiameter * 60) / 1000000;
    return speedKmh.toFixed(2);
};

export const calculateRunTime = (capacity, avgCurrent) => {
    if (parseFloat(avgCurrent) === 0) return "0.0";
    return ((parseFloat(capacity) / 1000) / parseFloat(avgCurrent) * 60).toFixed(1);
};

// --- New Simple Calculations ---

export const calculateFDR = (internalRatio, spur, pinion) => {
    if (parseFloat(pinion) === 0) return "0.00";
    return (parseFloat(internalRatio) * (parseFloat(spur) / parseFloat(pinion))).toFixed(2);
};

export const calculateRollout = (tireDiameter, fdr) => {
    if (parseFloat(fdr) === 0) return "0.00";
    return ((Math.PI * parseFloat(tireDiameter)) / parseFloat(fdr)).toFixed(2);
};

export const calculateChargeTime = (capacity, chargeCurrent) => {
    if (parseFloat(chargeCurrent) === 0) return "0";
    return ((parseFloat(capacity) / 1000) / parseFloat(chargeCurrent) * 60).toFixed(0);
};

export const calculateScaleSpeed = (actualSpeed, scale) => {
    return (parseFloat(actualSpeed) * parseFloat(scale)).toFixed(1);
};

export const calculateBatteryEnergy = (capacity, voltage) => {
    return ((parseFloat(capacity) / 1000) * parseFloat(voltage)).toFixed(2);
};

export const calculateCurrentDraw = (watt, voltage) => {
    if (parseFloat(voltage) === 0) return "0.00";
    return (parseFloat(watt) / parseFloat(voltage)).toFixed(2);
};

export const calculateMotorKV = (rpm, voltage) => {
    if (parseFloat(voltage) === 0) return "0";
    return (parseFloat(rpm) / parseFloat(voltage)).toFixed(0);
};

export const calculatePinionNeeded = (spur, motorRpm, wheelRpm) => {
    if (parseFloat(motorRpm) === 0 || parseFloat(wheelRpm) === 0) return "0";
    return (parseFloat(spur) / (parseFloat(motorRpm) / parseFloat(wheelRpm))).toFixed(0);
};

export const calculateVoltageDrop = (ir, current) => {
    return (parseFloat(ir) / 1000 * parseFloat(current)).toFixed(2);
};

export const calculateInternalResistancePerCell = (totalIr, cells) => {
    if (parseInt(cells) === 0) return "0.00";
    return (parseFloat(totalIr) / parseInt(cells)).toFixed(2);
};

// --- New Advanced Calculations ---

export const calculateCGBalance = (frontWeight, totalWeight) => {
    if (parseFloat(totalWeight) === 0) return "0.0";
    return ((parseFloat(frontWeight) / parseFloat(totalWeight)) * 100).toFixed(1);
};

export const calculateCornerWeightBalance = (fl, fr, rl, rr) => {
    const total = parseFloat(fl) + parseFloat(fr) + parseFloat(rl) + parseFloat(rr);
    if (total === 0) return "0.0";
    const diag1 = parseFloat(fl) + parseFloat(rr);
    return ((diag1 / total) * 100).toFixed(1);
};

export const calculateTurningRadius = (wheelbase, steeringAngle) => {
    const angleRad = parseFloat(steeringAngle) * (Math.PI / 180);
    if (Math.sin(angleRad) === 0) return "0";
    return (parseFloat(wheelbase) / Math.sin(angleRad)).toFixed(0);
};

export const calculateMotorEfficiency = (outPower, inPower) => {
    if (parseFloat(inPower) === 0) return "0.0";
    return ((parseFloat(outPower) / parseFloat(inPower)) * 100).toFixed(1);
};

export const calculateESCThermalLoad = (avgCurrent, resistance) => {
    return (Math.pow(parseFloat(avgCurrent), 2) * (parseFloat(resistance) / 1000)).toFixed(2);
};

export const calculateDragForce = (cd, area, velocity) => {
    const v = parseFloat(velocity) / 3.6; // convert km/h to m/s
    return (0.5 * 1.225 * parseFloat(area) * parseFloat(cd) * Math.pow(v, 2)).toFixed(2);
};

export const calculateShockOilViscosityChange = (oil, tempChange) => {
    return (parseFloat(oil) * (1 - (parseFloat(tempChange) * 0.01))).toFixed(0);
};

export const calculateWeightTransfer = (weight, cgHeight, wheelbase, accel) => {
    if (parseFloat(wheelbase) === 0) return "0.00";
    return ((parseFloat(weight) * parseFloat(cgHeight) * parseFloat(accel)) / parseFloat(wheelbase)).toFixed(2);
};

export const calculateTireSpringRate = (load, deflection) => {
    if (parseFloat(deflection) === 0) return "0.00";
    return (parseFloat(load) / parseFloat(deflection)).toFixed(2);
};

export const calculateTorque = (power, rpm) => {
    if (parseFloat(rpm) === 0) return "0.00";
    return (parseFloat(power) * 9.5488 / parseFloat(rpm)).toFixed(2);
};

export const calculateShockOil = (wt) => {
    // Approximate conversion
    return (parseFloat(wt) * 13).toFixed(0);
};

export const calculateSafeAmps = (capacity, cRating) => {
    return ((parseFloat(capacity) / 1000) * parseFloat(cRating)).toFixed(2);
};

export const calculateWheelRate = (springRate, motionRatio) => {
    return (parseFloat(springRate) * Math.pow(parseFloat(motionRatio), 2)).toFixed(2);
};

// --- Complex Calculations (Returning Objects) ---

export const calculateFDRComplex = (spur, pinion, internalRatio, tireDiameter) => {
    const s = parseFloat(spur) || 0;
    const p = parseFloat(pinion) || 0;
    const ir = parseFloat(internalRatio) || 1;
    const d = parseFloat(tireDiameter) || 0;

    if (p === 0) return { main: "0.00", secondary: [] };

    const fdr = ir * (s / p);
    const rollout = (Math.PI * d) / fdr;

    return {
        main: fdr.toFixed(2),
        secondary: [
            { label: 'Rollout', value: rollout.toFixed(2), unit: 'mm' },
            { label: 'Transmission Ratio', value: ir.toFixed(2), unit: ': 1' }
        ]
    };
};

export const calculateRolloutComplex = (tireDiameter, internalRatio, spur, pinion) => {
    const s = parseFloat(spur) || 0;
    const p = parseFloat(pinion) || 0;
    const ir = parseFloat(internalRatio) || 1;
    const d = parseFloat(tireDiameter) || 0;

    if (p === 0) return { main: "0.00", secondary: [] };

    const fdr = ir * (s / p);
    const rollout = (Math.PI * d) / fdr;

    return {
        main: rollout.toFixed(2),
        secondary: [
            { label: 'FDR (Final Drive Ratio)', value: fdr.toFixed(2), unit: ': 1' },
            { label: 'Gear Ratio', value: (s / p).toFixed(2), unit: ': 1' }
        ]
    };
};
