import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { JwtPayload } from "jsonwebtoken";

import { getNewAccessToken } from "./service/refreshToken";
import { jwtUtils } from "./utils/jwt";


const AUTH_ROUTES = [
  "/login",
  "/register",
];


const PUBLIC_ROUTES = [
  "/",
  "/services",
  "/services/:path*",
];



export async function proxy(request: NextRequest) {

  const pathname = request.nextUrl.pathname;


  const cookieStore = await cookies();


  let accessToken =
    request.cookies.get("accessToken")?.value;


  const refreshToken =
    request.cookies.get("refreshToken")?.value;



  let decodedAccessToken =
    accessToken
      ? jwtUtils.verifyToken(
          accessToken,
          process.env.JWT_ACCESS_SECRET as string
        )
      : null;



  const decodedRefreshToken =
    refreshToken
      ? jwtUtils.verifyToken(
          refreshToken,
          process.env.JWT_REFRESH_SECRET as string
        )
      : null;




  // Refresh access token

  if(
    !decodedAccessToken?.success &&
    decodedRefreshToken?.success
  ){

    const result =
      await getNewAccessToken();



    if(result.success){

      const newAccessToken =
        result.data.accessToken;



      cookieStore.set(
        "accessToken",
        newAccessToken,
        {
          httpOnly:true,
          secure:false,
          sameSite:"lax",
          maxAge:60*60*24,
        }
      );



      accessToken = newAccessToken;



      decodedAccessToken =
        jwtUtils.verifyToken(
          newAccessToken,
          process.env.JWT_ACCESS_SECRET as string
        );
    }
  }




  let userRole = null;



  if(decodedAccessToken?.success){

    userRole =
      (decodedAccessToken.data as JwtPayload)
        .role;

  }




  // remove invalid token

  if(
    accessToken &&
    !decodedAccessToken?.success
  ){

    cookieStore.delete("accessToken");

  }





  const isPublicRoute =
    PUBLIC_ROUTES.some((route)=>{

      if(route.includes(":path")){
        return pathname.startsWith(
          route.replace("/:path*","")
        )
      }

      return pathname === route;

    });




  const isAuthRoute =
    AUTH_ROUTES.includes(pathname);





  // Not logged in

  if(
    !accessToken &&
    !isPublicRoute &&
    !isAuthRoute
  ){

    const loginUrl =
      new URL(
        "/login",
        request.url
      );


    loginUrl.searchParams.set(
      "redirectTo",
      pathname
    );


    return NextResponse.redirect(loginUrl);

  }





  // Already logged in

  if(
    accessToken &&
    isAuthRoute
  ){


    if(userRole==="CUSTOMER"){

      return NextResponse.redirect(
        new URL(
          "/customer-dashboard",
          request.url
        )
      );

    }


    if(userRole==="TECHNICIAN"){

      return NextResponse.redirect(
        new URL(
          "/technician-dashboard",
          request.url
        )
      );

    }


    if(userRole==="ADMIN"){

      return NextResponse.redirect(
        new URL(
          "/admin-dashboard",
          request.url
        )
      );

    }

  }






  // Role protection


  if(
    pathname.startsWith(
      "/admin-dashboard"
    )
    &&
    userRole !== "ADMIN"
  ){

    return NextResponse.redirect(
      new URL(
        "/not-found",
        request.url
      )
    );

  }





  if(
    pathname.startsWith(
      "/customer-dashboard"
    )
    &&
    userRole !== "CUSTOMER"
  ){

    return NextResponse.redirect(
      new URL(
        "/not-found",
        request.url
      )
    );

  }





  if(
    pathname.startsWith(
      "/technician-dashboard"
    )
    &&
    userRole !== "TECHNICIAN"
  ){

    return NextResponse.redirect(
      new URL(
        "/not-found",
        request.url
      )
    );

  }





  return NextResponse.next();

}





export const config = {

  matcher:[
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],

};