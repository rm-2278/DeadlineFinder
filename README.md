# DeadlineFinder

## Description
**DeadlineFinder** is a web application designed to extract and display structured information from program-related web pages. Users can paste a URL, and the application will fetch the content, process it using the Gemini AI model, and present details such as the program name, deadline, commitment, and additional notes in a clean, user-friendly table format.

## Features
- **URL Input**: Paste a link to a program-related webpage.
- **AI-Powered Extraction**: Uses the Gemini AI model to analyze and extract relevant information.
- **Structured Display**: Presents extracted data in a tabular format for easy viewing.
- **Responsive Design**: Optimized for various screen sizes.

## Technologies Used
- **Next.js**: Framework for building the frontend and backend API routes.
- **TypeScript**: Ensures type safety and better developer experience.
- **Zod**: Schema validation for consistent data handling.
- **Google GenAI**: Integration with the Gemini AI model for content extraction.
- **Tailwind CSS**: For styling and responsive design.

## How It Works
1. **Input**: The user pastes a URL into the input field.
2. **Processing**: The backend fetches the webpage content and sends it to the Gemini AI model for processing.
3. **Display**: The extracted details are validated and displayed in a table.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/rm-2278/cambridge-bootcamp-agenticai.git
   ```
2. Navigate to the project directory:
   ```bash
   cd cambridge-bootcamp-agenticai
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env.local` file and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open the application in your browser at `http://localhost:3000`.

## Contribution
Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

## License
This project is licensed under the MIT License.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
