import { Logger } from "winston";
import devLogger from "./dev/devLogger";
import prodLogger from "./prod/prodLogger";
import { createLogger, transports, format } from "winston";

let logger: Logger | null = null;

if (process.env.NODE_ENV === "development") {
  logger = devLogger();
}

if (process.env.NODE_ENV === "production") {
  logger = prodLogger();
}

// Fallback to a simple console logger if none is set
if (!logger) {
  logger = createLogger({
    level: "info",
    format: format.combine(
        format.colorize(),
        format.simple()
    ),
    transports: [
      new transports.Console()
    ],
  });
}

export default logger;
