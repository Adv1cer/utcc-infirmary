import mysql from 'mysql2/promise';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { AuthOptions } from 'next-auth';

const dbConfig = {
  host: process.env.MYSQL_HOST || '',
  user: process.env.MYSQL_USER || '',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || '',
};

if (!dbConfig.host || !dbConfig.user || !dbConfig.password || !dbConfig.database) {
  throw new Error('Missing required environment variables for database configuration');
}

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const connection = await mysql.createConnection(dbConfig);

          const [rows] = await connection.execute<mysql.RowDataPacket[]>(
            'SELECT * FROM user WHERE email = ?',
            [email]
          );

          await connection.end();

          if (rows.length > 0) {
            const user = rows[0] as User;

            console.log("User found:");

            if (user.password === password) {
              return { id: user.id, email: user.email, name: user.name };
            } else {
              console.log("Password does not match.");
            }
          } else {
            console.log("No user found with this email.");
          }

          return null;
        } catch (error) {
          console.error('Error in MySQL authentication:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/Login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };