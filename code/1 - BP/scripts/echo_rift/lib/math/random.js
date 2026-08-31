export function randomWeightIndex(values) {
    let totalWeight = 0;
    for (let i = 0, len = values.length; i < len; i++)
        totalWeight += (values[i] ?? 1);
    let randomValue = Math.random() * totalWeight;
    for (let i = 0, len = values.length; i < len; i++) {
        randomValue -= (values[i] ?? 1);
        if (randomValue < 0)
            return i;
    }
    return values.length - 1;
}
export function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}
