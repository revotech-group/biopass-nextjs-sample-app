# Biopass Next.js sample app

This is a simple React app with Next.js@14.0.4 and typescript and tailwind.
The goal of this project is to give you an example of how to use Biopass as an Authentication provider for your Next.js application using next-auth library.

## Scripts

After cloning the project and running npm i, you can use these scripts to run your application or a create a production build.
Keep in mind in order to run the project in dev environment you have to create a .env file in the root of your project as discussed in the next section.

    "scripts":  {
        "dev":  "env-cmd -f .env next dev",
        "build":  "next build",
        "start":  "next start"
    },

## Next-Auth implementation

Firstly we need to create a config for next-auth that uses Biopass as an authentication provider. For that we have **src->app->api->auth->[...nextauth]**,
and in the file **route.ts** we have the basic setup.

You can change the environment variables in order to make this configuration work for your own client and tenant.
Keep in mind that these variables are only used for server side, so they don't need the `NEXT_PUBLIC_` prefix.

    CLIENT_ID="your client's id"
    ISSUER="your client's issuer"
    SCOPES="your client's scopes"  #for example: openid email profile
    NEXTAUTH_URL="The url your app is hosted on"  #if you are running in dev environment it should be http://localhost:3000
    NEXTAUTH_SECRET="your-random-string"

The environment variables above, are used in next-auth configuration, which adds biopass as a custom provider for your application.

Keep in mind, in order to deploy your project you need to have environment variable `NEXTAUTH_SECRET` set to a random string, you can generate it with a tool like: https://generate-secret.vercel.app/32
This environment variable is used by NextAuth.js to encrypt the JSON Web Tokens (JWTs) and hash email verification tokens. It's also used to sign and encrypt session cookies, and generate public/private keys.
The `NEXTAUTH_SECRET` is essential for securely handling user sessions and sensitive information in a Next.js application using NextAuth.js. Without it, you'll encounter errors during the production phase.

You can manipulate or add to the setup based on your needs. in callbacks property we have the following:

    callbacks:  {
        async  jwt({  token,  account,  profile  })  {
    	    if  (account)  {
    		    token.profile  =  profile;
    	    }
    	    return  token;
        },
        async  session({  session,  token,  user  })  {
    	    if  (token.profile)  {
    		    session.profile  =  token.profile;
    	    }
    	    return  session;
        },
    },

What jwt callback does, is basically getting the user's profile information when tokens are initiated or updated, and in the session callback we pass the mentioned profile information to the session, so that we can use it later in the application.

## Usage

After having the basic configs set up we can use methods like, signIn, signOut, etc... that are exported from next-auth library, we also can use useSession hook to read the data returned in the session callback we talked about on the previous section. keep in mind in order to do that, we have to wrap our app or the part that we want to have access to the session, in a provider called AuthSessionProvider, which is exported from next-auth.
here is an example:

    const  SessionProvider  =  ({  children  }:  {  children:  React.ReactNode  })  =>  {
        return  <AuthSessionProvider>{children}</AuthSessionProvider>;
    };

then inside the components wrapped with SessionProvider we can have this line of code which gives us session's data:

    const  {  data  }  =  useSession();

in the end, in order to sign in with biopass we have to call singIn function with "biopass" as the only argument:

    onClick={() => signIn("biopass")}
