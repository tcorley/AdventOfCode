// originally, I tried to keep the original binary string and keep track of a cursor
// since some off-by-few errors were occuring, I scrapped that in favor of just splicing
// the string throughout the parse

const PACK_TYPE_ID_ZERO = 15;
const PACK_TYPE_ID_ONE = 11;

function hexToBin(hex: string) {
  return hex
    .split("")
    .reduce(
      (acc, bit) => acc + parseInt(bit, 16).toString(2).padStart(4, "0"),
      ""
    );
}

function binToInt(bin: string) {
  return parseInt(bin, 2);
}

// This function only assumes that the next characters are
// a part of the literal value. It will return the rest of
// the string as well as how many bits were processed along
// with the value
function getLiteralValue(binaryString: string): {
  value: number;
  bitsProcessed: number;
  newBinaryString: string;
} {
  let cursor = 0;
  let atEnd = false;
  let acc = "";

  while (!atEnd) {
    const packet = binaryString.slice(cursor, cursor + 5);
    if (packet[0] === "0") {
      atEnd = true;
    }
    cursor += 5;
    acc += packet.slice(1);
  }

  return {
    value: binToInt(acc),
    bitsProcessed: cursor,
    newBinaryString: binaryString.slice(cursor),
  };
}

function operate(operator: number, values: number[]) {
  let result = 0;
  if (values.length === 1) {
    result = values[0];
  }

  switch (operator) {
    case 0: // sum
      result = values.reduce((acc, val) => acc + val, 0);
      break;
    case 1: // mul
      result = values.reduce((acc, val) => acc * val, 1);
      break;
    case 2: // minimum
      result = Math.min(...values);
      break;
    case 3: // maximum
      result = Math.max(...values);
      break;
    case 5: // greater-than - return 1 if the first value is greater than second, 0 otherwise
      result = values[0] > values[1] ? 1 : 0;
      break;
    case 6: // less-than - return 1 if the first value is less than second, 0 otherwise
      result = values[0] < values[1] ? 1 : 0;
      break;
    case 7: // equal-to - return 1 if the first value is equal to the second, 0 otherwise
      result = values[0] === values[1] ? 1 : 0;
      break;

    default:
    // do nothing
  }
  return result;
}

function parsePackage(packString: string): {
  packageTypeId: number;
  packageVersion: number;
  value: number;
  bitsProcessed: number;
  newBinaryString: string;
  versionSum: number;
} {
  let binaryString = packString;
  let cursor = 0;
  let versionSum = 0;
  const packageVersion = binToInt(binaryString.slice(0, 3));
  const packageTypeId = binToInt(binaryString.slice(3, 6));
  versionSum += packageVersion;
  cursor = 6;
  binaryString = binaryString.slice(cursor);

  if (packageTypeId === 4) {
    const { value, bitsProcessed } = getLiteralValue(binaryString);

    return {
      packageTypeId,
      packageVersion,
      value,
      bitsProcessed: bitsProcessed + cursor,
      newBinaryString: binaryString.slice(bitsProcessed),
      versionSum,
    };
  } else {
    const values = [];
    // process the operator
    const operator = binaryString.slice(0, 1);
    binaryString = binaryString.slice(1);

    if (operator === "0") {
      let subPacketLength = binToInt(binaryString.slice(0, PACK_TYPE_ID_ZERO));

      binaryString = binaryString.slice(PACK_TYPE_ID_ZERO);
      while (subPacketLength > 0) {
        const result = parsePackage(binaryString);
        versionSum += result.versionSum;
        values.push(result.value);
        subPacketLength -= result.bitsProcessed;
        binaryString = result.newBinaryString;
      }
    } else if (operator === "1") {
      const numOfSubpackets = binToInt(binaryString.slice(0, PACK_TYPE_ID_ONE));

      binaryString = binaryString.slice(PACK_TYPE_ID_ONE);

      for (let i = 0; i < numOfSubpackets; i++) {
        const result = parsePackage(binaryString);
        versionSum += result.versionSum;
        values.push(result.value);
        binaryString = result.newBinaryString;
      }
    }

    return {
      packageTypeId,
      packageVersion,
      value: operate(packageTypeId, values),
      bitsProcessed: packString.length - binaryString.length,
      newBinaryString: binaryString,
      versionSum,
    };
  }
}

export const partOne = (data: string) => {
  const binaryString = hexToBin(data);
  return parsePackage(binaryString).versionSum;
};

export const partTwo = (data: string) => {
  const binaryString = hexToBin(data);
  return parsePackage(binaryString).value;
};
