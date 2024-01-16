# Biopass Next.js sample app

This is a simple React app with Next.js@14.0.4 and typescript and tailwind.
The goal of this project is to give you an example of how to use Biopass as an Authentication provider for your Next.js application using next-auth library.

## Scripts

After cloning the project and running npm i, you can use these scripts to run your application or a create a production build.

    "scripts":  {
        "dev":  "env-cmd -f .env next dev",
        "build":  "env-cmd -f .env next build",
        "start":  "env-cmd -f .env next start"
    },

## Next-Auth implementation

Firstly we need to create a config for next-auth that uses Biopass as an authentication provider. For that we have **src->app->api->auth->[...nextauth]**,
and in the file **route.ts** we have the basic setup.

You can change the environment variables in order to make this configuration work for your own client and tenant.

    NEXT_PUBLIC_OIDC_CLIENT_ID="OOO2AOdZMX2tLdCuvD99"  #change this to your own clientId
    NEXT_PUBLIC_OIDC_ISSUER="https://acme.au.test.tribify.io/"  #change this to your client's issuer
    NEXT_PUBLIC_OIDC_SCOPES="openid email profile"  #change this to you client's scopes
    NEXTAUTH_URL="http://localhost:3000"  #if you are deploying this, change this to your domain name

The environment variables above, are used in next-auth configuration, which adds biopass as a custom provider for your application
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
