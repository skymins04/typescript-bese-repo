// src/logger/index.ts
import path from "path";
import { createLogger, format, transports } from "winston";

const { combine, timestamp, prettyPrint, printf, label } = format;

const logPath = path.join(__dirname, "..", "..", "..", "log");
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
const logLabel = process.env["LOGGER_LABEL"];
const timestampFormat = timestamp({ format: "YYYY-MM-DD HH:mm:ss" });

const options = {
  file: {
    level: "info",
    filename: path.join(
      logPath,
      new Date(+new Date() + 3240 * 10000)
        .toISOString()
        .replace("T", " ")
        .replace(/\..*/, "") + ".log"
    ),
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: combine(label({ label: logLabel }), timestampFormat, logFormat),
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
    format: combine(label({ label: logLabel }), timestampFormat, logFormat),
  },
};

const logger = createLogger({
  level: "info",
  format: combine(format.json(), timestampFormat, prettyPrint()),
  transports: [new transports.File(options.file)],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new transports.Console(options.console));
}
export default logger;
