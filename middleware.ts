import { NextRequest, NextResponse } from "next/server";
export function middleware ( request: NextRequest )
{
  const token = request.cookies.get( "token" )?.value;

  const protectedRoutes = [
    "/cms/create",
    "/cms/list",
    "/auth/dashboard",
    "/auth/update_password",
  ];

  if ( protectedRoutes.some( route => request.nextUrl.pathname.startsWith( route ) ) && !token )
  {
    const response = NextResponse.redirect( new URL( "/auth/login", request.url ) );
    response.cookies.set( "show_login_toast", "true", {
      maxAge: 15,
      path: "/",
      sameSite: "strict"
    } );
    return response;
  }

  return NextResponse.next();
}