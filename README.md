# Pic2Plate
## Overview
Pic2Plate is a Next.js application that allows users to upload pictures of food or describeit and receive recipe suggestions!

## View Live
You can view the live version of Pic2Plate at the following URL:

[https://pic2plate-tau.vercel.app](https://pic2plate-tau.vercel.app)

This link will take you to the deployed application where you can test all the features and see the app in action.

## Features
- Image upload and recognition
- Recipe suggestions
- Responsive design
    Coming Soon:
    - Show location of ingredients identified in image (remaining only ui representation)
    - Option to order instead and nearby vendors to buy from


## Technologies Used

Pic2Plate leverages several modern technologies to provide a seamless and efficient user experience:

- **Next.js**: A React framework for building fast and user-friendly web applications.
- **Gemini API**: Used for AI-powered image recognition to identify food items in uploaded pictures as well as Recipe generation.
- **Cloudinary**: A cloud-based image and video management service used for image uploads and transformations.
- **Vercel**: A platform for frontend frameworks and static sites, used for deploying the application.
- **Neon**: A serverless Postgres database service used for storing user data and recipes.
- ""Typescript**: Javascript but with types to ensure synergy of data flow across the stack
- **Tailwindcss**: For styling


## Getting Started

To get started with Pic2Plate, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/davidtimi1/pic2plate.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd pic2plate
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Set up environment variables**:
    Create a `.env.local` file in the root directory and add the following environment variables,
    replacing "************" with your actual api key:

    ```plaintext
    GEMINI_API_KEY=************
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=************
    NEXT_PUBLIC_CLOUDINARY_API_KEY=************
    CLOUDINARY_CLOUD_NAME=************
    CLOUDINARY_API_KEY=************
    CLOUDINARY_API_SECRET=************
    ```
    Also add env variables for your database

5. **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deployment

Pic2Plate is deployed on Vercel. Follow these steps to deploy your application:

1. **Create a Vercel account** if you don't have one.
2. **Import your project** from GitHub.
3. **Set up environment variables** in the Vercel dashboard.
4. **Deploy your application**.

For more detailed instructions, refer to the [Vercel documentation](https://vercel.com/docs).



## Usage

Once the application is running, users can:

1. **Upload an image**: Click on the upload button and select an image of food from your device.
2. **Receive recipe suggestions**: The Gemini API will analyze the image and provide recipe suggestions based on the identified food items.
3. **View and save recipes**: Users can view detailed recipes and visit the history section to see past searches.

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Gemini API Documentation](https://gemini.com/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Vercel Documentation](https://vercel.com/docs)
- [Neon Documentation](https://neon.tech/docs)

## Support

If you encounter any issues or have questions, please open an issue on the [GitHub repository](https://github.com/davidtimi1/pic2plate/issues).

## Acknowledgements

We would like to thank the developers and contributors of the open-source libraries and tools used in this project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.


## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/davidtimi1/pic2plate.git
    ```
2. Navigate to the project directory:
    ```bash
    cd pic2plate
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Environment Variables
Create a `.env.local` file in the root directory and add the following environment variables:
```
```

## Running the Application
To start the development server, run:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.