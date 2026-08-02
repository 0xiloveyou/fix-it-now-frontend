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
  "/about",
  "/contact",
];



export async function proxy(request: NextRequest) {

  const pathname = request.nextUrl.pathname;


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



  const response = NextResponse.next();




  // ==============================
  // Refresh Access Token
  // ==============================

  if(
    !decodedAccessToken?.success &&
    decodedRefreshToken?.success
  ){

    const result =
      await getNewAccessToken();



    if(result.success){

      const newAccessToken =
        result.data.accessToken;



      response.cookies.set(
        "accessToken",
        newAccessToken,
        {
          httpOnly:true,
          sameSite:"lax",
          secure:false,
          path:"/",
          maxAge:60 * 60 * 24,
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





  let userRole:string | null = null;



  if(decodedAccessToken?.success){

    userRole =
      (decodedAccessToken.data as JwtPayload).role;

  }





  // ==============================
  // Invalid Token Cleanup
  // ==============================

  if(
    accessToken &&
    !decodedAccessToken?.success
  ){

    response.cookies.delete(
      "accessToken"
    );


    response.cookies.delete(
      "refreshToken"
    );


    accessToken = undefined;

  }






  const isPublicRoute =
    PUBLIC_ROUTES.some(
      (route)=>
        pathname === route ||
        pathname.startsWith(route + "/")
    );



  const isAuthRoute =
    AUTH_ROUTES.includes(pathname);







  // ==============================
  // Protect Private Routes
  // ==============================

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


    return NextResponse.redirect(
      loginUrl
    );

  }








  // ==============================
  // Logged User Cannot Access Login
  // ==============================

  if(
    accessToken &&
    isAuthRoute
  ){


    if(userRole === "CUSTOMER"){

      return NextResponse.redirect(
        new URL(
          "/customer-dashboard",
          request.url
        )
      );

    }



    if(userRole === "TECHNICIAN"){

      return NextResponse.redirect(
        new URL(
          "/technician-dashboard",
          request.url
        )
      );

    }



    if(userRole === "ADMIN"){

      return NextResponse.redirect(
        new URL(
          "/admin-dashboard",
          request.url
        )
      );

    }


  }








  // ==============================
  // Role Protection
  // ==============================


  if(
    pathname.startsWith("/customer-dashboard") &&
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
    pathname.startsWith("/technician-dashboard") &&
    userRole !== "TECHNICIAN"
  ){

    return NextResponse.redirect(
      new URL(
        "/not-found",
        request.url
      )
    );

  }






  if(
    pathname.startsWith("/admin-dashboard") &&
    userRole !== "ADMIN"
  ){

    return NextResponse.redirect(
      new URL(
        "/not-found",
        request.url
      )
    );

  }





  return response;

}






export const config = {

  matcher:[
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],

};