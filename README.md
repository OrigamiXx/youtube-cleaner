# YouTube Cleaner

YouTube Cleaner is a lightweight browser extension designed to enhance your experience by automatically hiding toxic or unwanted comments on YouTube. This tool blocks comments containing specific keywords defined by the user, helping to create a more positive and distraction-free environment.

## Features

- Blocks toxic or unwanted comments based on a customizable keyword list.
- Automatically observes and hides toxic comments as new ones load dynamically on the page.

## Roadmap

1. **Initial Version (Complete)**:
   - Hide toxic comments by matching user-defined keywords.
   - Dynamically monitor and hide newly loaded comments.

2. **Planned Features**:
   - Add a user interface to manage the keyword list.
   - Integrate a server for enhanced toxic comment detection using ChatGPT.
   - Deploy a custom ML model for comment classification.
   - Create a showcase GitHub project for the full solution.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/youtube-cleaner.git
   cd youtube-cleaner
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:

   ```bash
   npm run build
   ```

4. Load the extension in your browser:

   - Open your browser and go to the extensions page:
     - For Chrome: `chrome://extensions`
     - For Edge: `edge://extensions`
   - Enable "Developer mode" (usually a toggle at the top).
   - Click "Load unpacked" and select the `dist` folder from the project directory.

## Usage

1. The extension will start working immediately after loading.
2. By default, it hides comments containing the predefined toxic keywords in `src/content.js`.
3. To customize the keywords, edit the `toxicWords` array in `src/content.js` and rebuild the project.

## Dependencies

- **Node.js**: JavaScript runtime for building the project.
- **Webpack**: Bundler to compile and optimize the extension files.
- **Babel**: JavaScript transpiler for browser compatibility.

## Development

1. Make changes in the `src` folder.
2. Rebuild the project using `npm run build`.
3. Reload the extension in the browser for changes to take effect.

## Contribution

Contributions are welcome! Feel free to fork this repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
