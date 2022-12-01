import { config } from 'dotenv';
import chalkin from 'chalkin';
import { dayRunner } from './utils/dayRunner.ts';

config({ safe: true, export: true });

const year = Deno.env.get('CURRENT_YEAR');
const [mode, day, part, useFirstPartInput] = Deno.args;

if (!day) {
  console.log(chalkin.red('Please specify a day'));
  Deno.exit(1);
}

if (!year) {
  console.log(chalkin.red('Please specify a year in .env file'));
  Deno.exit(1);
}

if (!mode || !['data', 'sample'].includes(mode)) {
  console.log(chalkin.red('Please specify a mode: data or sample'));
  Deno.exit(1);
}

let parsedPart;
if (!part || !['1', '2'].includes(part)) {
  console.log(chalkin.red('Please specify a part: 1 or 2'));
  Deno.exit(1);
} else {
  parsedPart = parseInt(part);
}

dayRunner({
  year,
  day,
  mode: mode as 'data' | 'sample',
  part: parsedPart,
  useFirstPartInput: useFirstPartInput === 'true',
});
