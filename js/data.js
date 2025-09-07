/* js/data.js — Updated: angle-brackets escaped so options show as text */

const QUIZZES = [
  {
    id: 0,
    title: "HTML Basics",
    questions: [
      {
        q: "What does HTML stand for?",
        options: [
          "Hypertext Machine Language",
          "High-Level Markup Language",
          "Hypertext Markup Language",
          "Hardware Markup Language",
        ],
        a: 2,
      },
      {
        q: "Which tag creates an ordered list?",
        options: ["&lt;ol&gt;", "&lt;ul&gt;", "&lt;li&gt;", "&lt;list&gt;"],
        a: 0,
      },
      {
        q: "Which tag is used for a paragraph?",
        options: [
          "&lt;p&gt;",
          "&lt;para&gt;",
          "&lt;text&gt;",
          "&lt;paragraph&gt;",
        ],
        a: 0,
      },
      {
        q: "Which attribute sets link target to a new tab?",
        options: [
          'target="_blank"',
          'newtab="true"',
          'open="_new"',
          'target="new"',
        ],
        a: 0,
      },
      {
        q: "What tag holds the page title in browser tab?",
        options: [
          "&lt;title&gt;",
          "&lt;head&gt;",
          "&lt;meta&gt;",
          "&lt;tab&gt;",
        ],
        a: 0,
      },
      {
        q: "Tag for an image is:",
        options: [
          "&lt;img&gt;",
          "&lt;image&gt;",
          "&lt;pic&gt;",
          "src attribute",
        ],
        a: 0,
      },
      {
        q: "Which tag makes text bold?",
        options: [
          "&lt;strong&gt;",
          "&lt;b&gt;",
          "Both &lt;strong&gt; and &lt;b&gt;",
          "&lt;bold&gt;",
        ],
        a: 2,
      },
      {
        q: "HTML is primarily a markup language used for:",
        options: [
          "Styling pages",
          "Structuring pages",
          "Database storage",
          "Scripting",
        ],
        a: 1,
      },
      {
        q: "Which tag equals a hyperlink?",
        options: [
          "&lt;a&gt;",
          "&lt;link&gt;",
          "&lt;href&gt;",
          "&lt;anchor&gt;",
        ],
        a: 0,
      },
      {
        q: "Self-closing tag example:",
        options: ["&lt;br&gt;", "&lt;div&gt;", "&lt;p&gt;", "&lt;span&gt;"],
        a: 0,
      },
    ],
  },

  {
    id: 1,
    title: "CSS Fundamentals",
    questions: [
      {
        q: "Which property controls text color?",
        options: ["color", "text-color", "font-color", "fgcolor"],
        a: 0,
      },
      {
        q: "How do you select element by id 'header'?",
        options: ["#header", ".header", "header", "*header"],
        a: 0,
      },
      {
        q: "Which displays elements inline by default?",
        options: ["inline", "block", "inline-block", "flex"],
        a: 0,
      },
      {
        q: "Property to add space inside a box?",
        options: ["margin", "padding", "gap", "space"],
        a: 1,
      },
      {
        q: "To center text horizontally use:",
        options: [
          "text-align: center;",
          "align:center;",
          "justify:center;",
          "center-text",
        ],
        a: 0,
      },
      {
        q: "Which unit is relative to root font-size?",
        options: ["rem", "px", "cm", "pt"],
        a: 0,
      },
      {
        q: "CSS file is linked using tag:",
        options: [
          "&lt;link rel='stylesheet' href='style.css'&gt;",
          "&lt;script&gt;",
          "&lt;style&gt;",
          "&lt;css&gt;",
        ],
        a: 0,
      },
      {
        q: "To make element hidden use:",
        options: [
          "display:none;",
          "visibility:hidden;",
          "opacity:0;",
          "hidden:true;",
        ],
        a: 0,
      },
      {
        q: "To apply style on hover use:",
        options: [":hover", "#hover", ".hover", "hover()"],
        a: 0,
      },
      {
        q: "Which value makes a flex container wrap?",
        options: [
          "flex-wrap: wrap;",
          "wrap:true;",
          "display:flex-wrap;",
          "flow:wrap;",
        ],
        a: 0,
      },
    ],
  },

  {
    id: 2,
    title: "JavaScript Basics",
    questions: [
      {
        q: "Which keyword declares a block-scoped variable?",
        options: ["var", "let", "function", "const"],
        a: 1,
      },
      {
        q: "How to declare a function named 'sum'?",
        options: [
          "function sum() {}",
          "def sum() {}",
          "func sum() {}",
          "function:sum() {}",
        ],
        a: 0,
      },
      {
        q: "Which is strict equality operator?",
        options: ["==", "=", "===", "!=="],
        a: 2,
      },
      {
        q: "To convert string '5' to number use:",
        options: ["Number('5')", "parseFloat('5')", "+'5'", "All of the above"],
        a: 3,
      },
      {
        q: "Which method picks element by id?",
        options: [
          "document.getElementById()",
          "querySelectorAll()",
          "getEl()",
          "selectId()",
        ],
        a: 0,
      },
      {
        q: "Which loop iterates fixed times?",
        options: ["for", "while", "do-while", "forEach"],
        a: 0,
      },
      {
        q: "Anonymous function often used as a:",
        options: ["callback", "declaration", "selector", "stylesheet"],
        a: 0,
      },
      {
        q: "Promise resolves with .then",
        options: ["True", "False", "Sometimes", "Depends"],
        a: 0,
      },
      {
        q: "NaN stands for:",
        options: [
          "Not a Number",
          "Nothing a Number",
          "Null a Number",
          "No a Number",
        ],
        a: 0,
      },
      {
        q: "Which method adds an item to end of array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        a: 0,
      },
    ],
  },

  {
    id: 3,
    title: "Bootstrap & jQuery",
    questions: [
      {
        q: "Bootstrap is primarily a:",
        options: [
          "Frontend toolkit",
          "Database system",
          "Backend framework",
          "Programming language",
        ],
        a: 0,
      },
      {
        q: "Bootstrap class for grid row is:",
        options: [".row", ".grid", ".container", ".r"],
        a: 0,
      },
      {
        q: "jQuery shorthand for document ready is:",
        options: ["$(function(){})", "$(document).ready()", "Both", "None"],
        a: 2,
      },
      {
        q: "Bootstrap uses flexbox by default (v5):",
        options: ["True", "False", "Only grid", "Only utilities"],
        a: 0,
      },
      {
        q: "To hide an element with jQuery:",
        options: ["$el.hide()", "$el.css('display','none')", "Both", "None"],
        a: 2,
      },
      {
        q: "Bootstrap button base class is:",
        options: [".btn", ".button", ".bttn", ".btn-primary"],
        a: 0,
      },
      {
        q: "To select element with class 'box' in jQuery:",
        options: [
          "$('.box')",
          "$('#box')",
          "document.querySelector('.box')",
          "box()",
        ],
        a: 0,
      },
      {
        q: "Bootstrap container that is full width is:",
        options: [
          ".container-fluid",
          ".container",
          ".container-lg",
          ".container-sm",
        ],
        a: 0,
      },
      {
        q: "jQuery method to set text is:",
        options: [".text()", ".html()", ".val()", ".css()"],
        a: 0,
      },
      {
        q: "Bootstrap utility to center text:",
        options: [
          ".text-center",
          ".center-text",
          ".align-center",
          ".justify-center",
        ],
        a: 0,
      },
    ],
  },

  {
    id: 4,
    title: "General Web",
    questions: [
      {
        q: "HTTP stands for:",
        options: [
          "HyperText Transfer Protocol",
          "Hyperlink Transfer Protocol",
          "Hyper Transfer Text Protocol",
          "HyperText Transport Protocol",
        ],
        a: 0,
      },
      {
        q: "Status code 200 means:",
        options: ["OK", "Not Found", "Server Error", "Redirect"],
        a: 0,
      },
      {
        q: "Which file lists files to ignore in Git?",
        options: [".gitignore", ".ignore", "git.ignore", "ignorefile"],
        a: 0,
      },
      {
        q: "CDN stands for:",
        options: [
          "Content Delivery Network",
          "Content Distribution Node",
          "Central Delivery Network",
          "Content Deploy Network",
        ],
        a: 0,
      },
      {
        q: "SEO stands for:",
        options: [
          "Search Engine Optimization",
          "Site Engine Operation",
          "Search Engine Options",
          "Site Engagement Optimization",
        ],
        a: 0,
      },
      {
        q: "Which stores client-side persisted data?",
        options: ["localStorage", "MySQL", "Redis", "FTP"],
        a: 0,
      },
      {
        q: "PWA stands for:",
        options: [
          "Progressive Web Apps",
          "Public Web Apps",
          "Private Web Applications",
          "Progressive Website Apps",
        ],
        a: 0,
      },
      {
        q: "Which is not a web font format?",
        options: [".ttf", ".woff2", ".doc", ".woff"],
        a: 2,
      },
      {
        q: "Which header controls caching?",
        options: ["Cache-Control", "Content-Type", "Accept", "User-Agent"],
        a: 0,
      },
      {
        q: "Which protocol is secure HTTP?",
        options: ["HTTPS", "HTTP", "FTP", "SFTP"],
        a: 0,
      },
    ],
  },
];
