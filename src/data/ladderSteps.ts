export interface LadderStep {
  step: number;
  name: string;
  description: string;
  examples: string[];
  minimumDays: number;
}

export const ladderSteps: LadderStep[] = [
  {
    step: 1,
    name: 'Well-baked milk (complex matrix)',
    description:
      'Foods containing milk that have been baked for more than 30 minutes at 180°C or above. The complex matrix and high heat denature the milk proteins enough for most children to tolerate.',
    examples: ['Malted milk biscuits', 'Baked cakes', 'Baked muffins', 'Digestive biscuits'],
    minimumDays: 7,
  },
  {
    step: 2,
    name: 'Less well-baked milk (simple mixture)',
    description:
      'Foods where milk is cooked but in a simpler matrix and for less time than step 1. The proteins are partially denatured.',
    examples: ['Pancakes', 'Waffles', 'Scones', 'Yorkshire pudding'],
    minimumDays: 7,
  },
  {
    step: 3,
    name: 'Soft-cooked/processed cheese',
    description:
      'Cheese that has been cooked or processed as part of a dish. The heat treatment reduces the allergenic potential.',
    examples: ['Cheese on pizza', 'Cheese sauce pasta', 'Lasagne', 'Cheese toastie'],
    minimumDays: 7,
  },
  {
    step: 4,
    name: 'Yoghurt and fermented products',
    description:
      'Fermented dairy products where bacterial fermentation has altered the milk proteins. These are less well cooked.',
    examples: ['Yoghurt', 'Fromage frais', 'Soft cheese (cream cheese)', 'Sour cream'],
    minimumDays: 7,
  },
  {
    step: 5,
    name: 'Cold fresh milk (small amounts)',
    description:
      'Fresh uncooked milk in small quantities. This is the first introduction of unheated, unfermented milk protein.',
    examples: [
      'Splash of milk on cereal',
      'Milkshakes (small)',
      'Milk in tea or coffee (for child)',
      'Small glass of milk',
    ],
    minimumDays: 7,
  },
  {
    step: 6,
    name: 'Uncooked milk (full amounts)',
    description:
      'Full amounts of fresh uncooked milk and dairy products. Completion of this step means the child has passed the milk ladder.',
    examples: ['Full cup of milk', 'Ice cream', 'Custard', 'Cream', 'Uncooked cheesecake'],
    minimumDays: 7,
  },
];
