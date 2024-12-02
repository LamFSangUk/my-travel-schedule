import yaml from 'js-yaml';
import fs from 'fs/promises';
import path from 'path';
import type { PageServerLoad } from './$types';


interface Schedule {
  short_desc: string;
  start_time: string;
}

interface Tab {
  name: string;
  schedules: Schedule[];
}

export const load: PageServerLoad = async () => {
  const tabsFolder = path.resolve('travel/days');
  const dayFileNames = await fs.readdir(tabsFolder);


  // Raed and parse all YAML files in the folder

  const tabs: Tab[] = await Promise.all(
    dayFileNames.map(async (fileName: string) => {
      const filePath = path.join(tabsFolder, fileName);
      const fileContent = await fs.readFile(filePath, 'utf8');

      // Load yaml content
      const parsedContent = yaml.load(fileContent);
      const schedule = {
        name: path.basename(fileName, '.yaml'),
        schedules: parsedContent.schedules
      };

      return schedule;
    })
  )

  return {tabs: tabs};
}
