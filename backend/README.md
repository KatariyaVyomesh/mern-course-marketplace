# Course Platform Backend

## Setup Instructions

1. **Install Dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Set up Environment Variables:**
   Create a `.env` file with:
   \`\`\`
   MONGODB_URI=mongodb://localhost:27017/courseplatform
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   \`\`\`

3. **Start MongoDB:**
   Make sure MongoDB is running on your system

4. **Seed Database (Optional):**
   \`\`\`bash
   npm run seed
   \`\`\`

5. **Start Server:**
   \`\`\`bash
   npm start
   \`\`\`

## Dependencies
- express: Web framework
- mongoose: MongoDB ODM
- cors: Cross-origin resource sharing
- dotenv: Environment variables
- bcryptjs: Password hashing
- jsonwebtoken: JWT authentication
