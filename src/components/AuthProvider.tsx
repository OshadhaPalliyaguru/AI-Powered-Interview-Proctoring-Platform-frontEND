"use client"
import { AuthProvider as AsgardeoAuthProvider } from "@asgardeo/auth-react"

export default function AuthProvider({children}: {children: React.ReactNode}) {

    return(
<AsgardeoAuthProvider
config={{
   signInRedirectURL: process.env.NEXT_PUBLIC_ASGARDEO_REDIRECT_URL as string,
            signOutRedirectURL: process.env.NEXT_PUBLIC_ASGARDEO_REDIRECT_URL as string,
            clientID: process.env.NEXT_PUBLIC_ASGARDEO_CLIENT_ID as string,
            baseUrl: process.env.NEXT_PUBLIC_ASGARDEO_BASE_URL as string,
            scope: [ "openid", "profile" ] 
}}
>
    {children}
</AsgardeoAuthProvider>
    );
}