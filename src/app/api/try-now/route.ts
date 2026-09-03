import { NextRequest, NextResponse } from "next/server";

// =========================================================================
// 🎯 API ROUTE PLACEHOLDER: SERVER-SIDE REDIRECTION TARGET
// If you want server-side 307/308 redirects, configure your target URL here:
// =========================================================================
const SERVER_REDIRECT_TARGET: string = ""; // e.g. "https://app.xtrail.in" or "/try-now"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const product = searchParams.get("product") || "command-tower";

  if (SERVER_REDIRECT_TARGET && SERVER_REDIRECT_TARGET.trim().length > 0) {
    const destination = new URL(SERVER_REDIRECT_TARGET, request.url);
    destination.searchParams.set("product", product);
    return NextResponse.redirect(destination.toString(), 307);
  }

  // If placeholder is not set yet, redirect to the client try-now page
  const fallbackUrl = new URL(`/try-now?product=${encodeURIComponent(product)}`, request.url);
  return NextResponse.redirect(fallbackUrl.toString(), 307);
}
