# Harper's Corner Webpage

Welcome to Harper's Corner! This is a basic webpage to help introduce programming concepts using HTML, CSS, and JavaScript. This guide will explain how to download necessary tools, run the project locally, and explore how each part of the code works.

---

## Table of Contents
- [Getting Started with Web Programming](#getting-started-with-web-programming)
  - [W3Schools Tutorials](#w3schools-tutorials)
  - [LC101: Introduction to Programming](#lc101-introduction-to-programming)
- [Installation](#installation)
  - [Step 1: Install Node.js and npm](#step-1-install-nodejs-and-npm)
  - [Step 2: Install Packages](#step-2-install-packages)
  - [Step 3: Run the Webpage Locally](#step-3-run-the-webpage-locally)
- [Project Overview](#project-overview)
  - [HTML Structure](#html-structure)
  - [CSS Styling](#css-styling)
  - [JavaScript Functionality](#javascript-functionality)
  - [How It All Comes Together](#how-it-all-comes-together)
- [Using Chrome Developer Tools](#using-chrome-developer-tools)
  - [Exploring HTML, CSS, and JavaScript](#exploring-html-css-and-javascript)
  - [Helpful Guides and Videos](#helpful-guides-and-videos)
- [Experiment and Learn](#experiment-and-learn)
- [More Learning Resources](#more-learning-resources)

---

## Getting Started with Web Programming

Here are two excellent resources for learning the basics of web programming. These can serve as a foundation for understanding the Harper's Corner project and beyond.

### W3Schools Tutorials

- **Description**: W3Schools offers free, beginner-friendly tutorials on HTML, CSS, and JavaScript. Each tutorial includes explanations, examples, and interactive "Try it Yourself" editors to practice directly in the browser.
- **How to Use**:
  1. Start with the [HTML Tutorial](https://www.w3schools.com/html/) to learn how to structure web pages.
  2. Move on to the [CSS Tutorial](https://www.w3schools.com/css/) to style your pages.
  3. Finally, explore the [JavaScript Tutorial](https://www.w3schools.com/js/) to add interactivity.
- **Link**: [W3Schools Website](https://www.w3schools.com/)

---

### LC101: Introduction to Programming by LaunchCode

- **Description**: LC101 is a free, self-paced course from LaunchCode that introduces fundamental programming concepts. It covers HTML, CSS, JavaScript, and more while encouraging problem-solving and hands-on practice.
- **How to Use**:
  1. Follow the lessons sequentially to build foundational skills.
  2. Work on the provided exercises to apply what you've learned.
  3. Use it alongside this project to reinforce your knowledge.
- **Link**: [LC101: Introduction to Programming](https://www.launchcode.org/lc101)

---

## Installation

### Step 1: Install Node.js and npm

This project uses Node.js and npm (Node Package Manager) to manage any dependencies. If you don't already have Node.js and npm installed, download and install them from the official website:

- [Download Node.js and npm](https://nodejs.org/)

To check if they're installed, open a terminal and type:
```bash
node -v
npm -v
```
This should print the versions of Node.js and npm installed on your computer.

### Step 2: Install Packages

In the terminal, navigate to the project directory and install any necessary packages by running:
```bash
npm install
```
This command reads the `package.json` file and installs any packages listed as dependencies.

### Step 3: Run the Webpage Locally

To run the webpage on a local server, use the following command in your terminal:
```bash
npm start
```
Then, open a web browser and go to `http://localhost:8080` to view the page.

---

## Project Overview

### HTML Structure

HTML (HyperText Markup Language) is used to create the structure of a webpage. In this project:
- **`<header>` and `<main>` tags** group sections of content.
- **`<h1>` and `<h2>`** are heading tags that display text of different sizes.
- **`<p>` and `<div>`** elements organize content into paragraphs and sections.
- **`<a>`** creates a clickable link to an external or internal resource. The `target="_blank"` attribute can be added to open the link in a new tab.
- **`<img>`** displays an image. The `src` attribute specifies the image source URL, and the `alt` attribute provides alternative text for accessibility, describing the image if it cannot be displayed or for screen readers.

HTML is the backbone of any webpage. Learn more:
- [HTML Tutorial](https://www.w3schools.com/html/)

### CSS Styling

CSS (Cascading Style Sheets) styles the HTML content to make it visually appealing. In this project:
- The `h1` tag is styled with a specific color and alignment.
- The `.alt-background` class is toggled to change the page's background color.
- CSS rules are applied to elements by selecting their tags, classes, or IDs.

To understand CSS more deeply:
- [CSS Tutorial](https://www.w3schools.com/css/)

### JavaScript Functionality

JavaScript adds interactivity to the webpage by responding to user actions. In this project:
- JavaScript selects elements like buttons and headers to manipulate them.
- Event listeners on buttons allow JavaScript functions to run when a button is clicked, such as changing text or toggling colors.

JavaScript makes websites interactive:
- [JavaScript Tutorial](https://www.w3schools.com/js/)

### How It All Comes Together

The webpage is built by combining HTML, CSS, and JavaScript:
- **HTML** structures the content.
- **CSS** applies visual styles to enhance the look and feel.
- **JavaScript** adds functionality to respond to user actions, creating a more dynamic experience.

Learn more about web development:
- [How Websites Work](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works)

---

## Using Chrome Developer Tools

Chrome Developer Tools (DevTools) allows you to inspect, debug, and understand how a webpage is built. To access DevTools:
1. Open the Chrome browser.
2. Right-click on the webpage and select "Inspect."
3. Use the **Elements** tab to view and edit HTML/CSS, and the **Console** tab to view JavaScript logs or errors.

### Exploring HTML, CSS, and JavaScript

- **Elements Tab**: View and modify HTML structure and styles in real-time.
- **Console Tab**: Test JavaScript code, log messages, and debug issues.

### Helpful Guides and Videos

- [Chrome DevTools Overview](https://developer.chrome.com/docs/devtools/)
- [Beginner's Guide to Chrome Developer Tools (YouTube)](https://www.youtube.com/watch?v=wcFnnxfA70g)
- [Inspecting HTML and CSS (W3Schools)](https://www.w3schools.com/css/css_inspect.asp)

---

## Experiment and Learn

Want to try something new? Here are some fun challenges to explore:
- Change the color of the header text by editing the `h1` style in `styles.css`.
- Add a new button to the webpage and write a JavaScript function to display an alert when it's clicked.
- Replace the placeholder image with an image of your choice. Try finding one on [Unsplash](https://unsplash.com/) or [Pixabay](https://pixabay.com/).
- Create a list of your favorite websites using the `<ul>` (unordered list) tag in `index.html`.

Learning through experimentation is the best way to grow!


## More Learning Resources

Here are some additional resources to learn web development in a fun and interactive way:
- [Code.org: Learn HTML, CSS, and JavaScript](https://code.org/)
- [Grasshopper App by Google (Learn JavaScript)](https://grasshopper.app/)
- [CSS Diner (Learn CSS Selectors)](https://flukeout.github.io/)
- [Flexbox Froggy (Learn CSS Flexbox)](https://flexboxfroggy.com/)
- [Khan Academy: Intro to Web Development](https://www.khanacademy.org/computing/computer-programming/html-css-js)


Enjoy building and exploring Harper's Corner!
