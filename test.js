index = 1;
const eventsCount = 3;
const maxIndex = Math.ceil((eventsCount - 1) / 2);
for (const num in [-2, -1, 0, 1, 2]) {
    newIndex = (-num + index + maxIndex) % (eventsCount + 1) - maxIndex;
    console.log(`for ${num} newIndex is ${newIndex}`);
}

