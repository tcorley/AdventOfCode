type directory = {
  name: string;
  parent: string | null;
  size: number;
  children?: string[];
};

type command = 'ls' | 'cd';

export const partOne = (data: string) => {
  const lines = data.split('\n');
  const directories: Record<string, directory> = {
    '/': { name: '/', parent: null, size: 0 },
  };
  let currentDirectoryName = '/';

  const processLine = (line: string) => {
    const currentDirectory = directories[currentDirectoryName];
    console.log(
      'starting on line',
      currentDirectory?.name ?? 'root',
      directories
    );
    const tokens = line.split(' ');
    if (tokens[0] == '$') {
      switch (tokens[1] as command) {
        case 'ls':
          // console.log('this is an ls command');
          break;
        case 'cd':
          // console.log('this is a cd command');
          // if the directory exists, set it as the current directory
          // if the directory doesn't exist, create it and set it as the current directory
          if (tokens[2] == '..') {
            // go up a directory
            currentDirectoryName = currentDirectory?.parent ?? '';
          } else if (tokens[2] == '/') {
            // do nothing
          } else if (!directories[currentDirectoryName + '/' + tokens[2]]) {
            // console.log('creating directory', tokens[2]);
            // create the directory
            directories[currentDirectoryName + '/' + tokens[2]] = {
              name: tokens[2],
              parent: currentDirectory?.name ?? null,
              size: 0,
            };

            currentDirectoryName += '/' + tokens[2];
          } else {
            // set the directory as the current directory
            currentDirectoryName += +'/' + tokens[2];
          }
          break;
      }
    } else if (tokens[0] == 'dir') {
      // console.log('this is a directory');
      // add the directory to the current directory's children and set the current directory as the parent if it doesn't already exist
      if (!directories[currentDirectoryName + '/' + tokens[1]]) {
        directories[currentDirectoryName + '/' + tokens[1]] = {
          name: tokens[1],
          parent: currentDirectory.name,
          size: 0,
        };
      }
      if (!currentDirectory.children) {
        currentDirectory.children = [tokens[1]];
      } else if (!currentDirectory.children.includes(tokens[1])) {
        currentDirectory.children.push(tokens[1]);
      }

      // put the current directory back in the directories object
      directories[currentDirectoryName] = currentDirectory;
    } else {
      // this is a file
      // grab the first token and add to the count
      // console.log('this is a file');
      // console.log(line);
      currentDirectory.size += parseInt(tokens[0]);

      // put the current directory back in the directories object
      directories[currentDirectoryName] = currentDirectory;
    }
  };

  lines.forEach(processLine);

  console.log('directories', directories);
};
