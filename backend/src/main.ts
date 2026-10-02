import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  const defaultOrigins = [
    "https://supunbatagoda.site",
    "https://www.supunbatagoda.site",
    "http://supunbatagoda.site.local",
    "http://localhost:3000",
  ];

  const envOrigins = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(",").map((url) => url.trim())
    : [];

  const origins = Array.from(new Set([...defaultOrigins, ...envOrigins])).filter(Boolean);

  app.enableCors({
    origin: origins,
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Accept", "Authorization"],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix("api/v1");

  const port = process.env.BACKEND_PORT ?? 4000;
  await app.listen(port, "0.0.0.0");
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://0.0.0.0:${port}`);
}

bootstrap();
