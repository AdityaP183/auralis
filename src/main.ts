import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConsoleLogger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new ConsoleLogger({
            colors: true,
            json: true,
        }),
    });
    app.setGlobalPrefix("api");

    const config = new DocumentBuilder()
        .setTitle("Auralis API documentation")
        .setDescription("This is the documentation for the Auralis API.")
        .setVersion("1.0")
        .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, documentFactory, {
        jsonDocumentUrl: "/api/docs.json",
    });

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
    .then(() => console.log("Auralis API is running"))
    .catch((err) => console.error(err));
