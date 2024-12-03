import yaml from 'js-yaml';
import fs from 'fs/promises';
import path from 'path';
import type { PageServerLoad } from './$types';


interface Schedule {
  short_desc: string;
  type: string;
}

interface Tour extends Schedule {
  start_time: string;
}

interface Tab {
  name: string;
  schedules: Schedule[];
}

export const load: PageServerLoad = async () => {
  const travelFolder = path.resolve('travel');
  const destFileContent = await fs.readFile(path.join(travelFolder, "destination.yaml"), "utf8");

  const tabsFolder = path.resolve('travel/days');
  const dayFileNames = await fs.readdir(tabsFolder);

  // Read and parse destinations
  const dests = yaml.load(destFileContent);

  // Read and parse all YAML files in the folder

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

  return {
    destinations: dests,
    tabs: tabs,
  };
}

// Disable server-side rendering to get client date info.
export const ssr=false;