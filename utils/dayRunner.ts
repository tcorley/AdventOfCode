import chalkin from "chalkin";

type DayRunnerProps = {
  year: string;
  day: string;
  mode: "data" | "sample";
  part: number;
};

export const dayRunner = async ({ year, day, mode, part }: DayRunnerProps) => {
  console.log(
    `Running ${chalkin.green(`${year}'s`)} Day ${chalkin.blue(
      day
    )} part ${chalkin.magenta(part)} with the ${chalkin.yellow(mode)} set`
  );

  let data;
  try {
    data = await Deno.readTextFile(
      `${Deno.cwd()}/${year}/day${day}/${mode}${part}.txt`
    );
  } catch (_e: unknown) {
    console.log(
      chalkin.red(`Could not find ${year}'s Day ${day}'s ${mode}${part}.txt`)
    );
    Deno.exit(1);
  }
  if (!data) {
    console.log(
      chalkin.red(`${mode} data for ${year} day ${day} part ${part} was empty`)
    );
    Deno.exit(1);
  } else {
    const { partOne, partTwo } = await import(
      `${Deno.cwd()}/${year}/day${day}/index.ts`
    );

    const result = part === 1 ? partOne(data) : partTwo(data);
    console.log(`Result: ${chalkin.green(result)}`);
  }
};
