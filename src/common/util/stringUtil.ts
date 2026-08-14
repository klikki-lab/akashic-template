export function paddingSpace(value: number, digits: number) {
    const padding = ' '.repeat(digits - 1);
    return (padding + value).slice(-(padding.length + 1));
}