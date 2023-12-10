const camelCardOrder = {
  '2': 0,
  '3': 1,
  '4': 2,
  '5': 3,
  '6': 4,
  '7': 5,
  '8': 6,
  '9': 7,
  T: 8,
  J: 9,
  Q: 10,
  K: 11,
  A: 12,
};

const camelCardOrder2 = {
  J: 0,
  '2': 1,
  '3': 2,
  '4': 3,
  '5': 4,
  '6': 5,
  '7': 6,
  '8': 7,
  '9': 8,
  T: 9,
  Q: 10,
  K: 11,
  A: 12,
};

function handIsNOfAKind(hand: string, n: number) {
  return Object.values(
    hand.split('').reduce((acc, card) => {
      if (acc[card]) {
        acc[card]++;
      } else {
        acc[card] = 1;
      }
      return acc;
    }, {} as Record<string, number>)
  ).includes(n);
}

function handIsFullHouse(hand: string) {
  return handIsNOfAKind(hand, 3) && handIsNOfAKind(hand, 2);
}

function handIsTwoPairs(hand: string) {
  return (
    Object.values(
      hand.split('').reduce((acc, card) => {
        if (acc[card]) {
          acc[card]++;
        } else {
          acc[card] = 1;
        }
        return acc;
      }, {} as Record<string, number>)
    ).filter((x) => x === 2).length === 2
  );
}

function customCompare(
  card1: keyof typeof camelCardOrder,
  card2: keyof typeof camelCardOrder
) {
  const order1 = camelCardOrder[card1];
  const order2 = camelCardOrder[card2];

  if (order1 < order2) {
    return -1;
  } else if (order1 > order2) {
    return 1;
  } else {
    return 0;
  }
}

function customCompare2(
  card1: keyof typeof camelCardOrder2,
  card2: keyof typeof camelCardOrder2
) {
  const order1 = camelCardOrder2[card1];
  const order2 = camelCardOrder2[card2];

  if (order1 < order2) {
    return -1;
  } else if (order1 > order2) {
    return 1;
  } else {
    return 0;
  }
}

export const partOne = (data: string) => {
  const hands = data.split('\n').map((line) => line.split(' '));
  const totals: Record<string, [string, number][]> = {
    fiveOfAKind: [],
    fourOfAKind: [],
    fullHouse: [],
    threeOfAKind: [],
    twoPairs: [],
    onePair: [],
    highCard: [],
  };
  // console.log(hands);
  hands.forEach(([hand, rawBid]) => {
    const bid = parseInt(rawBid);
    if (handIsNOfAKind(hand, 5)) {
      totals['fiveOfAKind'].push([hand, bid]);
    } else if (handIsNOfAKind(hand, 4)) {
      totals['fourOfAKind'].push([hand, bid]);
    } else if (handIsFullHouse(hand)) {
      totals['fullHouse'].push([hand, bid]);
    } else if (handIsNOfAKind(hand, 3)) {
      totals['threeOfAKind'].push([hand, bid]);
    } else if (handIsTwoPairs(hand)) {
      totals['twoPairs'].push([hand, bid]);
    } else if (handIsNOfAKind(hand, 2)) {
      totals['onePair'].push([hand, bid]);
    } else {
      totals['highCard'].push([hand, bid]);
    }
  });

  // console.log(totals);
  const ranked: [string, number][] = [];
  [
    'highCard',
    'onePair',
    'twoPairs',
    'threeOfAKind',
    'fullHouse',
    'fourOfAKind',
    'fiveOfAKind',
  ].forEach((key) => {
    totals[key].sort((hand1, hand2) => {
      // Use the customCompare function to compare two hands
      for (let i = 0; i < Math.min(hand1[0].length, hand2[0].length); i++) {
        const result = customCompare(
          hand1[0][i] as keyof typeof camelCardOrder,
          hand2[0][i] as keyof typeof camelCardOrder
        );
        if (result !== 0) {
          return result;
        }
      }
      // If the hands have a common prefix, the longer one comes first
      return hand2.length - hand1.length;
    });
    ranked.push(...totals[key]);
  });

  // console.log(ranked);

  return ranked.reduce((acc, [, bid], index) => {
    return acc + bid * (index + 1);
  }, 0);
};

export const partTwo = (data: string) => {
  const hands = data.split('\n').map((line) => line.split(' '));
  const totals: Record<string, [string, number][]> = {
    fiveOfAKind: [],
    fourOfAKind: [],
    fullHouse: [],
    threeOfAKind: [],
    twoPairs: [],
    onePair: [],
    highCard: [],
  };
  // console.log(hands);
  // jokerify the hands
  const newHands = hands.reduce((acc, [hand, bid]) => {
    if (
      hand.split('').some((x) => x === 'J') &&
      !hand.split('').every((x) => x === 'J')
    ) {
      const counts = hand.split('').reduce((acc, card) => {
        if (card === 'J') {
          return acc;
        } else if (acc[card]) {
          acc[card]++;
        } else {
          acc[card] = 1;
        }
        return acc;
      }, {} as Record<string, number>);

      // console.log(counts);
      // return the key of counds with the highest value
      const highestCount = Object.entries(counts).reduce(
        (acc, [card, count]) => {
          if (count > acc[1]) {
            return [card, count];
          } else {
            return acc;
          }
        },
        ['', 0]
      );
      acc.push([hand, bid, hand.replace(/J/g, highestCount[0])]);
    } else {
      acc.push([hand, bid, hand]);
    }
    return acc;
  }, [] as [string, string, string][]);
  // console.log(newHands);
  newHands.forEach(([oldHand, rawBid, hand]) => {
    const bid = parseInt(rawBid);
    if (handIsNOfAKind(hand, 5)) {
      totals['fiveOfAKind'].push([oldHand, bid]);
    } else if (handIsNOfAKind(hand, 4)) {
      totals['fourOfAKind'].push([oldHand, bid]);
    } else if (handIsFullHouse(hand)) {
      totals['fullHouse'].push([oldHand, bid]);
    } else if (handIsNOfAKind(hand, 3)) {
      totals['threeOfAKind'].push([oldHand, bid]);
    } else if (handIsTwoPairs(hand)) {
      totals['twoPairs'].push([oldHand, bid]);
    } else if (handIsNOfAKind(hand, 2)) {
      totals['onePair'].push([oldHand, bid]);
    } else {
      totals['highCard'].push([oldHand, bid]);
    }
  });

  // console.log(totals);
  const ranked: [string, number][] = [];
  [
    'highCard',
    'onePair',
    'twoPairs',
    'threeOfAKind',
    'fullHouse',
    'fourOfAKind',
    'fiveOfAKind',
  ].forEach((key) => {
    totals[key].sort((hand1, hand2) => {
      // Use the customCompare function to compare two hands
      for (let i = 0; i < Math.min(hand1[0].length, hand2[0].length); i++) {
        const result = customCompare2(
          hand1[0][i] as keyof typeof camelCardOrder2,
          hand2[0][i] as keyof typeof camelCardOrder2
        );
        if (result !== 0) {
          return result;
        }
      }
      // If the hands have a common prefix, the longer one comes first
      return hand2.length - hand1.length;
    });
    ranked.push(...totals[key]);
  });

  // console.log(ranked);

  // 247655053 is too low
  // 247677933 is too low
  return ranked.reduce((acc, [, bid], index) => {
    return acc + bid * (index + 1);
  }, 0);
};
