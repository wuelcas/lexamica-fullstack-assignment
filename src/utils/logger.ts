import winston from "winston";

const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  format: combine(timestamp(), json()),
  defaultMeta: { service: "lexaminca-backend" },
  transports: [new winston.transports.Console()],
});

export default logger;
