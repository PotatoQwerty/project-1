## Getting Started

First, install dependecies :

````bash
npm install

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## for this app --

This Next.js app is designed to optimize network efficiency while providing a realistic user experience. A context is used to manage product data, ensuring that edits and deletions persist locally and are only finalized after receiving valid responses from the FakeStoreAPI. Since the FakeStoreAPI is readonly, these changes do not affect the actual API but simulate real-world behavior, reducing unnecessary network requests when navigating between pages.

To enhance security, HttpOnly cookies are implemented for login persistence, protecting sensitive information from XSS attacks. The app also includes conditional rendering for authenticated users, allowing features like edit and delete to be restricted based on user roles, despite the limitations of the FakeStoreAPI.

Reusable components and clean code practices are emphasized throughout the app, leveraging props to ensure maintainability and readability for other developers. Overall, this mockup demonstrates good practices in reusability, security, CRUD operations, and efficient network usage, with comments included to provide additional context for developers.

Overall this mockup website shows good practice of reusabilty and security and CRUD operations. Some comments in pages and components are left in order to explain more info about.
