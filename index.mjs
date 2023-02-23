import inquirer from "inquirer";
import fs from "fs/promises";

const licenses = [
  {
    name: "MIT",
    shield: "https://img.shields.io/badge/License-MIT-green.svg",
    link: "https://choosealicense.com/licenses/mit/",
  },
  {
    name: "GPLv3",
    shield: "https://img.shields.io/badge/License-GPL%20v3-yellow.svg",
    link: "https://opensource.org/licenses/",
  },
  {
    name: "AGPL",
    shield: "https://img.shields.io/badge/license-AGPL-blue.svg",
    link: "http://www.gnu.org/licenses/agpl-3.0",
  },
];
const response = await inquirer.prompt([
  {
    type: "input",
    name: "title",
    message: "Enter a title",
  },
  {
    type: "input",
    name: "description",
    message: "Enter a description",
  },
  {
    type: "input",
    name: "installation",
    message: "Enter Installation",
  },
  {
    type: "input",
    name: "usage",
    message: "Enter Usage",
  },
  {
    type: "list",
    name: "license",
    message: "What size do you need?",
    choices: licenses.map((license) => license.name),
    filter(name) {
      return licenses.find((license) => license.name === name);
    },
  },
  {
    type: "input",
    name: "contributing",
    message: "Enter a contributing",
  },
  {
    type: "input",
    name: "tests",
    message: "Enter a tests",
  },
  {
    type: "input",
    name: "questions",
    message: "Enter a questions",
  },
]);
console.log(response);

const { title, ...sections } = response;

let readmeContent = `# ${title}\n
  [![${response.license.name} License](${response.license.shield})](${response.license.link})\n
`;
let tableContent = `## Table of contents
- [Table of contents](#table-of-contents)\n`;
let sectionContent = `\n`;

Object.keys(sections).forEach((key) => {
  const sectionName = key.replace(/^./, (str) => str.toUpperCase());

  tableContent += `- [${sectionName}](#${key})\n`;

  // sectionContent += `### ${sectionName}\n${sections[key]}\n`;
  if (key === "license") {
    sectionContent += `### ${sectionName}\nDistributed under the [${response.license.name}](${response.license.link}) License\n`;
  }
  else {
    sectionContent += `### ${sectionName}\n${sections[key]}\n`;
  }
});

readmeContent += tableContent + sectionContent;

await fs.writeFile("./output/README.md", readmeContent);

console.log("success!");
