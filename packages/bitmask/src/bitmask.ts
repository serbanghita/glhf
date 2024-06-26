/**
 * Doom soundtrack: https://music.youtube.com/watch?v=cixW6rogZ48
 * Bitmask - why, how and when: https://alemil.com/bitmask
 * BigInt: arbitrary-precision integers in JavaScript https://v8.dev/features/bigint
 * Bit, Byte, and Binary: https://www.cs.cmu.edu/~fgandon/documents/lecture/uk1999/binary/HandOut.pdf
 */

/**
 * Add bit(s) to the bitmask.
 *
 *
 *
 * @param bitmasks
 * @param bit
 */
export function addBit(bitmasks: bigint, bit: bigint): bigint {
    bitmasks |= bit;
    return bitmasks;
}

/**
 * Toggle **existing** or **non-existing** bit(s) from the bitmask.
 *
 * Bitwise XOR (^)
 * The bitwise XOR operator (^) returns a 1 in each bit position for which the corresponding bits
 * of either but not both operands are 1s.
 * @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR
 *
 * @param bitmasks
 * @param bit
 */
export function toggleBit(bitmasks: bigint, bit: bigint): bigint {
    bitmasks ^= bit;
    return bitmasks;
}

/**
 * Remove **existing** or **non-existing** bit(s) from the bitmask.
 *
 * Bitwise AND (&)
 * The bitwise AND operator (&) returns a 1 in each bit position for which the corresponding bits
 * of both operands are 1s.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND
 *
 * @param bitmasks
 * @param bit
 */
export function removeBit(bitmasks: bigint, bit: bigint): bigint {
    bitmasks &= ~bit;
    return bitmasks;
}

/**
 * Check if the bit already exists in the bitmask.
 *
 * Bitwise AND (&)
 *
 * @param bitmasks
 * @param bit
 */
export function hasBit(bitmasks: bigint, bit: bigint): boolean {
    return (bitmasks & bit) === bit;
}

/**
 * Check if the bitmask contains ANY of the bits.
 * e.g. 1101 - bitmask, 10 - bits => false
 * e.g. 1101 - bitmask, 11 -> bits => true
 *
 * @param bitmask
 * @param bits
 */
export function hasAnyOfBits(bitmask: bigint, bits: bigint): boolean {
    return (bitmask & bits) !== 0n;
}



type Bitmask = number | bigint;

// https://github.com/microsoft/TypeScript/issues/42125
// https://github.com/microsoft/TypeScript/issues/39569#issuecomment-657235599
export function toggleAllBits(bitmask: number): number;
export function toggleAllBits(bitmask: bigint): bigint;
export function toggleAllBits(bitmask: Bitmask): Bitmask {
    const oneBit = (typeof bitmask === "bigint" ? 1n : 1) as typeof bitmask;
    let start = oneBit;
    while(start <= bitmask) {
        // @ts-expect-error See the GH links above.
        bitmask ^= start;
        // @ts-expect-error See the GH links above.
        start = start << oneBit;
    }
    return bitmask;
}