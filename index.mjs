import inquirer from "inquirer";
import fs from "fs/promises";

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
    type: "input",
    name: "license",
    message: "Enter a license",
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

let readmeContent = `# ${title}\n`;
let tableContent = `## Table of contents
- [Table of contents](#table-of-contents)\n`;
let sectionContent = `\n`;

Object.keys(sections).forEach((key) => {
  const sectionName = key.replace(/^./, (str) => str.toUpperCase());

  tableContent += `- [${sectionName}](#${key})\n`;
  sectionContent += `### ${sectionName}\n${sections[key]}\n`;
});

readmeContent += tableContent + sectionContent;

await fs.writeFile("./output/README.md", readmeContent);

console.log("success!");
