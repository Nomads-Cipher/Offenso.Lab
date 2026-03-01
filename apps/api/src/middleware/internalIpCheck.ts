import type { Request, Response, NextFunction } from "express";

function firstIpValue(headerValue: string) {
  return headerValue.split(",")[0]?.trim();
}

export function requireInternalIp(req: Request, res: Response, next: NextFunction) {
  const forwardedFor = req.header("X-Forwarded-For");
  const remoteIp = req.header("X-Remote-IP");

  const claimed = (forwardedFor && firstIpValue(forwardedFor)) || (remoteIp && firstIpValue(remoteIp));
  const ip = claimed || req.ip;

  if (ip === "127.0.0.1" || ip === "::1") return next();

  return res.status(403).json({
    error: "Access denied",
    ip
  });
}

