# Overview and Purpose

## Dark Web Scanner: Protecting Your Personal Data

Dark Web Scanner is a web application designed to help users identify potential risks associated with their email addresses by scanning the dark web for any instances of data breaches involving their personal information. By entering an email address into the search bar, users can quickly discover if their data has been compromised, the companies and/or services involved in the breach, and the specific data classes that have been leaked (e.g., emails, passwords, IP addresses, credit card information, etc.).

The primary goal of the Dark Web Scanner is to empower users with knowledge about the security of their personal information and to enable them to take action if necessary. In today's digital age, data breaches have become an all-too-common occurrence, with cybercriminals constantly seeking to exploit valuable information for nefarious purposes. Our web app aims to help users stay one step ahead of potential threats by identifying breaches and offering actionable insights.

### Key Features:

1. **Email-based search**: Users can simply enter their email address into the search bar to instantly scan the dark web for any relevant data breaches.
2. **Comprehensive breach details**: The app provides detailed information on each data breach, including the date of the breach, the companies/services involved, and the specific data classes that have been compromised.
3. **Threat assessment**: Dark Web Scanner offers a visual threat assessment in the form of a bar spectrum, ranging from "no threat" on the left to "high threat" on the right, based on the leaked data classes. This helps users gauge the severity of the breach and prioritize their response.
4. **Password reset links**: If a password is identified among the leaked data classes, the app provides a direct link to the affected company's webpage to reset the password, enabling users to take swift action to protect their accounts.

Dark Web Scanner is an invaluable tool for internet users who wish to take control of their personal data security. By providing an easy-to-use platform for identifying data breaches and their associated risks, our web app helps users safeguard their online presence and minimize potential threats.

** Usage
Loading into the website, you will see a search bar and submit buttton. This is where you will input your email and hit submit to view leaks where your email was present.

You will see a screen similar to the following, with all the leaks present on the left side of the screen.
<img width="450" alt="Screen Shot 2023-05-10 at 10 52 11 AM" src="https://github.com/macsta31/isaixdwscan/assets/66531417/520a3424-23b3-4ad1-b70c-0aaac02cca06">

You may now click on any of the cards on the left, representing your leaks, and the site will automatically display information about said leak on the right portion of the screen.

<img width="450" alt="Screen Shot 2023-05-10 at 10 49 57 AM" src="https://github.com/macsta31/isaixdwscan/assets/66531417/14b00b30-b01d-48a9-a5f1-d864fc39757b">

Now pressing on the question mark in the top right corner of the leak details tab will give you more information on the context of the leak.
<img width="450" alt="Screen Shot 2023-05-10 at 10 49 41 AM" src="https://github.com/macsta31/isaixdwscan/assets/66531417/69e77a0b-4ae0-4416-a6aa-07d896ba3ce8">

Back to the original leak details tab, if **Passwords** is present among the dataclasses, you will see a warning symbol next to it which once clicked on will display a *reset password* modal with a link to the company website.

<img width="450" alt="Screen Shot 2023-05-10 at 10 50 08 AM" src="https://github.com/macsta31/isaixdwscan/assets/66531417/31d4976a-e4ce-4719-9134-9356c3e42d66">

On the other hand, if the email that was searched for comes back with no results, it was not found in any leaks that we know about. **This is not a guarantee**. You will be presented with the following screen.

<img width="450" alt="Screen Shot 2023-05-10 at 11 00 02 AM" src="https://github.com/macsta31/isaixdwscan/assets/66531417/ba0469cf-3bbe-4842-ba49-aa5cc400ffda">

## Technology Stack and Data Source

### Built with Vite, React, TypeScript, and Node

Dark Web Scanner leverages a modern technology stack to deliver a fast, secure, and user-friendly experience. The application is built using the following technologies:

1. **Vite**: A next-generation build tool and development server that enables faster development and optimized production builds. Vite is designed to improve the developer experience and ensure fast loading times for end-users.
2. **React**: A popular JavaScript library for building user interfaces. React allows us to create reusable UI components and manage the application's state efficiently, resulting in a highly responsive and performant web app.
3. **TypeScript**: A superset of JavaScript that adds static types to the language, enhancing code quality and maintainability. TypeScript enables us to catch potential errors during development and provides better tooling and editor support.
4. **Node**: A JavaScript runtime environment that allows us to execute server-side code. Node enables us to create a scalable and efficient backend to handle API requests and serve the React frontend.

### Data Source: Have I Been Pwned API

The primary source of data for Dark Web Scanner is the Have I Been Pwned (HIBP) API. HIBP is a reputable and widely-used service that aggregates information about data breaches from various sources, including the dark web.

The HIBP API provides access to their extensive database of breached email addresses and associated details, such as the companies/services involved, the date of the breach, and the specific data classes that have been compromised. By leveraging the HIBP API, our web app can provide users with accurate and up-to-date information about data breaches that may affect their personal information.

Using the HIBP API as our data source ensures that Dark Web Scanner offers users reliable and comprehensive information, empowering them to take control of their personal data security and respond proactively to potential threats.

